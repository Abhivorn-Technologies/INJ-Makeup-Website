"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

import { FacebookIcon, PinterestIcon, WhatsAppIcon } from "@/components/shared/BrandIcons";

export function ShareLinks({ url, title, image }: { url: string; title: string; image: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, Icon: WhatsAppIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: FacebookIcon },
    {
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(image)}&description=${enc(title)}`,
      Icon: PinterestIcon,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brown">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-brown hover:bg-ink hover:text-gold-light"
          aria-label={`Share on ${label} (opens in a new tab)`}
        >
          <Icon size={17} />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {
            setCopied(false);
          }
        }}
        className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-brown hover:bg-ink hover:text-gold-light"
        aria-label={copied ? "Link copied" : "Copy link to this article"}
      >
        {copied ? <Check size={17} aria-hidden="true" /> : <LinkIcon size={17} aria-hidden="true" />}
      </button>
      <span aria-live="polite" className="text-xs text-muted">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
