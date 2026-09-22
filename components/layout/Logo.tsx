import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';

/* ==================================================================== *
 *  Afropolitan logo
 *
 *  Source artwork: public/media/logo.jpeg (supplied by the client).
 *  Rendered from:  public/media/logo.png  — a transparent version derived
 *  by scripts/extract_logo.py. The JPEG has a solid black background, which
 *  would show as a black rectangle in the navbar (transparent over the hero
 *  photograph), so the alpha channel has to be recovered.
 *
 *  The artwork already contains "Restaurant Bar & Grill", so nothing here
 *  sets that line separately — doing so would print it twice.
 *
 *  The mark is white and teal, intended for dark surfaces only. If it is
 *  ever needed on the soft-white sections, ask the client for a dark
 *  variant; and if a vector (SVG/PDF/AI) arrives, use that instead of the
 *  raster and delete the extraction script.
 * ==================================================================== */

/** Intrinsic size of public/media/logo.png. */
const INTRINSIC = { width: 411, height: 113 };

type LogoSize = 'nav' | 'hero' | 'footer';

const widths: Record<LogoSize, string> = {
  nav: 'w-[132px] sm:w-[152px]',
  // Capped at the artwork's native width so it never upscales and softens.
  hero: 'w-[248px] sm:w-[340px] lg:w-[411px]',
  footer: 'w-[180px]',
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  /** Renders as a link to home. Off in the hero, where it is the headline. */
  asLink?: boolean;
  priority?: boolean;
}

function Mark({ size, priority }: { size: LogoSize; priority: boolean }) {
  return (
    <Image
      src="/media/logo.png"
      alt={SITE.fullName}
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      priority={priority}
      sizes="(min-width: 1024px) 411px, (min-width: 640px) 340px, 248px"
      className={cn('h-auto', widths[size])}
    />
  );
}

export default function Logo({
  size = 'nav',
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  if (!asLink) {
    return (
      <span className={cn('block', className)}>
        <Mark size={size} priority={priority} />
      </span>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${SITE.fullName} — home`}
      className={cn('block transition-opacity duration-300 hover:opacity-80', className)}
    >
      <Mark size={size} priority={priority} />
    </Link>
  );
}
