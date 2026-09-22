import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 pt-24">
      <div className="text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
          This table isn&apos;t <span className="text-gradient-gold">on the floor plan</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-charcoal-200/80">
          The page you were looking for has moved or never existed. The grill, however, is still on.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/menu" variant="secondary" size="lg">
            View the menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
