import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center bg-ink px-6 pt-24">
      <div className="text-center">
        <span className="eyebrow justify-center">
          <span className="h-px w-8 bg-teal-400/70" aria-hidden />
          Error 404
        </span>
        <h1 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl">
          Page Not Found
        </h1>
        <span className="rule mx-auto mt-8" />
        <p className="mx-auto mt-8 max-w-sm text-sm font-light leading-[1.9] text-greyline">
          The page you were looking for has moved or no longer exists.
        </p>
        <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to Home</ButtonLink>
          <ButtonLink href="/menu" variant="outline" size="lg">View the Menu</ButtonLink>
        </div>
      </div>
    </section>
  );
}
