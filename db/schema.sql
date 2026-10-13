-- INJ Makeup Studio — enquiry storage (PostgreSQL 13+).
-- The app also creates this table automatically on first use;
-- run `npm run db:migrate` to create it ahead of time.
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
