import type { MenuItem } from '@/lib/types';

/** Classic menu typesetting: name and price on one line, joined by a leader. */
export default function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <ul className="divide-y divide-white/10">
      {items.map((item) => (
        <li key={item.id} className="group/item py-5 first:pt-0">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-xl font-light uppercase tracking-[0.05em] text-white transition-colors duration-300 group-hover/item:text-teal-200">
              {item.name}
            </h3>
            <span
              className="h-px flex-1 translate-y-[-2px] bg-white/15 transition-colors duration-300 group-hover/item:bg-teal-400/40"
              aria-hidden
            />
            <span className="font-sans text-sm font-medium tracking-[0.1em] text-teal-300">
              {item.price}
            </span>
          </div>
          <p className="mt-2 text-sm font-light italic leading-relaxed text-greyline/60">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
