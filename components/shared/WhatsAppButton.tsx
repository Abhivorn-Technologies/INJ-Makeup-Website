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
        className={`social-btn social-btn-whatsapp fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_30px_rgba(37,211,102,0.45)] duration-300 hover:-translate-y-1 hover:scale-105 md:bottom-7 md:right-7 ${className}`}
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
      className={`btn ${variant === "light" ? "btn-light" : "btn-outline"} group/wa hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_16px_rgba(37,211,102,0.3)] transition-all duration-300 ${className}`}
    >
      <WhatsAppIcon size={18} className="text-[#25D366] shrink-0 transition-transform duration-300 group-hover/wa:scale-110" />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
