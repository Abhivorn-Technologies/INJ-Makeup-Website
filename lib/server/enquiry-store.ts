import "server-only";

import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Pool } from "pg";

import type { Enquiry, EnquiryStatus, EnquiryType } from "@/lib/validations";

/**
 * Enquiry storage.
 *
 *  - Production: PostgreSQL via DATABASE_URL (required). If DATABASE_URL is
 *    missing in production, getStore() returns null and the API responds with
 *    503 — the visitor is told plainly that the form could not be sent.
 *  - Development: if DATABASE_URL is not set, enquiries are written to
 *    .data/enquiries.json so the full flow can be tested locally. This mode is
 *    never used in production.
 *
 * The EnquiryStore interface keeps the backend swappable (e.g. a CRM or a
 * separate API) without touching the routes or forms.
 */

export type StoredEnquiry = {
  id: string;
  reference: string;
  type: EnquiryType;
  status: EnquiryStatus;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string | null;
  details: Record<string, unknown>;
  notes: string | null;
};

export interface EnquiryStore {
  readonly kind: "postgres" | "dev-file";
  save(input: Omit<Enquiry, "consent" | "website" | "startedAt">): Promise<StoredEnquiry>;
  list(options?: { type?: EnquiryType; status?: EnquiryStatus; limit?: number }): Promise<StoredEnquiry[]>;
  update(id: string, patch: { status?: EnquiryStatus; notes?: string }): Promise<StoredEnquiry | null>;
}

function newReference() {
  return `INJ-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function splitEnquiry(input: Omit<Enquiry, "consent" | "website" | "startedAt">) {
  const { type, fullName, phone, email, ...details } = input;
  return { type, fullName, phone, email: email ?? null, details };
}

/* ------------------------------ Postgres ------------------------------ */

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS enquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference   TEXT NOT NULL UNIQUE,
  type        TEXT NOT NULL CHECK (type IN ('booking','contact','course')),
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','confirmed','closed','spam')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name   TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  details     JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes       TEXT
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);
`;

type Row = {
  id: string;
  reference: string;
  type: EnquiryType;
  status: EnquiryStatus;
  created_at: Date;
  full_name: string;
  phone: string;
  email: string | null;
  details: Record<string, unknown>;
  notes: string | null;
};

function fromRow(r: Row): StoredEnquiry {
  return {
    id: r.id,
    reference: r.reference,
    type: r.type,
    status: r.status,
    createdAt: r.created_at.toISOString(),
    fullName: r.full_name,
    phone: r.phone,
    email: r.email,
    details: r.details,
    notes: r.notes,
  };
}

const globalForPg = globalThis as unknown as { injPool?: Pool; injSchemaReady?: Promise<void> };

function getPool(url: string) {
  if (!globalForPg.injPool) {
    const needsSsl = !/localhost|127\.0\.0\.1|sslmode=disable/.test(url);
    globalForPg.injPool = new Pool({
      connectionString: url,
      max: 3,
      ssl: needsSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_NO_VERIFY !== "true" } : undefined,
    });
  }
  return globalForPg.injPool;
}

class PostgresStore implements EnquiryStore {
  readonly kind = "postgres" as const;
  constructor(private pool: Pool) {}

  private ready() {
    if (!globalForPg.injSchemaReady) {
      globalForPg.injSchemaReady = this.pool
        .query(CREATE_TABLE_SQL)
        .then(() => undefined)
        .catch((err) => {
          globalForPg.injSchemaReady = undefined;
          throw err;
        });
    }
    return globalForPg.injSchemaReady;
  }

  async save(input: Omit<Enquiry, "consent" | "website" | "startedAt">) {
    await this.ready();
    const e = splitEnquiry(input);
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const { rows } = await this.pool.query<Row>(
          `INSERT INTO enquiries (reference, type, full_name, phone, email, details)
           VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
          [newReference(), e.type, e.fullName, e.phone, e.email, JSON.stringify(e.details)],
        );
        return fromRow(rows[0]);
      } catch (err) {
        // 23505 = unique violation on reference; retry with a new one.
        if ((err as { code?: string }).code !== "23505" || attempt === 2) throw err;
      }
    }
    throw new Error("Could not allocate an enquiry reference");
  }

  async list(options: { type?: EnquiryType; status?: EnquiryStatus; limit?: number } = {}) {
    await this.ready();
    const where: string[] = [];
    const params: unknown[] = [];
    if (options.type) {
      params.push(options.type);
      where.push(`type = $${params.length}`);
    }
    if (options.status) {
      params.push(options.status);
      where.push(`status = $${params.length}`);
    }
    params.push(Math.min(options.limit ?? 200, 500));
    const { rows } = await this.pool.query<Row>(
      `SELECT * FROM enquiries ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY created_at DESC LIMIT $${params.length}`,
      params,
    );
    return rows.map(fromRow);
  }

  async update(id: string, patch: { status?: EnquiryStatus; notes?: string }) {
    await this.ready();
    const { rows } = await this.pool.query<Row>(
      `UPDATE enquiries SET status = COALESCE($2, status), notes = COALESCE($3, notes)
       WHERE id = $1 RETURNING *`,
      [id, patch.status ?? null, patch.notes ?? null],
    );
    return rows[0] ? fromRow(rows[0]) : null;
  }
}

/* --------------------------- Dev file store --------------------------- */

class DevFileStore implements EnquiryStore {
  readonly kind = "dev-file" as const;
  private file = path.join(process.cwd(), ".data", "enquiries.json");

  private async read(): Promise<StoredEnquiry[]> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as StoredEnquiry[];
    } catch {
      return [];
    }
  }

  private async write(items: StoredEnquiry[]) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    await fs.writeFile(this.file, JSON.stringify(items, null, 2));
  }

  async save(input: Omit<Enquiry, "consent" | "website" | "startedAt">) {
    const e = splitEnquiry(input);
    const item: StoredEnquiry = {
      id: crypto.randomUUID(),
      reference: newReference(),
      status: "new",
      createdAt: new Date().toISOString(),
      notes: null,
      ...e,
    };
    const items = await this.read();
    items.unshift(item);
    await this.write(items);
    return item;
  }

  async list(options: { type?: EnquiryType; status?: EnquiryStatus; limit?: number } = {}) {
    return (await this.read())
      .filter((i) => (!options.type || i.type === options.type) && (!options.status || i.status === options.status))
      .slice(0, options.limit ?? 200);
  }

  async update(id: string, patch: { status?: EnquiryStatus; notes?: string }) {
    const items = await this.read();
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    if (patch.status) item.status = patch.status;
    if (patch.notes !== undefined) item.notes = patch.notes;
    await this.write(items);
    return item;
  }
}

/* ------------------------------ Factory ------------------------------ */

export function getStore(): EnquiryStore | null {
  const url = process.env.DATABASE_URL;
  if (url) return new PostgresStore(getPool(url));
  if (process.env.NODE_ENV !== "production") return new DevFileStore();
  return null;
}
