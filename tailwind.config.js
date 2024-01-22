const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        waves: "url('/images/waves.webp')",
        wavesSmall: "url('/images/waves-small.webp')",
        blockchains: "url('/images/blockchainsBg.png')",
        vestingLandingFaq: "url('/images/faqBackground.png')",
      },
      colors: {
        "white": "#FFFFFF",
        "white-80": "rgba(255, 255, 255, 0.8)",
        "white-60": "rgba(255, 255, 255, 0.6)",
        "white-40": "rgba(255, 255, 255, 0.4)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-5": "rgba(255, 255, 255, 0.05)",
        "black": "#222222",
        "black-80": "rgba(34, 34, 34, 0.8)",
        "black-65": "rgba(34, 34, 34, 0.65)",
        "black-60": "rgba(34, 34, 34, 0.6)",
        "black-40": "rgba(34, 34, 34, 0.4)",
        "black-20": "rgba(34, 34, 34, 0.2)",
        "black-10": "rgba(34, 34, 34, 0.1)",
        "black-5": "rgba(34, 34, 34, 0.05)",
        "light-gray": "rgba(246, 246, 250, 1)",
        "success": "#04B816",
        "success-40": "rgba(4, 184, 22, 0.4)",
        "success-20": "rgba(4, 184, 22, 0.2)",
        "success-10": "rgba(4, 184, 22, 0.1)",
        "danger": "#FF382E",
        "danger-40": "rgba(255, 56, 46, 0.4)",
        "danger-20": "rgba(255, 56, 46, 0.2)",
        "danger-10": "rgba(255, 56, 46, 0.1)",
        "purple": "#714DD7",
        "purple-20": "rgba(113, 77, 215, 0.2)",
        "purple-10": "rgba(113, 77, 215, 0.1)",
        "purple-5": "rgba(113, 77, 215, 0.05)",
        "blue-lm": "#1F4AE9",
        "blue-lm-100": "rgba(31, 74, 233, 1)",
        "blue-lm-60": "rgba(31, 74, 233, 0.6)",
        "blue-lm-10": "rgba(31, 74, 233, 0.1)",
        "blue-lm-5": "rgba(31, 74, 233, 0.05)",
        "blue-dm": "#4068FF",
        "blue-dm-60": "rgba(64, 104, 255, 0.6)",
        "blue-dm-20": "rgba(64, 104, 255, 0.2)",
        "blue-dm-10": "rgba(64, 104, 255, 0.1)",
        "blue-dm-5": "rgba(64, 104, 255, 0.05)",
        "blue-dm-secondary": "#5A7EFF",
        "blue-dm-secondary-60": "rgba(90, 126, 255, 0.6)",
        "background-lm": "#F3F7FA",
        "background-lm-blue-10": "rgba(70, 135, 196, 0.1)",
        "background-lm-blue-16": "rgba(96, 158, 216, 0.16)",
        "background-dm": "#0C0D0D",
        "background-dm-cards": "#1C2124",
        "background-dm-menu": "#23282C",
        "background-dm-blue-10": "rgba(118, 177, 233, 0.1)",
        "background-dm-blue-16": "rgba(144, 198, 248, 0.16)",
        "background-light-gray": "rgba(246, 246, 250, 1)",
        "chart-1": "#37298D",
        "chart-2": "#8398E3",
        "chart-3": "#8D57CA",
        "chart-4": "#0358D9",
        "chart-5": "#F3DCAD",
        "chart-6": "#8ACBF0",
        "warm-blue": "#4064E7",
        "sapphire": "#1E3AA0",
        'background-light-blue': '#4687C3',
        'blue-600': '#1B59E9',
        'light-blue': '#0876DD',
        'dark-blue': '#2A32EF',
        'light-black': '#444444',
        'dark-black': '#222222',
      },
      scale: {
        '-1': '-1',
      },
      fontSize: {
        'paragraph-large': [
          '1.25rem',
          {
            lineHeight: '32px',
            fontWeight: '400',
          },
        ],
        paragraph: [
          '1rem',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        'paragraph-small': [
          '0.875rem',
          {
            lineHeight: '20px',
            fontWeight: '400',
          },
        ],
        body: [
          '1rem',
          {
            lineHeight: '20px',
            fontWeight: '400',
          },
        ],
        'caption-1': [
          '0.875rem',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        'caption-2': [
          '0.75rem',
          {
            lineHeight: '14px',
            fontWeight: '400',
          },
        ],
        'caption-3': [
          '0.625rem',
          {
            lineHeight: '12px',
            fontWeight: '400',
          },
        ],
        'title-1': [
          '3rem',
          {
            lineHeight: '58px',
            letterSpacing: '-0.03em',
            fontWeight: '600',
          },
        ],
        'title-2': [
          '2rem',
          {
            lineHeight: '40px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-3': [
          '1.5rem',
          {
            lineHeight: '28px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-4': [
          '1.25rem',
          {
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-5': [
          '1.125rem',
          {
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'subtitle-6': [
          '1rem',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        button: [
          '1rem',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        'button-small': [
          '0.875rem',
          {
            lineHeight: '16px',
            fontWeight: '600',
          },
        ],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(gray|yellow|green|blue|indigo|purple|pink)-(100)/,
    },
    {
      pattern: /text-(gray|yellow|green|blue|indigo|purple|pink)-(800)/,
    },
    'bg-[#0358D9]',
    'bg-[#8ACBF0]',
    'bg-[#37298D]',
    'bg-[#8398E3]',
    'bg-[#8D57CA]',
  ],
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
