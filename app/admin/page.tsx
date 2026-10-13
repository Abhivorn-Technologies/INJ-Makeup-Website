import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Lock } from "lucide-react";

import { ADMIN_COOKIE, adminConfigured, verifySessionToken } from "@/lib/server/admin-auth";

const MESSAGES: Record<string, string> = {
  invalid: "Incorrect password. Please try again.",
  "too-many": "Too many attempts. Please wait 15 minutes and try again.",
  "not-configured": "Admin access is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
};

async function LoginPanel({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  const jar = await cookies();
  if (verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) redirect("/admin/enquiries");

  const sp = await searchParams;
  const error = typeof sp.error === "string" ? MESSAGES[sp.error] : undefined;
  const configured = adminConfigured();

  return (
    <div className="border border-gold/35 bg-white p-8 md:p-10">
      <Lock size={26} strokeWidth={1.3} className="text-gold-deep" aria-hidden="true" />
      <h1 className="mt-4 text-[2.2rem] text-ink">Enquiries admin</h1>
      <p className="mt-2 text-sm text-muted">Sign in to view and manage booking, contact and course enquiries.</p>
      {error && (
        <p role="alert" className="mt-6 border border-[#c98c7f] bg-[#fbefec] p-3 text-sm text-[#7d2a1d]">
          {error}
        </p>
      )}
      {configured ? (
        <form method="post" action="/api/admin/login" className="mt-8 space-y-5">
          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="field-input" />
          </div>
          <button type="submit" className="btn btn-gold w-full">
            Sign in
          </button>
        </form>
      ) : (
        !error && <p className="mt-6 text-sm text-muted">{MESSAGES["not-configured"]}</p>
      )}
    </div>
  );
}

export default function AdminLoginPage(props: PageProps<"/admin">) {
  return (
    <section className="container-luxe flex min-h-[70vh] max-w-md items-center py-20">
      <div className="w-full">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
          <LoginPanel searchParams={props.searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
