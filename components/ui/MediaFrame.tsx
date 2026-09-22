import { cn } from '@/lib/utils';

export type MediaTone = 'terracotta' | 'gold' | 'foliage' | 'charcoal';

/**
 * Image placeholder.
 *
 * The real photo and a tinted gradient are layered in the same
 * `background-image`, so while `/public` is still empty the gradient shows and
 * nothing looks broken. Drop the JPG in at the same path and it takes over — no
 * code change, no broken-image icon in between.
 */
const tones: Record<MediaTone, string> = {
  terracotta:
    'linear-gradient(145deg, #7D3B1D 0%, #C4622F 45%, #30160B 100%)',
  gold: 'linear-gradient(145deg, #75551E 0%, #D6A64A 48%, #2A1E0B 100%)',
  foliage: 'linear-gradient(145deg, #204126 0%, #4C9A5A 48%, #132616 100%)',
  charcoal: 'linear-gradient(145deg, #262524 0%, #4A4643 50%, #0B0B0B 100%)',
};

interface MediaFrameProps {
  src?: string;
  /** Used for the accessible label of this decorative frame. */
  alt?: string;
  tone?: MediaTone;
  className?: string;
  /** Rendered on top of the media — badges, captions, gradients. */
  children?: React.ReactNode;
  /** Darkening scrim so overlaid text stays readable. */
  overlay?: boolean;
}

export default function MediaFrame({
  src,
  alt,
  tone = 'terracotta',
  className,
  children,
  overlay = true,
}: MediaFrameProps) {
  const layers = src ? `url("${src}"), ${tones[tone]}` : tones[tone];

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative overflow-hidden bg-cover bg-center bg-no-repeat',
        className,
      )}
      style={{ backgroundImage: layers }}
    >
      {overlay ? (
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent"
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}
