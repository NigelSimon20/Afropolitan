/** Tiny class-name joiner — keeps the bundle free of a clsx dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** "12.5" -> "$12.50" (prices are stored as numbers so they stay sortable). */
export function formatPrice(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

/** ISO date -> "Fri, 26 Sep" */
export function formatEventDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
