/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/i18n/**/*.js',
  ],

  theme: {
    container: {
      center: true,
      screens: {
        xl: '1280px',
      },
      padding: '15px',
    },

    extend: {
      screens: {    
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2250px',
        '6xl': '2560px',
      },

      colors: {
        primary: '#293B93',
        secondary: '#b68756',
        accent: '#293B93',
        dark: '#000032',
        light: '#F8FAFC',
        border: '#E5E7EB',
        muted: '#6B7280',
      },

      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
        arabic: [
          'var(--font-arabic)',
          'var(--font-primary)',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #000032 0%, #2d2f81 50%, #000032 100%)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },

  plugins: [],
};