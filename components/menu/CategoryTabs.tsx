'use client';

import { motion } from 'framer-motion';
import type { MenuCategoryId } from '@/lib/types';
import { MENU_CATEGORIES } from '@/lib/data/menu';
import { cn } from '@/lib/utils';

export type TabValue = MenuCategoryId | 'all';

interface CategoryTabsProps {
  value: TabValue;
  onChange: (value: TabValue) => void;
  /** Shared layoutId must be unique per instance on the page. */
  layoutId: string;
  align?: 'left' | 'center';
}

const TABS: { id: TabValue; label: string }[] = [
  { id: 'all', label: 'All' },
  ...MENU_CATEGORIES.map((c) => ({ id: c.id as TabValue, label: c.label })),
];

export default function CategoryTabs({
  value,
  onChange,
  layoutId,
  align = 'center',
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className={cn(
        'hide-scrollbar -mx-6 flex snap-x gap-8 overflow-x-auto px-6 sm:mx-0 sm:px-0',
        align === 'center' && 'sm:justify-center',
      )}
    >
      {TABS.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative shrink-0 snap-start whitespace-nowrap pb-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300',
              active ? 'text-teal-300' : 'text-white/50 hover:text-white',
            )}
          >
            {tab.label}
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-0 bottom-0 h-px bg-teal-400"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
