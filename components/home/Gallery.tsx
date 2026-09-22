'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { GALLERY, GALLERY_FILTERS, type GalleryFilter } from '@/lib/data/content';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = GALLERY.filter((image) => filter === 'All' || image.category === filter);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard control while the lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : images[openIndex];

  return (
    <section id="gallery" className="section bg-dark">
      <div className="container">
        <SectionHeading eyebrow="Gallery" title="A Taste of Afropolitan" align="center" />

        <Reveal delay={0.1} className="mt-14">
          <div className="hide-scrollbar -mx-6 flex snap-x justify-start gap-8 overflow-x-auto px-6 sm:mx-0 sm:justify-center sm:px-0">
            {GALLERY_FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setFilter(option);
                  setOpenIndex(null);
                }}
                aria-pressed={filter === option}
                className={cn(
                  'shrink-0 snap-start whitespace-nowrap pb-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300',
                  filter === option
                    ? 'border-b border-teal-400 text-teal-300'
                    : 'border-b border-transparent text-white/50 hover:text-white',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Editorial mosaic */}
        <motion.div
          layout
          className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                layout
                type="button"
                onClick={() => setOpenIndex(index)}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`View ${image.alt}`}
                className={cn('group relative overflow-hidden', image.span)}
              >
                <Media
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  zoom
                  scrim
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-teal-300">
                    {image.category}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-teal-300 hover:text-teal-300 sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 z-10 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-teal-300 hover:text-teal-300 sm:left-8"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-3 z-10 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-teal-300 hover:text-teal-300 sm:right-8"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full w-full max-w-4xl"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-center gap-4 text-center">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-teal-300">
                  {active.category}
                </span>
                <span className="h-px w-8 bg-white/20" aria-hidden />
                <span className="text-sm font-light text-greyline">{active.alt}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
