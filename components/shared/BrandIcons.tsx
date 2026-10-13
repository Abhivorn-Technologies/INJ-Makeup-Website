import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15.5 3H13a4 4 0 0 0-4 4v14" />
      <path d="M6 11h8" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor" />
    </svg>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M11.2 9.6c.3-1.4 1.6-2.3 3-2 1.6.3 2.4 1.9 1.9 3.6-.5 1.8-2.1 2.9-3.7 2.4" />
      <path d="m11.6 10.4-2.1 10" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 20.5 4.9 16.6A8.6 8.6 0 1 1 8 19.4z" />
      <path d="M9.2 8.4c.3-.4.8-.5 1.1-.1l.8 1.3c.2.3.1.7-.1 1l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.3-.3.7-.3 1-.1l1.3.8c.4.3.3.8-.1 1.1-.8.7-1.9.9-2.9.4a8.3 8.3 0 0 1-4-4c-.5-1-.3-2.1.4-2.9z" />
    </svg>
  );
}
