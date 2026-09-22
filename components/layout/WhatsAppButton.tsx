'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { WHATSAPP_URL } from '@/lib/site';

/** Lucide dropped brand glyphs, so the WhatsApp mark is inlined here. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.9 9.825 9.825 0 012.893 6.992c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Floating booking shortcut. Sits above the footer on every page and expands to
 * a label on hover/focus so the purpose is obvious on desktop.
 */
export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a table on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-foliage-500 py-3.5 pl-4 pr-4 text-cream shadow-[0_18px_40px_-12px_rgba(76,154,90,0.7)] sm:bottom-8 sm:right-8"
    >
      {/* Attention ring */}
      <span
        className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-foliage-500/60"
        aria-hidden
      />
      <WhatsAppIcon className="h-6 w-6 shrink-0" />

      <AnimatePresence initial={false}>
        {hovered ? (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="hidden overflow-hidden whitespace-nowrap text-sm font-semibold sm:block"
          >
            Book on WhatsApp
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.a>
  );
}
