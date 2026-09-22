import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Afropolitan Restaurant Bar & Grill — design system.
 *
 * Black / Teal / White. Contemporary African luxury.
 * The teal is taken from the Afropolitan logo and is the single signature
 * accent: lines, borders, icons and primary buttons. Nothing else competes.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', sm: '2rem', lg: '3rem', xl: '4rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        /* ---- Brand core ---- */
        teal: {
          DEFAULT: '#1E5152',
          50: '#EDF3F3',
          100: '#D3E2E2',
          200: '#A6C6C6',
          300: '#71A0A1',
          400: '#3F7B7C',
          500: '#1E5152', // Afropolitan teal
          600: '#194344',
          700: '#143536',
          800: '#0F2727',
          900: '#091818',
        },

        /* ---- Neutrals ---- */
        ink: '#000000',        // primary black
        dark: '#0B0D0D',       // dark section background
        softwhite: '#F3F4F2',  // light section background
        greyline: '#A7A9AA',   // secondary grey (text + hairlines)
      },

      fontFamily: {
        // Elegant serif for headings — premium restaurant feel
        display: ['var(--font-display)', 'Cormorant Garamond', ...defaultTheme.fontFamily.serif],
        // Clean sans for body, navigation and UI
        sans: ['var(--font-sans)', 'Montserrat', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        // Serif display sizes run tight and large; letterspacing stays generous
        'display-sm': ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-md': ['4rem', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-lg': ['5.5rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },

      letterSpacing: {
        eyebrow: '0.32em',
        wordmark: '0.42em',
      },

      maxWidth: {
        prose: '58ch',
      },

      backgroundImage: {
        'teal-line': 'linear-gradient(90deg, transparent, #1E5152 15%, #1E5152 85%, transparent)',
        'hero-scrim':
          'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.88) 100%)',
        'card-scrim': 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.88) 100%)',
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },

      boxShadow: {
        teal: '0 20px 50px -24px rgba(30, 81, 82, 0.85)',
        lift: '0 30px 70px -40px rgba(0, 0, 0, 0.9)',
      },

      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.55' },
          '70%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 22s ease-out forwards',
        'line-grow': 'line-grow 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
