import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        main: '#1E85CF',
        'main-100': '#ebf2f8',
      },
      screens: {
        '3xl': '2000px',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        waveBack: {
          '0%, 100%': {
            transform: 'translateY(2px) scaleY(1)',
            opacity: '0.75',
          },
          '50%': {
            transform: 'translateY(0) scaleY(1.05)',
            opacity: '0.95',
          },
        },
        waveFront: {
          '0%, 100%': {
            transform: 'translateY(2px) scaleY(0.95)',
            opacity: '0.9',
          },
          '50%': {
            transform: 'translateY(0) scaleY(1.08)',
            opacity: '1',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        'wave-back': 'waveBack 2.5s ease-in-out infinite',
        'wave-front': 'waveFront 2.0s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
