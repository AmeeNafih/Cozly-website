/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          charcoal: {
            DEFAULT: '#1A1A1A',
            900: '#1A1A1A',
            800: '#333333',
            700: '#4D4D4D',
            500: '#666666',
            400: '#888888',
          },
          white: '#FFFFFF',
          grey: {
            light: '#F5F5F5',
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
          },
          border: '#E5E5E5',
          borderDark: '#2A2A2A',
          kraft: {
            DEFAULT: '#B8956A',
            hover: '#A38055',
            light: '#F9F6F0',
          },
          whatsapp: {
            DEFAULT: '#25D366',
            hover: '#20BA5A',
          },
          // Semantic alias tokens
          primary: '#000000',
          'primary-dark': '#000000',
          'primary-light': '#1A1A1A',
          secondary: '#F5F5F5',
          'secondary-light': '#FAFAFA',
          accent: '#B8956A',
          'accent-hover': '#A38055',
          'accent-light': '#F9F6F0',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          muted: '#666666',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', '-apple-system', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', '-apple-system', 'sans-serif'],
        serif: ['var(--font-poppins)', 'Poppins', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        cozly: '4px',
        'cozly-sm': '2px',
        'cozly-md': '6px',
        'cozly-lg': '8px',
      },
      boxShadow: {
        soft: '0 1px 4px rgba(0, 0, 0, 0.04)',
        elevated: '0 4px 16px -2px rgba(0, 0, 0, 0.06)',
        modal: '0 20px 48px -8px rgba(0, 0, 0, 0.12)',
      },
      letterSpacing: {
        widestSection: '0.2em',
      },
    },
  },
  plugins: [],
};
