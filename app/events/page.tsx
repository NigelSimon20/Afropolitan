import type { Metadata } from 'next';
import { CalendarDays, Music4, Sun } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import ReservationCTA from '@/components/home/ReservationCTA';
import { SPECIAL_EVENTS, SUNDAY_EVENTS, WEEKLY_EVENTS } from '@/lib/data/events';
import type { EventItem } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Live Music',
  description:
    'Weekly gigs, live bands, DJ takeovers and Sunday chill sessions at Afropolitan Restaurant, Bar & Grill in Harare.',
};

interface EventSectionProps {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  events: EventItem[];
  /** Roomier two-up grid for the slower Sunday programme. */
  wide?: boolean;
}

function EventSection({
  id,
  icon: Icon,
  eyebrow,
  title,
  accent,
  description,
  events,
  wide = false,
}: EventSectionProps) {
  if (events.length === 0) return null;

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold leading-[1.05] sm:text-4xl">
              {title} <span className="text-gradient-gold">{accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-charcoal-200/80 sm:text-lg">{description}</p>
          </Reveal>
        </div>

        <div
          className={
            wide
              ? 'mt-12 grid gap-6 lg:grid-cols-2'
              : 'mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events & Live Music"
        title="Every week has"
        accent="a soundtrack"
        description="Open mic on Wednesday, jazz on Thursday, the full floor Friday and Saturday, and a Sunday that asks nothing of you. Entry details below — booths and tables book out fast on weekends."
      />

      <div className="bg-charcoal-800">
        <EventSection
          id="weekly"
          icon={Music4}
          eyebrow="Weekly line-up"
          title="The gigs that run"
          accent="every week"
          description="Same nights, new artists. Doors open at 6 PM and the kitchen serves the full braai menu right through the sets."
          events={WEEKLY_EVENTS}
        />

        <div className="border-y border-white/5 bg-charcoal-900">
          <EventSection
            id="sunday"
            icon={Sun}
            eyebrow="Sunday chill sessions"
            title="Slow down, it's"
            accent="Sunday"
            description="Acoustic sets under the trees, a braai on low coals and gelato for the kids. No cover, no rush — just the longest lunch of the week."
            events={SUNDAY_EVENTS}
            wide
          />
        </div>

        <EventSection
          id="special"
          icon={CalendarDays}
          eyebrow="One-offs"
          title="Special"
          accent="takeovers"
          description="Guest selectors, seasonal tastings and collaborations. Limited capacity — pre-sale goes out on our Instagram first."
          events={SPECIAL_EVENTS}
        />
      </div>

      <ReservationCTA />
    </>
  );
}
