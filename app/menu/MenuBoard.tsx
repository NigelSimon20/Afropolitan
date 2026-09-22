'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryTabs, { type TabValue } from '@/components/menu/CategoryTabs';
import MenuList from '@/components/menu/MenuList';
import { MENU_CATEGORIES, MENU_DISCLAIMER, MENU_ITEMS, getMenuItems } from '@/lib/data/menu';

/**
 * Full menu. "All" is grouped by course the way a printed menu reads; a single
 * category shows just that course.
 */
export default function MenuBoard() {
  const [category, setCategory] = useState<TabValue>('all');

  const groups =
    category === 'all'
      ? MENU_CATEGORIES.map((c) => ({
          id: c.id,
          label: c.label,
          items: MENU_ITEMS.filter((item) => item.category === c.id),
        }))
      : [
          {
            id: category,
            label: MENU_CATEGORIES.find((c) => c.id === category)?.label ?? '',
            items: getMenuItems(category),
          },
        ];

  return (
    <section className="section bg-ink">
      <div className="container">
        <div className="sticky top-[4.5rem] z-30 -mx-6 bg-ink/90 px-6 py-5 backdrop-blur-xl sm:mx-0 sm:px-0">
          <CategoryTabs value={category} onChange={setCategory} layoutId="menu-page-tab" />
        </div>

        <div role="tabpanel" id={`panel-${category}`} aria-labelledby={`tab-${category}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 space-y-20"
            >
              {groups.map((group) => (
                <div key={group.id} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-3">
                    <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] text-white lg:sticky lg:top-40">
                      {group.label}
                      <span className="mt-5 block h-px w-12 bg-teal-400" aria-hidden />
                    </h2>
                  </div>
                  <div className="lg:col-span-9">
                    <MenuList items={group.items} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-20 border-t border-white/10 pt-8 text-xs font-light italic leading-relaxed text-greyline/50">
          {MENU_DISCLAIMER} Allergen information available on request.
        </p>
      </div>
    </section>
  );
}
