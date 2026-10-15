"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";

export function ScrollToHomeButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="Navigate to Home and scroll to top"
      title="Navigate to Home"
      className={`group fixed bottom-[5.5rem] right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-ink text-gold-light shadow-[0_16px_34px_-14px_rgba(48,38,31,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink hover:shadow-[0_0_24px_rgba(226,200,145,0.6)] md:bottom-[6.5rem] md:right-7 ${
        scrolled ? "opacity-100 scale-100" : "opacity-90 scale-95 hover:opacity-100 hover:scale-100"
      }`}
    >
      <ArrowUp
        size={22}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
      />
      <span className="sr-only">Navigate to Home</span>
    </Link>
  );
}
