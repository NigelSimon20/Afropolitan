'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Search, X } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import { MENU_CATEGORIES, MENU_ITEMS } from '@/lib/data/menu';
import type { MenuCategoryId } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function MenuExplorer() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('breakfast');
  const [query, setQuery] = useState('');

  const activeMeta = MENU_CATEGORIES.find((category) => category.id === activeCategory)!;

  // Filtering is plain derived state — no data fetching, no effects.
  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (!term) return true;
      return (
        item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
      );
    });
  }, [activeCategory, query]);

  return (
    <section className="section bg-charcoal-800">
      <div className="container">
        {/* ------------------------------ Controls ------------------------------ */}
        <div className="sticky top-[4.5rem] z-30 -mx-5 bg-charcoal-800/90 px-5 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tabs — horizontally scrollable on mobile */}
            <div
              role="tablist"
              aria-label="Menu categories"
              className="hide-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1"
            >
              {MENU_CATEGORIES.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${category.id}`}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'relative shrink-0 snap-start whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300',
                      isActive ? 'text-charcoal-900' : 'text-charcoal-200 hover:text-cream',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="menu-tab-pill"
                        className="absolute inset-0 rounded-full bg-gold-sheen"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
                    )}
                    <span className="relative z-10">{category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search within the active category */}
            <div className="relative lg:w-64">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${activeMeta.label.toLowerCase()}…`}
                aria-label={`Search within ${activeMeta.label}`}
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-11 pr-10 text-sm text-cream placeholder:text-charcoal-400 transition-colors focus:border-gold-400/50"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-charcoal-300 hover:text-cream"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* --------------------------- Category intro --------------------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMeta.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{activeMeta.label}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-charcoal-300">
              <Clock className="h-3 w-3 text-terracotta-400" aria-hidden />
              {activeMeta.served}
            </span>
            <p className="w-full text-sm text-charcoal-200/75 sm:text-base">{activeMeta.tagline}</p>
          </motion.div>
        </AnimatePresence>

        {/* ------------------------------- Items -------------------------------- */}
        <div
          role="tabpanel"
          id={`panel-${activeMeta.id}`}
          aria-labelledby={`tab-${activeMeta.id}`}
          tabIndex={-1}
        >
          <motion.ul layout className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => (
                <MenuItemCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.ul>

          {visibleItems.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 rounded-2xl border border-dashed border-white/10 py-14 text-center text-sm text-charcoal-300"
            >
              Nothing on the {activeMeta.label.toLowerCase()} menu matches{' '}
              <span className="text-cream">“{query}”</span>.
            </motion.p>
          ) : null}
        </div>

        <p className="mt-12 text-xs text-charcoal-400">
          All prices in USD and include VAT. Please tell your server about any allergies — several
          dishes are prepared on shared grills.
        </p>
      </div>
    </section>
  );
}
