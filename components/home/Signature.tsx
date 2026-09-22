import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { SIGNATURE_ITEMS } from '@/lib/data/menu';

export default function Signature() {
  return (
    <section className="section bg-ink">
      <div className="container">
        <SectionHeading eyebrow="Chef's Selection" title="Signature Favourites" align="center" />

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {SIGNATURE_ITEMS.map((item, i) => (
            <Reveal key={item.id} as="article" delay={i * 0.12} className="group">
              <Media
                src={item.image ?? '/media/signature-1.jpg'}
                alt={item.name}
                className="aspect-[4/5] w-full"
                sizes="(min-width: 768px) 30vw, 100vw"
                zoom
              />

              {/* Teal rule grows in under the card on hover */}
              <span
                aria-hidden
                className="mt-7 block h-px w-full origin-left scale-x-0 bg-teal-400 transition-transform duration-700 ease-silk group-hover:scale-x-100"
              />

              <div className="flex items-baseline justify-between gap-4 pt-6">
                <h3 className="font-display text-2xl font-light uppercase tracking-[0.06em] text-white">
                  {item.name}
                </h3>
                <span className="font-sans text-sm font-medium tracking-[0.1em] text-teal-300">
                  {item.price}
                </span>
              </div>
              <p className="mt-3 text-sm font-light italic leading-relaxed text-greyline/60">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
