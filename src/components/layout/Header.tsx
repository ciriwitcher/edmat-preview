"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { navigationConfig, siteConfig } from "@/lib/site-config";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Zamknij otwarte menu przy zmianie trasy — aktualizacja stanu w trakcie
  // renderu (a nie w efekcie) zgodnie z zaleceniem React dla "resetowania
  // stanu przy zmianie propsów/route".
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  // Blokada scrolla body. `overflow: hidden` na body NIE zatrzymuje touch-scrolla
  // tła w mobile Safari (rubber-band/elastic scroll przebija blokadę i potrafi
  // przesunąć pozycję strony pod spodem). Jedyna niezawodna technika to
  // przypięcie body na `position: fixed` ze skompensowanym `top`, i przywrócenie
  // dokładnej pozycji scrolla po zamknięciu — bez tego Test C/D/E z audytu (scroll
  // pozostaje w tym samym miejscu po zamknięciu; wielokrotne otwarcie/zamknięcie
  // nie blokuje strony na trwałe) by nie przechodziły na realnym iOS.
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.classList.add("mobile-nav-open");

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.classList.remove("mobile-nav-open");
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Gdy viewport przechodzi z mobile na desktop (np. obrót ekranu / zmiana
  // rozmiaru okna) podczas otwartego mobile menu, hamburger i panel znikają
  // (lg:hidden), ale bez tego stan (i blokada scrolla body) zostałby "osierocony".
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function syncToDesktop(e: MediaQueryList | MediaQueryListEvent) {
      if (e.matches) {
        setMobileOpen(false);
        setMobileSection(null);
      }
    }
    syncToDesktop(query);
    query.addEventListener("change", syncToDesktop);
    return () => query.removeEventListener("change", syncToDesktop);
  }, []);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line">
      {/* backdrop-blur żyje na tym wewnętrznym div, nie na <header> — filter/backdrop-filter na
          przodku tworzy nowy containing block dla position:fixed potomków (spec CSS), co na
          Safari/iOS scopowałoby #mobile-nav do 80px-owego <header>, zamiast do viewportu. */}
      <div className="bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-edmat flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Nawigacja główna" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigationConfig.main.map((item) => {
              const hasMenu = "megaMenu" in item && item.megaMenu;
              if (!hasMenu) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded px-4 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = openMenu === item.label;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className="flex items-center gap-1.5 rounded px-4 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isOpen && "megaMenu" in item && item.megaMenu && (
                    <div
                      className="absolute left-0 top-full w-[min(90vw,44rem)] pt-3"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="rounded-lg border border-line bg-white p-6 shadow-xl shadow-ink/5">
                        <Link
                          href={item.megaMenu.intro.href}
                          className="mb-5 flex items-start justify-between gap-4 border-b border-line-soft pb-5"
                        >
                          <span>
                            <span className="block font-display text-lg text-ink">
                              {item.megaMenu.intro.label}
                            </span>
                            <span className="mt-1 block text-sm text-ink-soft">
                              {item.megaMenu.intro.description}
                            </span>
                          </span>
                          <span aria-hidden="true" className="mt-1 text-accent">→</span>
                        </Link>
                        <div className="grid grid-cols-3 gap-6">
                          {item.megaMenu.columns.map((column) => (
                            <div key={column.title}>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                                {column.title}
                              </p>
                              <ul className="space-y-2.5">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-ink hover:text-accent">
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-ink hover:text-accent md:flex"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {siteConfig.contact.phone}
          </a>
          <Link
            href="/kontakt"
            className="hidden rounded-none bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark sm:inline-flex"
          >
            Zapytaj o wycenę
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Nawigacja mobilna"
          className="mobile-nav-panel fixed inset-x-0 top-20 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden"
        >
          <div className="container-edmat flex flex-col gap-1 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {navigationConfig.main.map((item) => {
              const hasMenu = "megaMenu" in item && item.megaMenu;
              if (!hasMenu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-line-soft py-4 text-lg font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isSectionOpen = mobileSection === item.label;
              return (
                <div key={item.label} className="border-b border-line-soft">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-lg font-medium text-ink"
                    aria-expanded={isSectionOpen}
                    aria-controls={`mobile-submenu-${item.label}`}
                    onClick={() => setMobileSection(isSectionOpen ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="8"
                      viewBox="0 0 10 6"
                      className={`shrink-0 transition-transform duration-200 ${isSectionOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isSectionOpen && "megaMenu" in item && item.megaMenu && (
                    <div id={`mobile-submenu-${item.label}`} className="pb-4 pl-2">
                      <Link href={item.megaMenu.intro.href} className="mb-3 block text-sm font-semibold text-accent">
                        {item.megaMenu.intro.label}
                      </Link>
                      {item.megaMenu.columns.map((column) => (
                        <div key={column.title} className="mb-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                            {column.title}
                          </p>
                          <ul className="space-y-3">
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link href={link.href} className="text-base text-ink">
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 flex flex-col gap-3">
              <a href={siteConfig.contact.phoneHref} className="flex items-center justify-center gap-2 border border-ink/25 py-3.5 text-base font-medium text-ink">
                {siteConfig.contact.phone}
              </a>
              <Link href="/kontakt" className="flex items-center justify-center bg-accent py-3.5 text-base font-medium text-white">
                Zapytaj o wycenę
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
