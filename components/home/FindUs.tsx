import { MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton';
import { OPENING_HOURS, SITE, WHATSAPP_PENDING, whatsappUrl } from '@/lib/site';

export default function FindUs() {
  return (
    <section id="find-us" className="section bg-ink">
      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-teal-400/70" aria-hidden />
              Location
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.03em] text-white sm:text-5xl">
              Find Us
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="rule mt-8" />
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-9 font-display text-2xl font-light italic text-teal-200">
              {SITE.fullName}
            </p>
            <p className="mt-3 flex items-start gap-3 text-sm font-light leading-[1.9] text-greyline">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden />
              {SITE.cityCountry}
            </p>
            <p className="mt-2 pl-7 text-xs font-light italic text-greyline/50">
              Exact street address to be confirmed with Afropolitan.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-10 border-t border-white/10 pt-8">
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-teal-300">
                Opening Hours
              </dt>
              {OPENING_HOURS.map((entry) => (
                <dd
                  key={entry.days}
                  className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-sm font-light text-greyline"
                >
                  <span>{entry.days}</span>
                  <span className="text-white">{entry.hours}</span>
                </dd>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonAnchor
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Get Directions
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappUrl()}
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
        </div>

        <Reveal delay={0.16} direction="left" className="lg:col-span-7">
          <div className="border border-white/10">
            {SITE.mapEmbedUrl ? (
              <iframe
                src={SITE.mapEmbedUrl}
                title={`Map to ${SITE.fullName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[4/3] w-full grayscale contrast-125 lg:aspect-[5/4]"
              />
            ) : (
              /*
               * Google Maps → Share → "Embed a map" → copy the src, paste it into
               * SITE.mapEmbedUrl in lib/site.ts, and this placeholder swaps itself
               * out for the live map.
               */
              <div className="relative grid aspect-[4/3] w-full place-items-center bg-dark bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px] lg:aspect-[5/4]">
                <div className="px-6 text-center">
                  <MapPin className="mx-auto h-8 w-8 text-teal-400" strokeWidth={1.25} aria-hidden />
                  <p className="mt-4 font-display text-xl font-light uppercase tracking-[0.1em] text-white">
                    {SITE.area}
                  </p>
                  <p className="mt-3 text-xs font-light leading-relaxed text-greyline/60">
                    Google Maps embed to be added
                    <br />
                    <code className="text-[0.65rem] text-teal-300">SITE.mapEmbedUrl</code>
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
