'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryTabs, { type TabValue } from '@/components/menu/CategoryTabs';
import MenuList from '@/components/menu/MenuList';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { MENU_DISCLAIMER, getMenuItems } from '@/lib/data/menu';

/** Preview only — the full list lives on /menu. */
const PREVIEW_COUNT = 5;

export default function MenuPreview() {
  const [category, setCategory] = useState<TabValue>('all');
  const items = getMenuItems(category).slice(0, PREVIEW_COUNT);

  return (
    <section id="menu" className="section bg-dark">
      <div className="container">
        <SectionHeading
          eyebrow="Something For Every Occasion"
          title="Our Menu"
          align="center"
        />

        <Reveal delay={0.1} className="mt-14">
          <CategoryTabs value={category} onChange={setCategory} layoutId="menu-preview-tab" />
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="group">
            <Media
              src="/media/grill.jpg"
              alt="Ribs served from the grill"
              className="aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 45vw, 100vw"
              zoom
              scrim
            >
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <p className="eyebrow">From The</p>
                <h3 className="mt-3 font-display text-3xl font-light uppercase tracking-[0.08em] text-white sm:text-4xl">
                  Grill
                </h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-white/70">
                  Our selection of grilled favourites, prepared fresh to order.
                </p>
              </div>
            </Media>
          </Reveal>

          <div>
            <div role="tabpanel" id={`panel-${category}`} aria-labelledby={`tab-${category}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MenuList items={items} />
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-8 text-xs font-light italic leading-relaxed text-greyline/50">
              {MENU_DISCLAIMER}
            </p>

            <ButtonLink href="/menu" variant="outline" size="lg" className="mt-9">
              View Full Menu
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
