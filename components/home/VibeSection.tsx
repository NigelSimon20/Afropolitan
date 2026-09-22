'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Disc3, Flame, Moon, Sun, Users, Wine } from 'lucide-react';
import MediaFrame from '@/components/ui/MediaFrame';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const PANELS = [
  {
    key: 'day',
    icon: Sun,
    eyebrow: 'From 8 AM',
    title: 'Sunlit days',
    copy: 'Coffee on the terrace, a long family braai under the trees, kids on the gelato counter. The kind of afternoon nobody wants to end.',
    image: '/media/vibe-day.jpg',
    tone: 'foliage' as const,
    accent: 'text-foliage-400',
    ring: 'border-foliage-500/25',
    points: [
      { icon: Users, label: 'Family tables & garden seating' },
      { icon: Flame, label: 'Slow braai over hardwood coals' },
    ],
  },
  {
    key: 'night',
    icon: Moon,
    eyebrow: 'Until 3 AM',
    title: 'Electric nights',
    copy: 'The lights drop, the log drums start and the courtyard turns into a floor. Live bands Thursday to Saturday, cocktails until the small hours.',
    image: '/media/vibe-night.jpg',
    tone: 'terracotta' as const,
    accent: 'text-terracotta-400',
    ring: 'border-terracotta-500/25',
    points: [
      { icon: Disc3, label: 'Afrobeat, amapiano & live sets' },
      { icon: Wine, label: 'Late bar and bottle service' },
    ],
  },
];

export default function VibeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // The day panel warms into the night panel as the section passes through view.
  const dayGlow = useTransform(scrollYProgress, [0.1, 0.6], [0.5, 0]);
  const nightGlow = useTransform(scrollYProgress, [0.3, 0.85], [0, 0.55]);

  return (
    <section id="vibe" ref={ref} className="section relative overflow-hidden bg-charcoal-800">
      {/* Day → night wash behind the panels */}
      <motion.div
        style={{ opacity: dayGlow }}
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-foliage-500/20 blur-[120px]"
        aria-hidden
      />
      <motion.div
        style={{ opacity: nightGlow }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-terracotta-500/25 blur-[120px]"
        aria-hidden
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold-400/60" aria-hidden />
              The Afropolitan vibe
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">
              One address,{' '}
              <span className="text-gradient-gold">two completely different rooms</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-charcoal-200/80 sm:text-lg">
              Open from breakfast to the early hours — the room changes character with the light, and
              so does the reason to come.
            </p>
          </Reveal>
        </div>

        {/* Day / night panels */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PANELS.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <Reveal
                key={panel.key}
                as="article"
                delay={index * 0.12}
                direction={index === 0 ? 'right' : 'left'}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border bg-charcoal-700/40',
                  panel.ring,
                )}
              >
                <MediaFrame
                  src={panel.image}
                  alt={panel.title}
                  tone={panel.tone}
                  className="h-64 w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04] sm:h-72"
                >
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-charcoal-950/70 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-cream backdrop-blur-md">
                    <Icon className={cn('h-3.5 w-3.5', panel.accent)} aria-hidden />
                    {panel.eyebrow}
                  </span>
                </MediaFrame>

                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">{panel.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-200/80 sm:text-base">
                    {panel.copy}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {panel.points.map((point) => {
                      const PointIcon = point.icon;
                      return (
                        <li key={point.label} className="flex items-center gap-3 text-sm text-charcoal-200">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                            <PointIcon className={cn('h-4 w-4', panel.accent)} aria-hidden />
                          </span>
                          {point.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
