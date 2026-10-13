"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm, type FieldError } from "react-hook-form";
import type { z } from "zod";

import {
  ConsentField,
  Field,
  FormError,
  FormSuccess,
  Honeypot,
  SubmitButton,
  describedBy,
  useEnquirySubmit,
} from "@/components/booking/form-kit";
import {
  bookingSchema,
  eventTypeOptions,
  serviceOptions,
  styleOptions,
} from "@/lib/validations";

type In = z.input<typeof bookingSchema>;
type Out = z.output<typeof bookingSchema>;

function todayIST() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const params = useSearchParams();
  const fromQuery = params.get("service");
  const initialService = [fromQuery, defaultService].find(
    (s): s is (typeof serviceOptions)[number] => !!s && (serviceOptions as readonly string[]).includes(s),
  );

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      type: "booking",
      fullName: "",
      phone: "",
      email: "",
      service: initialService ?? ("" as unknown as In["service"]),
      preferredDate: "",
      preferredTime: "",
      eventType: "" as unknown as In["eventType"],
      eventLocation: "",
      peopleCount: 1,
      makeupStyle: "" as unknown as In["makeupStyle"],
      message: "",
      consent: false as unknown as true,
      website: "",
      startedAt: 0,
    },
  });

  const { state, submit, reset: resetState } = useEnquirySubmit<In>(setError);
  const successRef = useRef<HTMLDivElement>(null);
  const dateField = register("preferredDate");
  const peopleError = errors.peopleCount as FieldError | undefined;

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  useEffect(() => {
    if (state.kind === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      successRef.current?.querySelector<HTMLElement>("[role=status]")?.focus();
    }
  }, [state.kind]);

  const onSubmit = handleSubmit(async (values) => {
    const ok = await submit(values as unknown as In);
    if (ok) reset();
  });

  if (state.kind === "success") {
    return (
      <div ref={successRef}>
        <FormSuccess
          title="Thank you — your enquiry has been received"
          reference={state.reference}
          onReset={() => {
            resetState();
            setValue("startedAt", Date.now());
          }}
        >
          <p>
            Our team will contact you to discuss your requirements and confirm availability. Please note that your
            appointment is <strong className="text-ink">not confirmed</strong> until you hear from us.
          </p>
        </FormSuccess>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-7" aria-describedby="booking-required-note">
      <p id="booking-required-note" className="text-sm text-muted">
        Fields marked <span className="text-gold-deep">*</span> are required. Submitting this form sends an enquiry —
        it does not confirm a booking.
      </p>

      <input type="hidden" {...register("type")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <Honeypot registration={register("website")} />

      <fieldset className="space-y-6">
        <legend className="mb-2 font-display text-2xl text-ink">Your details</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <Field id="b-name" label="Full name" required error={errors.fullName} className="md:col-span-2">
            <input
              type="text"
              autoComplete="name"
              className="field-input"
              {...register("fullName")}
              {...describedBy("b-name", errors.fullName)}
            />
          </Field>
          <Field id="b-phone" label="Mobile number" required error={errors.phone} hint="10-digit Indian mobile, e.g. 98765 43210">
            <div className="flex">
              <span className="grid min-h-12 place-items-center border border-r-0 border-[#dcc9ad] bg-sand px-3 text-sm text-brown" aria-hidden="true">
                +91
              </span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                className="field-input"
                {...register("phone")}
                {...describedBy("b-phone", errors.phone, true)}
              />
            </div>
          </Field>
          <Field id="b-email" label="Email address" error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              className="field-input"
              {...register("email")}
              {...describedBy("b-email", errors.email)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-2 font-display text-2xl text-ink">Your event</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <Field id="b-service" label="Service" required error={errors.service}>
            <select className="field-input" {...register("service")} {...describedBy("b-service", errors.service)}>
              <option value="">Choose a service</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field id="b-event" label="Event type" required error={errors.eventType}>
            <select className="field-input" {...register("eventType")} {...describedBy("b-event", errors.eventType)}>
              <option value="">Choose the event</option>
              {eventTypeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field id="b-date" label="Preferred date" required error={errors.preferredDate}>
            <input
              type="date"
              className="field-input"
              {...dateField}
              ref={(el) => {
                dateField.ref(el);
                // Set on the client only, so server and client HTML match.
                if (el) el.min = todayIST();
              }}
              {...describedBy("b-date", errors.preferredDate)}
            />
          </Field>
          <Field id="b-time" label="Preferred time" required error={errors.preferredTime} hint="When you need to be ready, or when you'd like to start">
            <input
              type="time"
              className="field-input"
              {...register("preferredTime")}
              {...describedBy("b-time", errors.preferredTime, true)}
            />
          </Field>
          <Field id="b-location" label="Event location" required error={errors.eventLocation} hint="Venue, area or city — or ‘at the studio’" className="md:col-span-2">
            <input
              type="text"
              autoComplete="off"
              className="field-input"
              {...register("eventLocation")}
              {...describedBy("b-location", errors.eventLocation, true)}
            />
          </Field>
          <Field id="b-people" label="Number of people needing makeup" required error={peopleError}>
            <input
              type="number"
              min={1}
              max={50}
              inputMode="numeric"
              className="field-input"
              {...register("peopleCount")}
              {...describedBy("b-people", peopleError)}
            />
          </Field>
          <Field id="b-style" label="Preferred makeup style" required error={errors.makeupStyle}>
            <select className="field-input" {...register("makeupStyle")} {...describedBy("b-style", errors.makeupStyle)}>
              <option value="">Choose a style</option>
              {styleOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field id="b-message" label="Additional requirements" error={errors.message} className="md:col-span-2" hint="Outfit, hairstyling or draping needs, reference looks, timings for multiple functions…">
            <textarea
              rows={5}
              className="field-input"
              {...register("message")}
              {...describedBy("b-message", errors.message, true)}
            />
          </Field>
        </div>
      </fieldset>

      <ConsentField id="b-consent" error={errors.consent} registration={register("consent")} />

      {state.kind === "error" && <FormError message={state.message} />}

      <SubmitButton pending={isSubmitting} label="Send Booking Enquiry" />
    </form>
  );
}
