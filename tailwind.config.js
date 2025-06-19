/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'code': ['Fira Code', 'monospace'],
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            backgroundImage: {
                'hero': "url('/public/images/pattern-code.svg')", // <- Update this path
            },
        },
    },
    plugins: [],
};