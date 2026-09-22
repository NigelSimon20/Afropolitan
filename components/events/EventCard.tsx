'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Music2, Ticket } from 'lucide-react';
import MediaFrame, { type MediaTone } from '@/components/ui/MediaFrame';
import type { EventItem } from '@/lib/types';
import { cn, formatEventDate, formatPrice } from '@/lib/utils';

const TONE_BY_CATEGORY: Record<EventItem['category'], MediaTone> = {
  weekly: 'terracotta',
  sunday: 'foliage',
  special: 'gold',
};

interface EventCardProps {
  event: EventItem;
  index?: number;
  className?: string;
}

export default function EventCard({ event, index = 0, className }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-charcoal-700/50 transition-colors duration-500 hover:border-gold-400/35',
        className,
      )}
    >
      <MediaFrame
        src={event.image}
        alt={event.title}
        tone={TONE_BY_CATEGORY[event.category]}
        className="h-52 w-full shrink-0 transition-transform duration-700 ease-silk group-hover:scale-[1.05]"
      >
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-950/75 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold-400 backdrop-blur-md">
            <Music2 className="h-3 w-3" aria-hidden />
            {event.tag}
          </span>
          {event.recurrence ? (
            <span className="rounded-full bg-terracotta-500/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-cream">
              {event.recurrence}
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-5 bottom-4">
          <h3 className="font-display text-xl font-bold leading-tight text-cream sm:text-2xl">
            {event.title}
          </h3>
          {event.artist ? (
            <p className="mt-1 text-sm text-gold-400/90">{event.artist}</p>
          ) : null}
        </div>
      </MediaFrame>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-charcoal-300">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-terracotta-400" aria-hidden />
            <time dateTime={event.date}>{formatEventDate(event.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-terracotta-400" aria-hidden />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5 text-terracotta-400" aria-hidden />
            {event.cover ? formatPrice(event.cover) : 'Free entry'}
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-200/80">
          {event.description}
        </p>

        <Link
          href="/reservations"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
        >
          Reserve for this night
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
