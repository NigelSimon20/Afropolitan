import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Afropolitan Restaurant, Bar & Grill — design system.
 *
 * Palette story: a deep charcoal room, lit by warm terracotta (the braai fire),
 * rich gold (the bar) and vibrant foliage green (the garden / day-time vibe).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        /* ---------------- Surfaces ---------------- */
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#C9C6C2',
          300: '#9A9691',
          400: '#6B6763',
          500: '#4A4643',
          600: '#333130',
          700: '#262524',
          800: '#1A1A1A', // page background
          900: '#131313', // elevated-dark / footer
          950: '#0B0B0B', // deepest (hero scrim, overlays)
        },

        /* ---------------- Accents ---------------- */
        terracotta: {
          DEFAULT: '#C4622F',
          50: '#FCF3EE',
          100: '#F7E1D4',
          200: '#EDBFA6',
          300: '#E19C78',
          400: '#D57C4F',
          500: '#C4622F', // primary accent
          600: '#A34F26',
          700: '#7D3B1D',
          800: '#562814',
          900: '#30160B',
        },
        gold: {
          DEFAULT: '#D6A64A',
          50: '#FDF8EC',
          100: '#F9EDCF',
          200: '#F0D89D',
          300: '#E6C36F',
          400: '#D6A64A', // primary gold
          500: '#C08F33',
          600: '#9C7228',
          700: '#75551E',
          800: '#4E3914',
          900: '#2A1E0B',
        },
        foliage: {
          DEFAULT: '#4C9A5A',
          50: '#EFF8F1',
          100: '#D7EEDC',
          200: '#AEDCB8',
          300: '#82C793',
          400: '#5CB070',
          500: '#4C9A5A', // vibrant foliage green
          600: '#3C7C48',
          700: '#2E5F38',
          800: '#204126',
          900: '#132616',
        },

        /* ------------- Semantic aliases ------------- */
        cream: '#F7F3EC',
        ember: '#E1683A',
      },

      fontFamily: {
        // Bold, modern display face for headings
        display: ['var(--font-display)', 'Outfit', ...defaultTheme.fontFamily.sans],
        // Clean, highly legible face for body copy
        sans: ['var(--font-sans)', 'Inter', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-lg': ['4.75rem', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-xl': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '800' }],
      },

      letterSpacing: {
        eyebrow: '0.28em',
      },

      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")",
        'ember-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(196,98,47,0.35) 0%, rgba(26,26,26,0) 70%)',
        'gold-sheen': 'linear-gradient(110deg, #D6A64A 0%, #F0D89D 45%, #C08F33 100%)',
        'night-fade': 'linear-gradient(180deg, rgba(11,11,11,0.15) 0%, rgba(11,11,11,0.55) 45%, #1A1A1A 100%)',
      },

      boxShadow: {
        ember: '0 24px 60px -24px rgba(196, 98, 47, 0.55)',
        glow: '0 0 0 1px rgba(214,166,74,0.2), 0 30px 70px -30px rgba(214,166,74,0.45)',
        plate: '0 30px 60px -30px rgba(0,0,0,0.85)',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 38s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
