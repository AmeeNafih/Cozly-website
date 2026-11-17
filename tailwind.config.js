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
          primary: '#18222D',      // Midnight Indigo Slate
          'primary-dark': '#0F161E',
          'primary-light': '#243242',
          secondary: '#E9ECF0',    // Soft Stone Linen
          'secondary-light': '#F4F6F8',
          accent: '#D9822B',       // Warm Kerala Ochre
          'accent-hover': '#C07122',
          'accent-light': '#FDF3E7',
          surface: '#FAF8F5',      // Warm Off-White
          card: '#FFFFFF',
          charcoal: '#222222',
          muted: '#6B7280',
          border: '#E8E4DD',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        cozly: '12px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(24, 34, 45, 0.05)',
        elevated: '0 12px 36px -4px rgba(24, 34, 45, 0.09)',
        modal: '0 24px 60px -8px rgba(24, 34, 45, 0.16)',
      },
    },
  },
  plugins: [],
};
