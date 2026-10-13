import { z } from "zod";

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. */
export const INDIAN_PHONE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

export function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.slice(-10);
  return `+91${ten}`;
}

export const serviceOptions = [
  "Bridal Makeup",
  "Engagement Makeup",
  "Reception Makeup",
  "HD Makeup",
  "Airbrush Makeup",
  "Party & Occasion Makeup",
  "High-Fashion & Photoshoot Makeup",
  "Basic Makeup",
  "Hairstyling",
  "Saree Draping",
  "Not sure yet",
] as const;

export const eventTypeOptions = [
  "Wedding",
  "Engagement",
  "Reception",
  "Haldi / Mehendi / Sangeet",
  "Party or family function",
  "Photoshoot",
  "Other",
] as const;

export const styleOptions = [
  "Soft glam",
  "Traditional",
  "Natural / minimal",
  "Bold glam",
  "Not sure — I'd like advice",
] as const;

export const courseOptions = [
  "Beginner Makeup Training",
  "Professional Makeup Techniques",
  "Bridal Makeup Techniques",
  "HD and Airbrush Techniques",
  "Hairstyling Fundamentals",
  "Advanced Beauty Workshops",
  "Not sure yet",
] as const;

export const experienceOptions = [
  "Complete beginner",
  "Some self-taught experience",
  "Working makeup artist",
] as const;

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "Please keep your name under 80 characters.");

const phone = z
  .string()
  .trim()
  .regex(INDIAN_PHONE, "Please enter a valid 10-digit Indian mobile number.");

const optionalEmail = z
  .union([z.literal(""), z.email("Please enter a valid email address.")])
  .optional()
  .transform((v) => (v ? v.trim() : undefined));

const consent = z.literal(true, {
  error: "Please agree to the privacy policy so we can respond to your enquiry.",
});

const message = (max: number) =>
  z.string().trim().max(max, `Please keep this under ${max} characters.`).optional().default("");

/** Fields shared by every form for spam protection. */
const antiSpam = {
  /** Honeypot — real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
  /** Timestamp (ms) when the form was rendered. */
  startedAt: z.number().int().positive(),
};

function todayInIndia() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export const bookingSchema = z.object({
  type: z.literal("booking"),
  fullName: name,
  phone,
  email: optionalEmail,
  service: z.enum(serviceOptions, { error: "Please choose a service." }),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose your preferred date.")
    .refine((d) => d >= todayInIndia(), "Please choose a date from today onwards."),
  preferredTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Please choose a preferred time."),
  eventType: z.enum(eventTypeOptions, { error: "Please choose the event type." }),
  eventLocation: z
    .string()
    .trim()
    .min(2, "Please tell us where the event is (venue, area or city).")
    .max(160, "Please keep this under 160 characters."),
  peopleCount: z.coerce
    .number({ error: "Please enter a number." })
    .int("Please enter a whole number.")
    .min(1, "At least 1 person.")
    .max(50, "For groups larger than 50, please mention it in your message."),
  makeupStyle: z.enum(styleOptions, { error: "Please choose a style preference." }),
  message: message(1500),
  consent,
  ...antiSpam,
});

export const contactSchema = z.object({
  type: z.literal("contact"),
  fullName: name,
  phone,
  email: optionalEmail,
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(1500, "Please keep your message under 1500 characters."),
  consent,
  ...antiSpam,
});

export const courseSchema = z.object({
  type: z.literal("course"),
  fullName: name,
  phone,
  email: optionalEmail,
  course: z.enum(courseOptions, { error: "Please choose a course." }),
  experience: z.enum(experienceOptions, { error: "Please choose your experience level." }),
  message: message(1000),
  consent,
  ...antiSpam,
});

export const enquirySchema = z.discriminatedUnion("type", [
  bookingSchema,
  contactSchema,
  courseSchema,
]);

export type BookingInput = z.input<typeof bookingSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type CourseInput = z.input<typeof courseSchema>;
export type Enquiry = z.output<typeof enquirySchema>;
export type EnquiryType = Enquiry["type"];

export const enquiryStatuses = ["new", "contacted", "confirmed", "closed", "spam"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];
