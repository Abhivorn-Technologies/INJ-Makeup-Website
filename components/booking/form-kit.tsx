"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { FieldError, FieldValues, Path, UseFormRegisterReturn, UseFormSetError } from "react-hook-form";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { site } from "@/lib/site";

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-1 text-gold-deep" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal tracking-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

/** aria props wiring a control to its hint / error text. */
export function describedBy(id: string, error?: FieldError, hint?: boolean) {
  return {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}

/** Honeypot: hidden from people and assistive tech; bots tend to fill it. */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

export function ConsentField({
  id,
  error,
  registration,
}: {
  id: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...registration}
          {...describedBy(id, error)}
          className="mt-1 h-5 w-5 shrink-0 accent-[#99702e]"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-muted">
          I agree that INJ Makeup Studio may use these details to respond to my enquiry, as described in the{" "}
          <Link href="/privacy-policy" className="text-gold-text underline underline-offset-2" target="_blank">
            privacy policy
          </Link>
          .<span className="text-gold-deep" aria-hidden="true"> *</span>
        </label>
      </div>
      {error?.message && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

/** Posts to /api/enquiries and maps server-side field errors back onto the form. */
export function useEnquirySubmit<T extends FieldValues>(setError: UseFormSetError<T>) {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  async function submit(values: T) {
    setState({ kind: "idle" });
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && data.ok && data.reference) {
        setState({ kind: "success", reference: data.reference });
        return true;
      }
      if (data.fieldErrors) {
        for (const [k, message] of Object.entries(data.fieldErrors)) {
          setError(k as Path<T>, { type: "server", message });
        }
      }
      setState({
        kind: "error",
        message: data.error ?? "Your enquiry could not be sent. Please try again, or call or WhatsApp us.",
      });
    } catch {
      setState({
        kind: "error",
        message: "We couldn’t reach the server. Please check your connection and try again, or contact us on WhatsApp.",
      });
    }
    return false;
  }

  return { state, submit, reset: () => setState({ kind: "idle" }) };
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button type="submit" disabled={pending} className="btn btn-gold w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
      {pending ? (
        <>
          <LoaderCircle size={17} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex gap-3 border border-[#c98c7f] bg-[#fbefec] p-4 text-sm text-[#7d2a1d]">
      <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div>
        <p>{message}</p>
        <p className="mt-2">
          Call{" "}
          <a href={`tel:${site.phones[0].tel}`} className="underline">
            {site.phones[0].display}
          </a>{" "}
          or{" "}
          <a href={`https://wa.me/${site.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className="underline">
            message us on WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export function FormSuccess({
  title,
  reference,
  children,
  onReset,
}: {
  title: string;
  reference: string;
  children: ReactNode;
  onReset: () => void;
}) {
  return (
    <div role="status" className="border border-gold/50 bg-cream p-8 text-center md:p-12" tabIndex={-1}>
      <CircleCheck size={40} strokeWidth={1.2} className="mx-auto text-gold-deep" aria-hidden="true" />
      <h3 className="mt-4 text-[2rem] text-ink">{title}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gold-text">Reference {reference}</p>
      <div className="mx-auto mt-4 max-w-lg leading-relaxed text-muted">{children}</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <WhatsAppButton message={`Hello INJ, I have just sent an enquiry (reference ${reference}).`} label="Follow up on WhatsApp" />
        <button type="button" onClick={onReset} className="btn btn-outline">
          Send another enquiry
        </button>
      </div>
    </div>
  );
}
