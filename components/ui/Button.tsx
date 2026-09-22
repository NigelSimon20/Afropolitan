import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-silk disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta-500 text-cream hover:bg-terracotta-400 hover:shadow-ember active:scale-[0.98]',
  gold: 'bg-gold-400 text-charcoal-900 hover:bg-gold-300 hover:shadow-glow active:scale-[0.98]',
  secondary:
    'border border-white/20 bg-white/5 text-cream backdrop-blur-md hover:border-gold-400/60 hover:bg-white/10 active:scale-[0.98]',
  ghost: 'text-cream/80 hover:text-gold-400',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base',
};

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
    </Link>
  );
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={cn(buttonStyles(variant, size), className)} {...props} />;
}
