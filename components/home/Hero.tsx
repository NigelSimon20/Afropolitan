'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { SITE } from '@/lib/site';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background: slow cinematic zoom on load, per the brief */}
      <div className="absolute inset-0 -z-20">
        {SITE.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={SITE.heroImage}
            aria-hidden
            className="h-full w-full object-cover"
          >
            <source src={SITE.heroVideo} />
          </video>
        ) : (
          <Image
            src={SITE.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-slow-zoom object-cover"
          />
        )}
      </div>

      {/* Black scrims keep the white typography prominent over any photograph:
          one vertical, one across the left column where all the copy sits. */}
      <div className="absolute inset-0 -z-10 bg-hero-scrim" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative pb-32 pt-32 sm:pb-36"
      >
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={rise}>
            <Logo size="hero" asLink={false} priority />
          </motion.div>

          <motion.div variants={rise}>
            <span className="rule mt-10" />
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-9 max-w-md text-sm font-light leading-[2] tracking-wide text-white/75 sm:text-base"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div variants={rise} className="mt-11 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="group/btn inline-flex items-center justify-center gap-3 bg-teal-500 px-9 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-silk hover:bg-teal-400 hover:shadow-teal"
            >
              Explore Our Menu
              <span
                aria-hidden
                className="inline-block w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-500 ease-silk group-hover/btn:w-3 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
              >
                →
              </span>
            </Link>
            <Link
              href="/#reserve"
              className="group/btn inline-flex items-center justify-center gap-3 border border-white/30 px-9 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-500 ease-silk hover:border-teal-300 hover:bg-teal-500/10"
            >
              Reserve a Table
              <span
                aria-hidden
                className="inline-block w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-500 ease-silk group-hover/btn:w-3 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Scroll to About"
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 transition-colors hover:text-teal-300 sm:bottom-10 sm:block"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  );
}
