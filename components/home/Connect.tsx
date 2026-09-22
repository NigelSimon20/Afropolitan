import { Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import PendingValue from '@/components/ui/PendingValue';
import { SOCIAL_ICONS } from '@/components/ui/SocialIcons';
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton';
import { CONTACT, SOCIALS } from '@/lib/site';
import type { ContactDetail } from '@/lib/types';

const ROWS: { key: string; label: string; icon: React.ReactNode; detail: ContactDetail }[] = [
  {
    key: 'phone',
    label: 'Phone',
    icon: <Phone className="h-4 w-4" strokeWidth={1.4} aria-hidden />,
    detail: CONTACT.phone,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: <WhatsAppIcon className="h-4 w-4" />,
    detail: CONTACT.whatsapp,
  },
  {
    key: 'email',
    label: 'Email',
    icon: <Mail className="h-4 w-4" strokeWidth={1.4} aria-hidden />,
    detail: CONTACT.email,
  },
  {
    key: 'location',
    label: 'Location',
    icon: <MapPin className="h-4 w-4" strokeWidth={1.4} aria-hidden />,
    detail: CONTACT.address,
  },
];

export default function Connect() {
  return (
    <section id="contact" className="section bg-teal-700">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={0.05}>
            <span className="eyebrow justify-center !text-teal-200">
              <span className="h-px w-8 bg-teal-200/50" aria-hidden />
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.03em] text-white sm:text-5xl">
              Let&apos;s Connect
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="rule mx-auto mt-8 bg-teal-200" />
          </Reveal>
        </div>

        <dl className="mx-auto mt-16 grid max-w-5xl gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.key} delay={i * 0.08} className="bg-teal-700 p-8 text-center">
              <dt className="flex flex-col items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-teal-100">
                  {row.icon}
                </span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-teal-200">
                  {row.label}
                </span>
              </dt>
              <dd className="mt-4 text-sm font-light leading-relaxed text-white/85">
                <PendingValue detail={row.detail} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-6">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-teal-200">
              Follow Us
            </span>
            <ul className="flex items-center gap-4">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                const shared =
                  'grid h-12 w-12 place-items-center border border-white/20 transition-all duration-500 ease-silk';
                return (
                  <li key={social.label}>
                    {social.pending || !social.href ? (
                      <span
                        className={`${shared} cursor-default text-white/35`}
                        title={`${social.label} — official account to be confirmed`}
                        aria-label={`${social.label} — account to be confirmed`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    ) : (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`${shared} text-white hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-teal-800`}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="text-xs font-light italic text-teal-200/60">
              Official accounts to be confirmed by Afropolitan.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
