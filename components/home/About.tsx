import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export default function About() {
  return (
    <section id="about" className="section bg-softwhite text-ink">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right" className="group order-1 lg:order-none">
          <Media
            src="/media/about.jpg"
            alt="A plated dish at the table"
            className="aspect-[4/5] w-full"
            sizes="(min-width: 1024px) 45vw, 100vw"
            zoom
          />
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <span className="eyebrow !text-teal-600">
              <span className="h-px w-8 bg-teal-600/60" aria-hidden />
              Welcome To
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.03em] text-ink sm:text-5xl lg:text-6xl">
              Afropolitan
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-3 font-display text-xl font-light italic text-teal-600 sm:text-2xl">
              {SITE.suffix}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <span className="rule mt-8" />
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-prose text-[0.95rem] font-light leading-[2] text-ink/65 sm:text-base">
              Afropolitan Restaurant Bar &amp; Grill brings together great food, drinks and a
              vibrant dining atmosphere in a space designed for good conversations, memorable
              moments and enjoyable experiences.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <ButtonLink href="/#experience" variant="light" size="lg" className="mt-11">
              Discover Afropolitan
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
