import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { SITE } from '@/lib/site';
import './globals.css';

/* Elegant serif for headings */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

/* Clean sans for body, navigation and UI */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | ${SITE.area}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Afropolitan',
    'restaurant Harare',
    'bar and grill Harare',
    'Madokero restaurant',
    'dining Zimbabwe',
    'reserve a table Harare',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: SITE.url,
    siteName: SITE.fullName,
    title: SITE.fullName,
    description: SITE.description,
    images: [{ url: SITE.heroImage, width: 1920, height: 1080, alt: SITE.fullName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.fullName,
    description: SITE.description,
    images: [SITE.heroImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      {/* pb on mobile clears the fixed WhatsApp bar */}
      <body className="min-h-screen bg-ink pb-[3.9rem] sm:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:bg-teal-500 focus:px-6 focus:py-3 focus:text-[0.7rem] focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-white"
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
