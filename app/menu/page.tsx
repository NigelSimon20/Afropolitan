import type { Metadata } from 'next';
import MenuBoard from './MenuBoard';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Menu',
  description: `Starters, mains, grill, sides, drinks and desserts at ${SITE.fullName} in ${SITE.area}.`,
};

export default function MenuPage() {
  return (
    <>
      <header className="grain relative flex min-h-[62vh] items-end overflow-hidden">
        <Media
          src="/media/grill.jpg"
          alt=""
          className="-z-10"
          sizes="100vw"
          priority
          inset
        />
        <div className="absolute inset-0 -z-10 bg-hero-scrim" aria-hidden />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/20"
          aria-hidden
        />

        <div className="container pb-20 pt-40">
          <Reveal delay={0.05}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-teal-400/70" aria-hidden />
              Something For Every Occasion
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-6 font-display text-5xl font-light uppercase leading-[1.02] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
              Our Menu
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="rule mt-8" />
          </Reveal>
        </div>
      </header>

      <MenuBoard />

      <section className="border-t border-white/10 bg-dark py-20">
        <div className="container flex flex-col items-center gap-8 text-center">
          <h2 className="font-display text-3xl font-light uppercase tracking-[0.06em] text-white sm:text-4xl">
            Join Us at Afropolitan
          </h2>
          <span className="rule" />
          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/#reserve" size="lg">
              Reserve a Table
            </ButtonLink>
            <ButtonLink href="/#gallery" variant="outline" size="lg">
              View Gallery
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
