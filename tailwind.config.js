/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#081224',
          900: '#0c1b33',
          850: '#112340',
          800: '#162b4e',
          700: '#203c6b',
          600: '#2e5391',
        },
        skybg: {
          50: '#f5f8fd',
          100: '#ebf2fc',
          200: '#d7e6f8',
          300: '#bed7f4',
          400: '#9ec2ee',
        },
        coral: {
          DEFAULT: '#ff6f59',
          hover: '#ff553a',
          light: '#ffa090',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.16)',
        'glow-coral': '0 0 25px rgba(255, 111, 89, 0.45)',
        'glow-blue': '0 0 25px rgba(59, 130, 246, 0.45)',
        'card-soft': '0 10px 30px -5px rgba(12, 27, 51, 0.08), 0 4px 6px -2px rgba(12, 27, 51, 0.03)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
}