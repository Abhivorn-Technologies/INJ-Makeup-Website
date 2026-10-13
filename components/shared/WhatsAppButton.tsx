import { WhatsAppIcon } from "@/components/shared/BrandIcons";
import { whatsappUrl } from "@/lib/site";

type Props = {
  message?: string;
  label?: string;
  variant?: "outline" | "light" | "floating";
  className?: string;
};

export function WhatsAppButton({ message, label = "Chat on WhatsApp", variant = "outline", className = "" }: Props) {
  const href = whatsappUrl(message);

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with INJ Makeup Studio on WhatsApp (opens in a new tab)"
        className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-ink text-gold-light shadow-[0_16px_34px_-14px_rgba(48,38,31,0.8)] transition-transform duration-300 hover:-translate-y-0.5 md:bottom-7 md:right-7 ${className}`}
      >
        <WhatsAppIcon size={26} />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${variant === "light" ? "btn-light" : "btn-outline"} ${className}`}
    >
      <WhatsAppIcon size={18} />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
