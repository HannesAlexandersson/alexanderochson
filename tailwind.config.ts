/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import animate from 'tailwindcss-animate'

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        quoteBg:
          'linear-gradient(180deg, #6B62CC 0%, #9B53CC 50%, #CB43CB 100%)',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        showText: 'showText 0.5s 1s linear forwards',
        animate: 'animate 1s cubic-bezier(1,0,0.5,1) forwards',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        showText: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        animate: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        bebas: ['var(--font-bebas)'],
        inria: ['var(--font-inria-sherif)'],
      },
      width: {
        'line-width': `${(2 * 3 + 4 * 2) * 1.4142135623731}px`,
      },
      boxShadow: {
        bottom: '0 4px 4px -4px rgba(0, 0, 0, 0.1)',
        card: '0px 35px 120px -15px #211e35',
      },
      colors: {
        'linkedIn-blue': '#0A66C2',
        primaryBg: '#E8EBF4',
        secondaryBg: '#FEFEFE',
        primaryText: '#313E4E',
        secondaryText: '#84898C',
        primaryAccent: '#5799D5',
        secondaryAccent: '#3F85C2',
        quoteBg:
          'linear-gradient(180deg, #6B62CC 0%, #9B53CC 50%, #CB43CB 100%)',
        radialPink: '#6B62CC',
        radialBlue: '#9B53CC',
        radialPurple: '#CB43CB',
        tertiary: '#151030',
        'default-bg': '#161415',
        primaryModelAccent: '#f3e1c7',
      },
    },
  },
  plugins: [forms, animate],
  /* plugins: [], */
}

export default config
