'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Flame, MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: the video drifts slower than the copy for depth.
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain-overlay relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* ---------- Background media ---------- *
       * Set `SITE.heroVideo` to a file under /public and the video takes over.
       * Until then the poster still carries the hero, with a slow drift on it —
       * and nothing 404s in the console.
       */}
      <motion.div style={{ y: mediaY }} className="absolute inset-0 -z-20 h-[120%]">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#3A2418_0%,#1A1A1A_55%,#0B0B0B_100%)]" />
        {SITE.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={SITE.heroPoster}
            aria-hidden
            className="h-full w-full object-cover opacity-70"
          >
            <source src={SITE.heroVideo} />
          </video>
        ) : (
          <motion.div
            aria-hidden
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            className="h-full w-full bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${SITE.heroPoster})` }}
          />
        )}
      </motion.div>

      {/* Scrims: keep the headline readable over any footage */}
      <div className="absolute inset-0 -z-10 bg-night-fade" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/45 to-transparent"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative pb-24 pt-32 sm:pb-28"
      >
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-charcoal-950/50 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-gold-400 backdrop-blur-md"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {SITE.city}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-cream"
          >
            Braai by day.
            <br />
            <span className="text-gradient-gold">Afrobeat</span> by night.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-100/80 sm:text-lg"
          >
            An all-day kitchen, a hardwood grill and a bar that doesn&apos;t call last orders early.
            Family tables at noon, live sets and a full floor by midnight.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/menu" size="lg" className="w-full sm:w-auto">
              <Flame className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden />
              View Menu
            </ButtonLink>
            <ButtonLink href="/reservations" variant="secondary" size="lg" className="w-full sm:w-auto">
              Book a Table
            </ButtonLink>
          </motion.div>

          {/* Hours strip */}
          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6"
          >
            <div>
              <dt className="text-[0.65rem] uppercase tracking-eyebrow text-charcoal-300">
                Sun — Wed
              </dt>
              <dd className="mt-1 font-display text-lg font-bold text-cream">8:00 AM – 12:00 AM</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-eyebrow text-charcoal-300">
                Thu — Sat
              </dt>
              <dd className="mt-1 font-display text-lg font-bold text-terracotta-400">
                8:00 AM – 3:00 AM
              </dd>
            </div>
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#vibe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/50 transition-colors hover:text-gold-400"
      >
        <ChevronDown className="h-7 w-7 animate-float" aria-hidden />
      </motion.a>
    </section>
  );
}
