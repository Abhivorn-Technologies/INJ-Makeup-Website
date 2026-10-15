"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Premium scroll reveals and repeatable animations.
 * Observes elements with `data-reveal` and transitions them smoothly into view.
 * When elements exit the viewport (top or bottom), their reveal state is reset
 * so the animation replays when scrolling back in either direction.
 *
 * Safe for React 19 / Next.js SSR hydration: uses WeakSet instead of mutating DOM attributes,
 * and defers observation until post-hydration layout.
 */
export function RevealAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    if (!("IntersectionObserver" in window)) return;

    let io: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // Track observed elements in memory to avoid modifying DOM attributes during hydration
    const observedElements = new WeakSet<Element>();

    const attachObserver = () => {
      document.documentElement.classList.add("reveal-ready");

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.classList.add("is-visible");
            } else {
              const rect = entry.boundingClientRect;
              const vh = window.innerHeight || document.documentElement.clientHeight;
              const isBelow = rect.top >= vh;
              const isAbove = rect.bottom <= 0;

              if (isBelow || isAbove) {
                target.classList.remove("is-visible");
              }
            }
          }
        },
        {
          rootMargin: "0px 0px -40px 0px",
          threshold: [0, 0.1],
        }
      );

      const observeElements = () => {
        if (!io) return;
        const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
        elements.forEach((el) => {
          if (!observedElements.has(el)) {
            observedElements.add(el);
            io?.observe(el);
          }
        });
      };

      observeElements();

      mutationObserver = new MutationObserver(() => {
        observeElements();
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    };

    // Defer observation by one animation frame + small tick so React hydration completes cleanly
    rafId = requestAnimationFrame(() => {
      timeoutId = setTimeout(attachObserver, 50);
    });

    const onVisibilityChange = () => {
      if (document.hidden) {
        document.documentElement.classList.add("tab-hidden");
      } else {
        document.documentElement.classList.remove("tab-hidden");
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      io?.disconnect();
      mutationObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pathname]);

  return null;
}
