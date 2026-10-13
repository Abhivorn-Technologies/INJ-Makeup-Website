import type { ReactNode } from "react";

import { Ornament } from "@/components/shared/Ornament";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  light?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  light = false,
  className = "",
  id,
}: Props) {
  const centered = align === "center";
  return (
    <div
      data-reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${light ? "!text-gold-light" : ""}`}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={`text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      <Ornament className={`mt-5 ${centered ? "mx-auto" : ""}`} light={light} />
      {description && (
        <div
          className={`mt-5 text-[1.02rem] leading-relaxed ${
            light ? "text-cream/85" : "text-muted"
          } ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {description}
        </div>
      )}
    </div>
  );
}
