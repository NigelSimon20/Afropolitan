'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import MediaFrame from '@/components/ui/MediaFrame';
import type { MenuItem, MenuTag } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const TAG_LABELS: Record<MenuTag, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  spicy: 'Spicy',
  'gluten-free': 'Gluten free',
  'contains-nuts': 'Contains nuts',
};

const TAG_STYLES: Record<MenuTag, string> = {
  vegetarian: 'border-foliage-500/40 text-foliage-300',
  vegan: 'border-foliage-500/40 text-foliage-300',
  spicy: 'border-terracotta-500/50 text-terracotta-300',
  'gluten-free': 'border-white/15 text-charcoal-200',
  'contains-nuts': 'border-white/15 text-charcoal-200',
};

export default function MenuItemCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex overflow-hidden rounded-2xl border border-white/5 bg-charcoal-700/50 transition-colors duration-500 hover:border-gold-400/35"
    >
      <MediaFrame
        src={item.image}
        alt={item.name}
        tone={item.signature ? 'gold' : 'terracotta'}
        overlay={false}
        className="w-28 shrink-0 transition-transform duration-700 ease-silk group-hover:scale-105 sm:w-36"
      />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug text-cream sm:text-lg">
            {item.name}
          </h3>
          <span className="shrink-0 font-display text-base font-bold text-gold-400 sm:text-lg">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-charcoal-200/75 sm:text-sm">
          {item.description}
        </p>

        {(item.tags?.length || item.signature) ? (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {item.signature ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold-400/50 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-gold-400">
                <Sparkles className="h-2.5 w-2.5" aria-hidden />
                Chef&apos;s pick
              </span>
            ) : null}
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide ${TAG_STYLES[tag]}`}
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.li>
  );
}
