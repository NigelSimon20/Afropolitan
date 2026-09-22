import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'light';
export type ButtonSize = 'md' | 'lg';

/* Square corners, wide tracking, no gradients — the brief asks for restraint. */
const base =
  'group/btn inline-flex items-center justify-center gap-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ease-silk disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-500 text-white hover:bg-teal-400 hover:shadow-teal',
  outline:
    'border border-white/25 text-white hover:border-teal-300 hover:bg-teal-500/10 hover:text-teal-100',
  light: 'border border-ink/20 text-ink hover:border-teal-500 hover:bg-teal-500 hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-7 py-3.5',
  lg: 'px-9 py-4',
};

/** The arrow slides in on hover, per the brief's button behaviour. */
export function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-500 ease-silk group-hover/btn:w-3 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
    >
      →
    </span>
  );
}

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  return cn(base, variants[variant], sizes[size]);
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonStyles(variant, size), className)} {...props}>
      {children}
      <Arrow />
    </Link>
  );
}

interface ButtonAnchorProps extends ComponentProps<'a'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <a className={cn(buttonStyles(variant, size), className)} {...props}>
      {children}
      <Arrow />
    </a>
  );
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonStyles(variant, size), className)} {...props}>
      {children}
      <Arrow />
    </button>
  );
}
