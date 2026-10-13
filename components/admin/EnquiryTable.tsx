"use client";

import { useMemo, useState } from "react";

import type { StoredEnquiry } from "@/lib/server/enquiry-store";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/validations";

const TYPE_LABEL = { booking: "Booking", contact: "Contact", course: "Course" } as const;

function humanise(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}

export function EnquiryTable({ initial }: { initial: StoredEnquiry[] }) {
  const [items, setItems] = useState(initial);
  const [type, setType] = useState<"all" | StoredEnquiry["type"]>("all");
  const [status, setStatus] = useState<"all" | EnquiryStatus>("all");
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visible = useMemo(
    () => items.filter((i) => (type === "all" || i.type === type) && (status === "all" || i.status === status)),
    [items, type, status],
  );

  async function update(id: string, patch: { status?: EnquiryStatus; notes?: string }) {
    setSaving(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Update failed");
      setItems((list) => list.map((i) => (i.id === id ? data.enquiry : i)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <label className="text-sm text-brown">
          Type{" "}
          <select className="field-input mt-1 w-44" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="all">All types</option>
            <option value="booking">Booking</option>
            <option value="contact">Contact</option>
            <option value="course">Course</option>
          </select>
        </label>
        <label className="text-sm text-brown">
          Status{" "}
          <select className="field-input mt-1 w-44" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="all">All statuses</option>
            {enquiryStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <p className="self-end pb-3 text-sm text-muted">
          {visible.length} of {items.length} enquiries
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-4 border border-[#c98c7f] bg-[#fbefec] p-3 text-sm text-[#7d2a1d]">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="mt-10 border border-gold/30 bg-white p-8 text-center text-muted">No enquiries to show yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {visible.map((e) => (
            <li key={e.id} className="border border-gold/30 bg-white p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-text">
                    {TYPE_LABEL[e.type]} · {e.reference} · {fmt(e.createdAt)}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-ink">{e.fullName}</h2>
                  <p className="mt-1 text-sm text-brown">
                    <a href={`tel:${e.phone}`} className="underline">
                      {e.phone}
                    </a>
                    {" · "}
                    <a href={`https://wa.me/${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline">
                      WhatsApp
                    </a>
                    {e.email && (
                      <>
                        {" · "}
                        <a href={`mailto:${e.email}`} className="underline">
                          {e.email}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <label className="text-sm text-brown">
                  <span className="sr-only">Status for {e.reference}</span>
                  <select
                    className="field-input w-40"
                    value={e.status}
                    disabled={saving === e.id}
                    onChange={(ev) => update(e.id, { status: ev.target.value as EnquiryStatus })}
                  >
                    {enquiryStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(e.details)
                  .filter(([, v]) => v !== "" && v !== undefined && v !== null)
                  .map(([k, v]) => (
                    <div key={k} className={k === "message" ? "sm:col-span-2 lg:col-span-3" : ""}>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted">{humanise(k)}</dt>
                      <dd className="whitespace-pre-line text-ink">{String(v)}</dd>
                    </div>
                  ))}
              </dl>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gold-text">Internal notes{e.notes ? " (1)" : ""}</summary>
                <form
                  className="mt-3 flex flex-col gap-3 sm:flex-row"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    const notes = String(new FormData(ev.currentTarget).get("notes") ?? "");
                    update(e.id, { notes });
                  }}
                >
                  <label className="sr-only" htmlFor={`notes-${e.id}`}>
                    Notes for {e.reference}
                  </label>
                  <textarea id={`notes-${e.id}`} name="notes" defaultValue={e.notes ?? ""} rows={2} maxLength={2000} className="field-input" />
                  <button type="submit" className="btn btn-outline" disabled={saving === e.id}>
                    Save
                  </button>
                </form>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
