/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      print: { raw: 'print' },
      xs: '320px',
      sp: '375px',
      '2sp': '414px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      '2lg': '1150px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1750px',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      colors: {
        default: '#292D32',
        primary: '#FD7770',
        secondary: '#B9CBDC',
        gray: {
          primary: '#596370',
        },
      },
      borderRadius: {
        primary: '10px',
      },
      boxShadow: {
        sdprimary: '10px 10px 20px rgba(211, 211, 211, 0.25)',
      },
      animation: {
        fade: 'fade 0.5s ease-in-out',
        flip: 'flip 1.2s ease-in-out infinite',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#FD7770',
          secondary: '#B9CBDC',
          accent: '#37CDBE',
          neutral: '#3D4451',
          info: '#3ABFF8',
          success: '#aee9d1',
          warning: '#FBBD23',
          error: '#FF3636',
          borderBase: '#e0e0e0',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
