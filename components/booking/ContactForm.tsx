"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { contactSchema } from "@/lib/validations";

type In = z.input<typeof contactSchema>;
type Out = z.output<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      type: "contact",
      fullName: "",
      phone: "",
      email: "",
      message: "",
      consent: false as unknown as true,
      website: "",
      startedAt: 0,
    },
  });
  const { state, submit, reset: resetState } = useEnquirySubmit<In>(setError);

  useEffect(() => setValue("startedAt", Date.now()), [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    if (await submit(values as unknown as In)) reset();
  });

  if (state.kind === "success") {
    return (
      <FormSuccess
        title="Thank you for your message"
        reference={state.reference}
        onReset={() => {
          resetState();
          setValue("startedAt", Date.now());
        }}
      >
        <p>We have received your message and will get back to you as soon as we can.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <input type="hidden" {...register("type")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <Honeypot registration={register("website")} />
      <Field id="c-name" label="Full name" required error={errors.fullName}>
        <input type="text" autoComplete="name" className="field-input" {...register("fullName")} {...describedBy("c-name", errors.fullName)} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-phone" label="Mobile number" required error={errors.phone}>
          <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" className="field-input" {...register("phone")} {...describedBy("c-phone", errors.phone)} />
        </Field>
        <Field id="c-email" label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" className="field-input" {...register("email")} {...describedBy("c-email", errors.email)} />
        </Field>
      </div>
      <Field id="c-message" label="Your message" required error={errors.message}>
        <textarea rows={6} className="field-input" {...register("message")} {...describedBy("c-message", errors.message)} />
      </Field>
      <ConsentField id="c-consent" error={errors.consent} registration={register("consent")} />
      {state.kind === "error" && <FormError message={state.message} />}
      <SubmitButton pending={isSubmitting} label="Send Message" />
    </form>
  );
}
