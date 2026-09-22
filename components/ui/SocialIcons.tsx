import { Facebook, Instagram } from 'lucide-react';
import type { ReactElement } from 'react';
import type { SocialIcon } from '@/lib/types';

/** Lucide has no TikTok glyph, so it is inlined. */
function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.69a5.67 5.67 0 0 0-.77-.05A5.67 5.67 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<SocialIcon, (props: { className?: string }) => ReactElement> = {
  facebook: ({ className }) => <Facebook className={className} aria-hidden />,
  instagram: ({ className }) => <Instagram className={className} aria-hidden />,
  tiktok: TikTok,
};
