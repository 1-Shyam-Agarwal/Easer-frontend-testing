/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        customGray: '#232222',
        lightOrange : '#FFD6BF',
        statisticsGrey : '#F4EFEF',
        grayTransparent: 'rgba(247, 247, 247, 0.8)'
      },
      animation: {
        'upDown': 'upDown 3s ease-in-out infinite',
        'border-change': 'changeBorderColor 3s forwards',
        'slowspin': 'spin 3s linear infinite', // Slow 3-second spin
        'scaleUpDown': 'scaleUpDown 1.5s ease-in-out infinite',
        'bg-pulse': 'bg-pulse 1.5s ease-in-out infinite',
      },

      animationDelay: {
        '250': '250ms',  // 0.25 second delay
        '750': '750ms',  // 0.75 second delay
        '3000': '3000ms', // 1.5 second delay
        '6000': '6000ms', // 3 second delay
      },

      spacing: {
        '4': '1rem', // Default value for `my-4` (16px)
        '5': '1.25rem', // Custom for `my-5` (20px)
        '6': '1.5rem',  // Custom for `my-6` (24px)
        '9' : '2rem',
        '18': '4.5rem', // Custom example
        '30' : '10rem'
      },
      keyframes: {

        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },

        "scaleUpDown": {
          '0%, 100%': { transform: 'scale(1)' }, // Normal size
          '50%': { transform: 'scale(1.2)' },   // Scaled up
        },

        changeBorderColor: {
          '0%': { borderColor: 'white' },
          '100%': { borderColor: '#2ecc71' },
        },

        'bg-pulse': {
          '0%, 100%': { backgroundColor: 'rgba(239, 246, 255, 0.29)' }, // bg-gray-25
          '50%':     { backgroundColor: 'rgba(229, 240, 254, 0.65)' }, // bg-gray-50
        },
      },
      screens: {
        'max-1100': {'max': '1100px'},
        'max-1040': {'max': '1040px'},
        'max-870': {'max': '870px'},
        'max-825': {'max': '825px'},
        'max-768': {'max': '768px'},
        'max-720': {'max': '720px'},
        'max-640': {'max': '640px'},
        'max-580': {'max': '580px'},
        'max-540': {'max': '540px'},
        'max-500': {'max': '500px'},
        'max-480': {'max': '480px'},
        'max-450': {'max': '450px'},
        'max-420': {'max': '420px'},
        'max-390': {'max': '390px'},
        'max-380': {'max': '380px'},
        'max-360': {'max': '360px'},
        'max-340': {'max': '340px'},
        'range-768-915': { raw: '(min-width: 768px) and (max-width: 915px)' },
        'range-450-768': { raw: '(min-width: 450px) and (max-width: 768px)' },
        'range-450-767': { raw: '(min-width: 450px) and (max-width: 767px)' },
        'range-768-940': { raw: '(min-width: 768px) and (max-width: 940px)' },
        'range-480-640': { raw: '(min-width: 480px) and (max-width: 640px)' },
      },

      aspectRatio: {
        // Custom aspect ratios
        '3/2': '3 / 2',
        '7/5': '7 / 5',
        '16/10': '16 / 10',
      },
      minWidth: {
        '250': '14.5rem', // 40 * 0.25rem = 10rem (Tailwind's scale is based on 4px)
      },
      maxWidth: {
        '600': '60rem',
        '300': '30rem', 
        '250': '26rem', 
        '200' : '20rem',// 40 * 0.25rem = 10rem (Tailwind's scale is based on 4px)
        '100' : '10rem'
      },
      width :
      {
        '400' : '40rem',
        '7/8': '87.25%',
        '6/13':'46.15%',
        '3/4':'65%'
      }
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
};
