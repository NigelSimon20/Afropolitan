import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Rendered in caps as the first line. */
  title: string;
  /** Serif italic second line, e.g. "Restaurant Bar & Grill". */
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const centred = align === 'center';

  return (
    <div className={cn('max-w-2xl', centred && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <Reveal delay={0.05}>
          <span className={cn('eyebrow', centred && 'justify-center')}>
            <span className="h-px w-8 bg-teal-400/70" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.12}>
        <h2
          className={cn(
            'mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.02em] sm:text-5xl lg:text-[3.5rem]',
            tone === 'dark' ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.18}>
          <p
            className={cn(
              'mt-3 font-display text-xl font-light italic sm:text-2xl',
              tone === 'dark' ? 'text-teal-200' : 'text-teal-600',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.24}>
        <span className={cn('rule mt-8', centred && 'mx-auto')} />
      </Reveal>

      {description ? (
        <Reveal delay={0.3}>
          <p className={cn('lead mt-8', centred && 'mx-auto', tone === 'light' && 'text-ink/60')}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
