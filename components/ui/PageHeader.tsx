import Reveal from './Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
}

/** Shared masthead for interior pages — sits under the fixed navbar. */
export default function PageHeader({ eyebrow, title, accent, description }: PageHeaderProps) {
  return (
    <header className="grain-overlay relative overflow-hidden border-b border-white/5 bg-charcoal-900 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="absolute inset-0 bg-ember-glow" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-terracotta-500/10 blur-[110px]"
        aria-hidden
      />

      <div className="container relative max-w-3xl">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold-400/60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            {title}
            {accent ? <span className="text-gradient-gold"> {accent}</span> : null}
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-200/80 sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
