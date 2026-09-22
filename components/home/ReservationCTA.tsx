import { CalendarCheck, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { SITE, WHATSAPP_URL } from '@/lib/site';

export default function ReservationCTA() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-charcoal-800 py-20 sm:py-24">
      <div className="absolute inset-0 bg-ember-glow" aria-hidden />

      <div className="container relative text-center">
        <Reveal>
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold-400/60" aria-hidden />
            Reservations
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
            Pull up a chair at the <span className="text-gradient-gold">fire</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-charcoal-200/80 sm:text-lg">
            Tables for two, long family braais and booths for the late set. Weekend nights fill
            fast — book ahead or message us directly.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/reservations" size="lg" className="w-full sm:w-auto">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Book a Table
            </ButtonLink>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-cream backdrop-blur-md transition-all duration-300 ease-silk hover:border-foliage-400/60 hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-foliage-400" aria-hidden />
              WhatsApp {SITE.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
