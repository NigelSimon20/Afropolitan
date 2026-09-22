/** Tiny class-name joiner — keeps the bundle free of a clsx dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
