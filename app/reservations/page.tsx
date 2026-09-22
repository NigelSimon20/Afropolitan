import type { Metadata } from 'next';
import { Clock, MapPin, Phone, Users } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import ReservationForm from '@/components/reservations/ReservationForm';
import { OPENING_HOURS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Reservations',
  description:
    'Book a table at Afropolitan Restaurant, Bar & Grill in Harare — family braais, dinner service and booths for live music nights.',
};

const NOTES = [
  {
    icon: Users,
    title: 'Groups of 10+',
    copy: 'Large tables and full-venue hire are handled by our events team — send us a note and we will call you back.',
  },
  {
    icon: Clock,
    title: 'Weekend nights',
    copy: 'Thursday to Saturday tables are held for 15 minutes past the booking time before they go back on the floor.',
  },
  {
    icon: MapPin,
    title: 'Where to find us',
    copy: SITE.address,
  },
];

export default function ReservationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="Book your seat"
        accent="at the fire"
        description="Tell us when you're coming and how many you are. We'll hold a table — courtyard, bar or a booth close to the stage."
      />

      <section className="section bg-charcoal-800">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <ReservationForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.12} direction="left">
              <div className="surface p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold">Opening hours</h2>
                <dl className="mt-5 space-y-4">
                  {OPENING_HOURS.map((entry) => (
                    <div key={entry.days} className="border-b border-white/5 pb-4 last:border-0">
                      <dt className="text-sm text-charcoal-300">{entry.days}</dt>
                      <dd className="mt-1 font-display text-lg font-bold text-terracotta-400">
                        {entry.hours}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={`tel:+${SITE.phoneRaw}`}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <div className="mt-6 space-y-4">
              {NOTES.map((note, index) => {
                const Icon = note.icon;
                return (
                  <Reveal key={note.title} delay={0.18 + index * 0.08} direction="left">
                    <div className="flex gap-4 rounded-2xl border border-white/5 bg-charcoal-700/40 p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                        <Icon className="h-4 w-4 text-terracotta-400" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold">{note.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-charcoal-200/75">
                          {note.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
