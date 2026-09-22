'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Transparent over the hero, solid charcoal once the user starts scrolling.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk',
          scrolled
            ? 'border-b border-white/5 bg-charcoal-900/95 py-3 shadow-plate backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5',
        )}
      >
        <nav
          className="container flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Wordmark */}
          <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.name} home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-terracotta-500 font-display text-lg font-extrabold text-cream transition-transform duration-300 ease-silk group-hover:rotate-[-8deg]">
              A
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold uppercase tracking-tight text-cream sm:text-xl">
                Afropolitan
              </span>
              <span className="hidden text-[0.6rem] uppercase tracking-eyebrow text-gold-400 sm:block">
                Restaurant · Bar · Grill
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                      active ? 'text-gold-400' : 'text-cream/75 hover:text-cream',
                    )}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gold-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop call CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:+${SITE.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-medium text-cream/75 transition-colors hover:text-gold-400"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <Link
              href="/reservations"
              className="rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 ease-silk hover:bg-terracotta-400 hover:shadow-ember"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-cream backdrop-blur-md transition-colors hover:border-gold-400/50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex h-full flex-col justify-center gap-2 pb-24 pt-24">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/5 py-5 font-display text-3xl font-bold tracking-tight text-cream transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href="/reservations"
                  className="rounded-full bg-terracotta-500 px-6 py-4 text-center text-base font-semibold text-cream"
                >
                  Book a Table
                </Link>
                <a
                  href={`tel:+${SITE.phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-base font-medium text-cream"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
