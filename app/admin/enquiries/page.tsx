import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LogOut } from "lucide-react";

import { EnquiryTable } from "@/components/admin/EnquiryTable";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/server/admin-auth";
import { getStore } from "@/lib/server/enquiry-store";

async function Inbox() {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) redirect("/admin");

  const store = getStore();
  if (!store) {
    return (
      <p role="alert" className="border border-[#c98c7f] bg-[#fbefec] p-4 text-sm text-[#7d2a1d]">
        No database is configured (DATABASE_URL is missing), so enquiries cannot be stored or shown. See the README.
      </p>
    );
  }

  let items: Awaited<ReturnType<typeof store.list>> = [];
  let failed = false;
  try {
    items = await store.list({ limit: 300 });
  } catch (err) {
    console.error("[admin] Failed to load enquiries", err);
    failed = true;
  }
  if (failed) {
    return (
      <p role="alert" className="border border-[#c98c7f] bg-[#fbefec] p-4 text-sm text-[#7d2a1d]">
        Enquiries could not be loaded. Check the database connection and try again.
      </p>
    );
  }

  return (
    <>
      {store.kind === "dev-file" && (
        <p className="mb-6 border border-gold/50 bg-cream p-3 text-sm text-brown">
          Development mode: enquiries are stored in <code>.data/enquiries.json</code>. Production requires PostgreSQL.
        </p>
      )}
      <EnquiryTable initial={items} />
    </>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <section className="container-luxe py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/30 pb-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-[2.4rem] text-ink">Enquiries</h1>
        </div>
        <form method="post" action="/api/admin/logout">
          <button type="submit" className="btn btn-outline">
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </form>
      </div>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading enquiries…</p>}>
          <Inbox />
        </Suspense>
      </div>
    </section>
  );
}
