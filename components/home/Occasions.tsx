import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton';
import { OCCASIONS } from '@/lib/data/content';
import { WHATSAPP_PENDING, whatsappUrl } from '@/lib/site';

export default function Occasions() {
  return (
    <section id="occasions" className="relative isolate overflow-hidden">
      <Media
        src="/media/occasion.jpg"
        alt="Guests raising a toast"
        className="-z-10"
        sizes="100vw"
        inset
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/50"
        aria-hidden
      />

      <div className="container section">
        <div className="max-w-2xl">
          <Reveal delay={0.05}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-teal-400/70" aria-hidden />
              Private Dining &amp; Events
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
              Make It an Occasion
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="rule mt-8" />
          </Reveal>
          <Reveal delay={0.26}>
            <p className="lead mt-8 text-white/70">
              From intimate dinners to celebrations and social gatherings, Afropolitan provides a
              setting for moments worth remembering.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-10">
            {OCCASIONS.map((occasion) => (
              <li
                key={occasion.title}
                className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70"
              >
                {occasion.title}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/#reserve" size="lg">
              Plan Your Event
            </ButtonLink>
            <ButtonAnchor
              href={whatsappUrl(
                "Hello Afropolitan Restaurant Bar & Grill,\nI'd like to enquire about hosting an event.",
              )}
              {...(WHATSAPP_PENDING
                ? { title: 'WhatsApp number to be confirmed by Afropolitan' }
                : { target: '_blank', rel: 'noopener noreferrer' })}
              variant="outline"
              size="lg"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </ButtonAnchor>
          </div>
        </Reveal>

        <Reveal delay={0.44}>
          <p className="mt-8 text-xs font-light italic text-white/40">
            Event categories shown for layout purposes — to be confirmed with Afropolitan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
