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
import { courseOptions, courseSchema, experienceOptions } from "@/lib/validations";

type In = z.input<typeof courseSchema>;
type Out = z.output<typeof courseSchema>;

export function CourseEnquiryForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(courseSchema),
    mode: "onTouched",
    defaultValues: {
      type: "course",
      fullName: "",
      phone: "",
      email: "",
      course: "" as unknown as In["course"],
      experience: "" as unknown as In["experience"],
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
        title="Thank you for your interest"
        reference={state.reference}
        onReset={() => {
          resetState();
          setValue("startedAt", Date.now());
        }}
      >
        <p>Our academy team will contact you with course details, timings and fees.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <input type="hidden" {...register("type")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <Honeypot registration={register("website")} />
      <Field id="a-name" label="Full name" required error={errors.fullName}>
        <input type="text" autoComplete="name" className="field-input" {...register("fullName")} {...describedBy("a-name", errors.fullName)} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="a-phone" label="Mobile number" required error={errors.phone}>
          <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" className="field-input" {...register("phone")} {...describedBy("a-phone", errors.phone)} />
        </Field>
        <Field id="a-email" label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" className="field-input" {...register("email")} {...describedBy("a-email", errors.email)} />
        </Field>
        <Field id="a-course" label="Course of interest" required error={errors.course}>
          <select className="field-input" {...register("course")} {...describedBy("a-course", errors.course)}>
            <option value="">Choose a course</option>
            {courseOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="a-exp" label="Your experience" required error={errors.experience}>
          <select className="field-input" {...register("experience")} {...describedBy("a-exp", errors.experience)}>
            <option value="">Choose your level</option>
            {experienceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="a-message" label="Anything you’d like us to know" error={errors.message}>
        <textarea rows={4} className="field-input" {...register("message")} {...describedBy("a-message", errors.message)} />
      </Field>
      <ConsentField id="a-consent" error={errors.consent} registration={register("consent")} />
      {state.kind === "error" && <FormError message={state.message} />}
      <SubmitButton pending={isSubmitting} label="Enquire About Courses" />
    </form>
  );
}
