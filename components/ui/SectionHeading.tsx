import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Rendered in gold immediately after the title — use for the accent phrase. */
  accent?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal delay={0.05}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold-400/60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.12}>
        <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          {title}
          {accent ? <span className="text-gradient-gold"> {accent}</span> : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-charcoal-200/80 sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
