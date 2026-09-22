import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MediaProps {
  src: string;
  alt: string;
  className?: string;
  /** Responsive sizes hint — set it per layout slot for a tight srcset. */
  sizes?: string;
  priority?: boolean;
  /** Gentle zoom when the parent `.group` is hovered. */
  zoom?: boolean;
  /** Bottom-up scrim so overlaid type stays legible. */
  scrim?: boolean;
  /**
   * Position the frame as a full-bleed background layer. Needed because the
   * wrapper is `relative` by default (next/image `fill` requires a positioned
   * ancestor) and passing `absolute` in `className` would not win the cascade.
   */
  inset?: boolean;
  children?: React.ReactNode;
}

/**
 * Every photographic slot on the site goes through here, so art direction —
 * crop, scrim, hover zoom, grain — stays consistent, and swapping a placeholder
 * for a real photograph is a file change and nothing else.
 */
export default function Media({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
  zoom = false,
  scrim = false,
  inset = false,
  children,
}: MediaProps) {
  return (
    <div
      className={cn(
        inset ? 'absolute inset-0 overflow-hidden bg-dark' : 'relative overflow-hidden bg-dark',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-cover',
          zoom && 'transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.06]',
        )}
      />
      {scrim ? <div className="absolute inset-0 bg-card-scrim" aria-hidden /> : null}
      {children}
    </div>
  );
}
