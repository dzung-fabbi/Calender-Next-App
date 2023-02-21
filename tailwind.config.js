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
        'primary-swarthy': '#FC3227',
        secondary: '#B9CBDC',
        gray: {
          primary: '#596370',
          secondary: '#808182',
          'label-input': '#A6B1BE',
          bgBtn: '#F6F3F3',
        },
        blue: {
          tag: '#13A2FA',
        },
        green: {
          btn: '#96C397',
          bgPrimary: '#D9E8DA',
        },
        orange: {
          primary: '#F98E51',
        },
      },
      backgroundImage: {
        datePreview:
          'linear-gradient(180deg, #FFFFFF 0%, #FFE9E8 99.99%, rgba(250, 251, 250, 0) 100%)',
      },
      spacing: {
        '30px': '30px',
        '25px': '25px',
        2.5: '0.625rem',
      },
      borderRadius: {
        primary: '10px',
        '30px': '30px',
        btn: '14px',
      },
      boxShadow: {
        sdprimary: '10px 10px 20px rgba(211, 211, 211, 0.25)',
      },
      animation: {
        fade: 'fade 0.5s ease-in-out',
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
}
