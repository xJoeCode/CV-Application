/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            darkBlue: "#055379",
            beige: '#B4B6A2',
            black:'#012030',
            darkYellow:'#8E8A00',
            brightYellow:'#FCF600',
            brightPink: '#BE0085'
        },
        fontFamily:{
          'serif':['Source Serif Pro', 'serif']
        },
        extend: {},
    },
    plugins: [],
};
