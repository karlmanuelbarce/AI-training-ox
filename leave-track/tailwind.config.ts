import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(230, 100%, 97%)',
          100: 'hsl(230, 100%, 94%)',
          200: 'hsl(230, 100%, 87%)',
          300: 'hsl(230, 100%, 77%)',
          400: 'hsl(230, 100%, 65%)',
          500: 'hsl(230, 100%, 55%)',
          600: 'hsl(230, 100%, 45%)',
          700: 'hsl(230, 100%, 38%)',
          800: 'hsl(230, 100%, 30%)',
          900: 'hsl(230, 100%, 22%)',
        },
        success: {
          50: 'hsl(142, 100%, 97%)',
          100: 'hsl(142, 100%, 94%)',
          500: 'hsl(142, 71%, 45%)',
          600: 'hsl(142, 71%, 35%)',
        },
        warning: {
          50: 'hsl(38, 100%, 97%)',
          100: 'hsl(38, 100%, 94%)',
          500: 'hsl(38, 92%, 50%)',
        },
        error: {
          50: 'hsl(0, 100%, 97%)',
          100: 'hsl(0, 100%, 94%)',
          500: 'hsl(0, 84%, 60%)',
          600: 'hsl(0, 84%, 50%)',
        },
        neutral: {
          50: 'hsl(210, 40%, 98%)',
          100: 'hsl(210, 40%, 96%)',
          200: 'hsl(214, 32%, 91%)',
          300: 'hsl(213, 27%, 84%)',
          400: 'hsl(215, 20%, 65%)',
          500: 'hsl(215, 16%, 47%)',
          600: 'hsl(215, 19%, 35%)',
          700: 'hsl(215, 25%, 27%)',
          800: 'hsl(217, 33%, 17%)',
          900: 'hsl(222, 47%, 11%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
