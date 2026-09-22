import { ArrowRight } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { FEATURED_EVENTS } from '@/lib/data/events';

export default function FeaturedEvents() {
  return (
    <section className="section relative bg-charcoal-900">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What's on"
            title="Live this week at"
            accent="Afropolitan"
            description="Three nights that define the room — plus a Sunday built entirely for slowing down."
          />
          <Reveal delay={0.2}>
            <ButtonLink href="/events" variant="secondary" className="shrink-0">
              All events
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_EVENTS.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
