import type { ContactDetail } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Renders a contact detail as a live link once Afropolitan confirms it, and as
 * a clearly-marked placeholder until then. Nothing here ever invents a number,
 * address or handle.
 */
export default function PendingValue({
  detail,
  className,
}: {
  detail: ContactDetail;
  className?: string;
}) {
  if (detail.pending || !detail.href) {
    return (
      <span
        className={cn(
          'inline-block border-b border-dashed border-greyline/40 pb-0.5 text-greyline/70 italic',
          className,
        )}
        title="To be confirmed by Afropolitan before launch"
      >
        {detail.label}
      </span>
    );
  }

  const external = detail.href.startsWith('http');

  return (
    <a
      href={detail.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn('link-underline transition-colors hover:text-teal-300', className)}
    >
      {detail.label}
    </a>
  );
}
