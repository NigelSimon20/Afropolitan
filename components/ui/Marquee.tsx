import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Infinite ticker strip — the content is duplicated so the loop is seamless. */
export default function Marquee({ items, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        'relative flex overflow-hidden border-y border-white/5 bg-charcoal-900 py-4',
        className,
      )}
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-eyebrow text-charcoal-300"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
