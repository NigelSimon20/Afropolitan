import { Flame, PartyPopper, UtensilsCrossed, Wine } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { EXPERIENCE } from '@/lib/data/content';
import type { ExperienceIcon } from '@/lib/types';

const ICONS: Record<ExperienceIcon, LucideIcon> = {
  dining: UtensilsCrossed,
  bar: Wine,
  grill: Flame,
  events: PartyPopper,
};

export default function Experience() {
  return (
    <section id="experience" className="section bg-ink">
      <div className="container">
        <SectionHeading
          eyebrow="What We Offer"
          title="The Afropolitan Experience"
          align="center"
        />

        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE.map((card, i) => {
            const Icon = ICONS[card.id];
            return (
              <Reveal
                key={card.id}
                as="article"
                delay={i * 0.1}
                className="group relative bg-ink p-9 transition-colors duration-700 hover:bg-teal-900/40 lg:p-11"
              >
                {/* Teal line draws across the top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal-400 transition-transform duration-700 ease-silk group-hover:scale-x-100"
                />
                <Icon
                  className="h-7 w-7 text-teal-400 transition-transform duration-700 ease-silk group-hover:-translate-y-1"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-8 font-display text-2xl font-light uppercase tracking-[0.06em] text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-[1.95] text-greyline">
                  {card.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
