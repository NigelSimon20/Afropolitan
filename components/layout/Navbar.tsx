'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { WhatsAppIcon } from './WhatsAppButton';
import { NAV_LINKS, WHATSAPP_PENDING, whatsappUrl } from '@/lib/site';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 32));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk',
          scrolled
            ? 'border-b border-white/10 bg-ink/90 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-6',
        )}
      >
        <nav className="container flex items-center justify-between gap-6" aria-label="Primary">
          <Logo size="nav" priority />

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/menu' ? pathname === '/menu' : pathname === '/' && link.href === '/#top';
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'link-underline font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300',
                      active ? 'text-teal-300' : 'text-white/70 hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/#reserve"
            className="hidden bg-teal-500 px-6 py-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-silk hover:bg-teal-400 hover:shadow-teal lg:inline-flex"
          >
            Reserve a Table
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors hover:border-teal-300 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex h-full flex-col justify-center gap-1 pb-28 pt-24">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/10 py-5 font-display text-3xl font-light uppercase tracking-[0.12em] text-white transition-colors hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="mt-10 flex flex-col gap-3"
              >
                <Link
                  href="/#reserve"
                  className="bg-teal-500 px-6 py-4 text-center font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Reserve a Table
                </Link>
                <a
                  href={whatsappUrl()}
                  {...(WHATSAPP_PENDING
                    ? { title: 'WhatsApp number to be confirmed by Afropolitan' }
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex items-center justify-center gap-3 border border-white/25 px-6 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
