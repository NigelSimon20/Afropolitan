'use client';

import { motion } from 'framer-motion';
import { WHATSAPP_PENDING, whatsappUrl } from '@/lib/site';

/** Lucide has no brand glyphs, so the WhatsApp mark is inlined. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.9 9.825 9.825 0 012.893 6.992c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const linkProps = WHATSAPP_PENDING
  ? { title: 'WhatsApp number to be confirmed by Afropolitan' }
  : { target: '_blank', rel: 'noopener noreferrer' };

/**
 * Desktop: a floating teal circle, bottom-right.
 * Mobile: a fixed full-width bar, which converts far better on phones — and
 * most Afropolitan traffic will arrive from WhatsApp and social.
 */
export default function WhatsAppButton() {
  const href = whatsappUrl();

  return (
    <>
      {/* Desktop */}
      <motion.a
        href={href}
        {...linkProps}
        aria-label="WhatsApp Afropolitan"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group fixed bottom-8 right-8 z-40 hidden h-14 w-14 place-items-center rounded-full bg-teal-500 text-white shadow-teal sm:grid"
      >
        <span
          className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-teal-500/60"
          aria-hidden
        />
        <WhatsAppIcon className="h-6 w-6" />
        <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap bg-ink/90 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          WhatsApp Us
        </span>
      </motion.a>

      {/* Mobile */}
      <a
        href={href}
        {...linkProps}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3 bg-teal-500 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white sm:hidden"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp Afropolitan
      </a>
    </>
  );
}
