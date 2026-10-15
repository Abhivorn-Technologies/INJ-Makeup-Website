"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { InstagramIcon, WhatsAppIcon } from "@/components/shared/BrandIcons";
import { mainNav, site, whatsappUrl } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel) {
        const items = panel.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-ivory/95 shadow-[0_10px_30px_-22px_rgba(48,38,31,0.55)] backdrop-blur-md"
          : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <div className="container-luxe">
        <div
          className={`flex items-center justify-between gap-6 transition-[padding] duration-500 ${
            scrolled ? "py-2.5" : "py-3.5 xl:py-4"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span className="logo-glow-zoom">
              <Image
                src="/brand/LOGO ING.png"
                alt=""
                width={256}
                height={256}
                preload
                className={`logo-spin h-auto shrink-0 transition-[width] duration-500 ${scrolled ? "w-10" : "w-11 xl:w-[3.25rem]"}`}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.45rem] font-semibold tracking-[0.18em] text-ink">INJ</span>
              <span className="mt-1 whitespace-nowrap text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-gold-text sm:text-[0.6rem] sm:tracking-[0.24em]">
                Makeup Studio &amp; Academy
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            <a
              href={`tel:${site.phones[0].tel}`}
              className="flex items-center gap-2 text-[0.8rem] text-brown transition-colors hover:text-gold-text"
            >
              <Phone size={15} aria-hidden="true" />
              {site.phones[0].display}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-whatsapp grid h-10 w-10 place-items-center rounded-full"
              aria-label="WhatsApp enquiry (opens in a new tab)"
            >
              <WhatsAppIcon size={18} />
            </a>
            <Link href="/book-appointment" className="btn btn-gold">
              Book Your Appointment
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-whatsapp grid h-11 w-11 place-items-center rounded-full"
              aria-label="WhatsApp enquiry (opens in a new tab)"
            >
              <WhatsAppIcon size={19} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="grid h-11 w-11 place-items-center text-ink"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav aria-label="Main" className="hidden border-t border-gold/25 xl:block">
          <ul className="flex items-center justify-center gap-x-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors after:absolute after:inset-x-0 after:bottom-2 after:mx-auto after:h-px after:bg-gold-deep after:transition-[width] after:duration-500 ${
                      active
                        ? "text-gold-text after:w-full"
                        : "text-ink/80 after:w-0 hover:text-gold-text hover:after:w-full"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>

      {/* Mobile / tablet menu — outside <header> so backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 top-0 z-[55] flex flex-col bg-ivory transition-[opacity,transform] duration-500 ease-[var(--ease-luxe)] xl:hidden ${
          open ? "opacity-100" : "pointer-events-none translate-x-6 opacity-0"
        }`}
      >
        <div className="container-luxe flex items-center justify-between py-3.5">
          <Link href="/" onClick={close} className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <Image src="/brand/LOGO ING.png" alt="" width={256} height={256} className="logo-spin h-auto w-8 shrink-0" />
            <span className="font-display text-xl tracking-[0.18em] text-ink">INJ</span>
          </Link>
          <button
            type="button"
            onClick={close}
            className="grid h-11 w-11 place-items-center text-ink"
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-luxe flex-1 overflow-y-auto pb-8">
          <ul className="border-t border-gold/25">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-gold/20">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 font-display text-[1.65rem] ${
                      active ? "text-gold-text" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/book-appointment" className="btn btn-gold w-full">
              Book Your Appointment
            </Link>
            <a href={`tel:${site.phones[0].tel}`} className="btn btn-outline w-full">
              <Phone size={16} aria-hidden="true" /> Call {site.phones[0].display}
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 text-sm text-brown"
            >
              <span className="social-btn social-btn-instagram grid h-6 w-6 place-items-center rounded-md">
                <InstagramIcon size={14} />
              </span>
              <span>@injmakeup</span>
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
