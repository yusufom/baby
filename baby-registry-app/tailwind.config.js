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
                'baby-purple': '#9D4EDD',
                'baby-pink': '#FF8FAB',
                'baby-blue': '#90E0EF',
                'baby-mint': '#B5E48C',
                'baby-yellow': '#FFEA00',
                'baby-peach': '#FFB5A7',
                'baby-lavender': '#C8B6FF',
                'baby-dark': '#6A4C93',
                'baby-light': '#F8EDEB',
                'baby-primary': '#9D4EDD',
                'baby-secondary': '#B5E48C',
                'baby-accent': '#FFB5A7',
            },
            backgroundImage: {
                'baby-gradient': 'linear-gradient(to right, #F8EDEB, #C8B6FF, #B5E48C, #FFB5A7)',
            },
        },
    },
    plugins: [],
} 
