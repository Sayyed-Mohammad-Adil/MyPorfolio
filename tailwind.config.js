/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            'xs': '375px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontFamily: {
                'code': ['Fira Code', 'monospace'],
            },
            animation: {
                'marquee': 'marquee 80s linear infinite',
                'spin-slow': 'spin 50s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            backgroundImage: {
                'hero-light': "url('/images/pattern-light.png')",
                'hero-dark': "url('/images/pattern-dark.png')",
                'square-light': "url('data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><rect width='60' height='60' fill='none' stroke='%23000000' stroke-opacity='1' stroke-width='1'/><rect width='40' height='40' x='10' y='10' fill='none' stroke='%23000000' stroke-opacity='1' stroke-width='1'/><rect width='20' height='20' x='20' y='20' fill='none' stroke='%23000000' stroke-opacity='1' stroke-width='1'/></svg>')",
                'square-dark': "url('data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Crect%20width%3D'60'%20height%3D'60'%20fill%3D'none'%20stroke%3D'%23ffffff'%20stroke-opacity%3D'0.96'%20stroke-width%3D'1'%2F%3E%3Crect%20width%3D'40'%20height%3D'40'%20x%3D'10'%20y%3D'10'%20fill%3D'none'%20stroke%3D'%23ffffff'%20stroke-opacity%3D'0.96'%20stroke-width%3D'1'%2F%3E%3Crect%20width%3D'20'%20height%3D'20'%20x%3D'20'%20y%3D'20'%20fill%3D'none'%20stroke%3D'%23ffffff'%20stroke-opacity%3D'0.96'%20stroke-width%3D'1'%2F%3E%3C%2Fsvg%3E')",
            },

        },
    },
     plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.led-light': { 'text-shadow': '0 0 6px rgba(59, 130, 246, 0.8)' },
        '.led-dark': { 'text-shadow': '0 0 6px rgba(234, 179, 8, 0.8)' },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};