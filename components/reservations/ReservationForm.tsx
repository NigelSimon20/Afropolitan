'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

interface ReservationDraft {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
}

const EMPTY: ReservationDraft = {
  name: '',
  phone: '',
  date: '',
  time: '19:00',
  guests: '2',
  occasion: 'Dinner',
  notes: '',
};

const OCCASIONS = ['Dinner', 'Family braai', 'Birthday', 'Live music night', 'Corporate'];

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-charcoal-400 transition-colors focus:border-gold-400/60 [color-scheme:dark]';
const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-wide text-charcoal-300';

export default function ReservationForm() {
  const [draft, setDraft] = useState<ReservationDraft>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof ReservationDraft>(key: K, value: ReservationDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  // No backend yet — the draft is handed off to WhatsApp so bookings still land.
  const whatsappHandoff = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
    [
      `Hi ${SITE.name}, I'd like to book a table.`,
      `Name: ${draft.name || '—'}`,
      `Phone: ${draft.phone || '—'}`,
      `Date: ${draft.date || '—'} at ${draft.time}`,
      `Guests: ${draft.guests}`,
      `Occasion: ${draft.occasion}`,
      draft.notes ? `Notes: ${draft.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Wire this up to your booking provider or a route handler.
    setSubmitted(true);
  }

  return (
    <div className="surface p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="py-6 text-center"
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-foliage-400" aria-hidden />
            <h3 className="mt-4 font-display text-2xl font-bold">Request received</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-charcoal-200/80">
              Thanks {draft.name || 'there'} — we&apos;ll confirm your table for {draft.guests}{' '}
              {Number(draft.guests) === 1 ? 'guest' : 'guests'} shortly. For an instant confirmation,
              send it straight through on WhatsApp.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHandoff}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foliage-500 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-foliage-400"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Send on WhatsApp
              </a>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setDraft(EMPTY);
                  setSubmitted(false);
                }}
              >
                Make another booking
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                required
                value={draft.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="Tendai Moyo"
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={draft.phone}
                onChange={(event) => update('phone', event.target.value)}
                placeholder={SITE.phoneDisplay}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="guests">
                Guests
              </label>
              <select
                id="guests"
                value={draft.guests}
                onChange={(event) => update('guests', event.target.value)}
                className={fieldClass}
              >
                {['1', '2', '3', '4', '5', '6', '8', '10', '12+'].map((count) => (
                  <option key={count} value={count} className="bg-charcoal-800">
                    {count}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                value={draft.date}
                onChange={(event) => update('date', event.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="time">
                Time
              </label>
              <input
                id="time"
                type="time"
                required
                value={draft.time}
                onChange={(event) => update('time', event.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <span className={labelClass}>Occasion</span>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occasion) => (
                  <button
                    key={occasion}
                    type="button"
                    onClick={() => update('occasion', occasion)}
                    aria-pressed={draft.occasion === occasion}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      draft.occasion === occasion
                        ? 'border-gold-400 bg-gold-400 text-charcoal-900'
                        : 'border-white/10 text-charcoal-200 hover:border-gold-400/50 hover:text-cream'
                    }`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="notes">
                Anything we should know?
              </label>
              <textarea
                id="notes"
                rows={3}
                value={draft.notes}
                onChange={(event) => update('notes', event.target.value)}
                placeholder="Allergies, high chairs, a booth near the stage…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Request this table
              </Button>
              <p className="mt-3 text-center text-xs text-charcoal-400">
                Requests are confirmed by phone or WhatsApp within the hour during opening times.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
