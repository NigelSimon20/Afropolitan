'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton';
import { SITE, WHATSAPP_PENDING, whatsappUrl } from '@/lib/site';

interface Draft {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  request: string;
}

const EMPTY: Draft = { name: '', phone: '', email: '', date: '', time: '19:00', guests: '2', request: '' };

const field =
  'w-full border-b border-ink/20 bg-transparent py-3 font-sans text-sm font-light text-ink transition-colors placeholder:text-ink/35 focus:border-teal-500 focus:outline-none [color-scheme:light]';
const label =
  'block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink/50';

export default function Reservations() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const message = [
    `Hello ${SITE.fullName},`,
    `I'd like to request a reservation.`,
    ``,
    `Name: ${draft.name || '—'}`,
    `Phone: ${draft.phone || '—'}`,
    `Email: ${draft.email || '—'}`,
    `Date: ${draft.date || '—'}`,
    `Time: ${draft.time || '—'}`,
    `Guests: ${draft.guests}`,
    draft.request ? `Special request: ${draft.request}` : '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  /**
   * WhatsApp-powered rather than a full booking system, as the brief asks for
   * the first version. The request is composed here and handed to WhatsApp —
   * opened straight away once the official number is set, since the submit is
   * a user gesture and will not be blocked.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    if (!WHATSAPP_PENDING) window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="reserve" className="section bg-softwhite text-ink">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <span className="eyebrow !text-teal-600">
              <span className="h-px w-8 bg-teal-600/60" aria-hidden />
              Reservations
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-4xl font-light uppercase leading-[1.05] tracking-[0.03em] sm:text-5xl">
              Reserve Your Table
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="rule mt-8" />
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-8 max-w-prose text-[0.95rem] font-light leading-[2] text-ink/60">
              Planning a meal, celebration or evening out? Reserve your table with us.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-6 text-xs font-light italic leading-relaxed text-ink/45">
              Requests are sent through WhatsApp so Afropolitan can confirm directly — no booking
              system to maintain.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16} direction="left" className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border border-ink/10 p-10 text-center sm:p-14"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500 text-white">
                  <Check className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-8 font-display text-2xl font-light uppercase tracking-[0.06em]">
                  Thank You
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-[1.9] text-ink/60">
                  Your reservation request has been received. Afropolitan will confirm your booking
                  shortly.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl(message)}
                    {...(WHATSAPP_PENDING
                      ? { title: 'WhatsApp number to be confirmed by Afropolitan' }
                      : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="inline-flex items-center gap-3 bg-teal-500 px-8 py-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-teal-400"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Send on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(EMPTY);
                      setSent(false);
                    }}
                    className="border border-ink/20 px-8 py-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-teal-500 hover:text-teal-600"
                  >
                    New Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
              >
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="r-name">Name</label>
                  <input id="r-name" required value={draft.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Your full name" className={field} />
                </div>

                <div>
                  <label className={label} htmlFor="r-phone">Phone Number</label>
                  <input id="r-phone" type="tel" required value={draft.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+263 …" className={field} />
                </div>

                <div>
                  <label className={label} htmlFor="r-email">Email</label>
                  <input id="r-email" type="email" value={draft.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@example.com" className={field} />
                </div>

                <div>
                  <label className={label} htmlFor="r-date">Date</label>
                  <input id="r-date" type="date" required value={draft.date}
                    onChange={(e) => set('date', e.target.value)} className={field} />
                </div>

                <div>
                  <label className={label} htmlFor="r-time">Time</label>
                  <input id="r-time" type="time" required value={draft.time}
                    onChange={(e) => set('time', e.target.value)} className={field} />
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="r-guests">Number of Guests</label>
                  <select id="r-guests" value={draft.guests}
                    onChange={(e) => set('guests', e.target.value)} className={field}>
                    {['1', '2', '3', '4', '5', '6', '8', '10', '12+'].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="r-request">Special Request</label>
                  <textarea id="r-request" rows={3} value={draft.request}
                    onChange={(e) => set('request', e.target.value)}
                    placeholder="Anything we should know?" className={`${field} resize-none`} />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group/btn inline-flex w-full items-center justify-center gap-3 bg-teal-500 px-9 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-silk hover:bg-teal-400 hover:shadow-teal sm:w-auto"
                  >
                    Request a Reservation
                    <span aria-hidden className="inline-block w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-500 ease-silk group-hover/btn:w-3 group-hover/btn:translate-x-0 group-hover/btn:opacity-100">→</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
