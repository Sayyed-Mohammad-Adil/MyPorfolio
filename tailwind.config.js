/** @type {import('tailwindcss').Config} */
export default {
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
                'hero': "url('/images/pattern-code.svg')", // Remove 'public' from path
            },
        },
    },
    plugins: [],
};