import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { SITE } from '@/lib/site';
import './globals.css';

/* Bold, geometric display face for headings */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

/* Clean, neutral face for body copy */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | ${SITE.city}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Harare restaurant',
    'braai Harare',
    'Afrobeat nightlife',
    'live music Harare',
    'gelato Harare',
    'bar and grill Zimbabwe',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: SITE.url,
    siteName: SITE.fullName,
    title: SITE.fullName,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.fullName,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-charcoal-800 selection:bg-terracotta-500">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-charcoal-900"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
