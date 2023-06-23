/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            darkBlue: "#607B71",
            ultraDarkBlue: '#012030',
            beige: '#B4B6A2',
            black:'#012030',
            darkYellow:'#8E8A00',
            brightYellow:'#FCF600',
            brightPink: '#B48A8D',
            green:'#7A9975',
            white:'#ebebeb',
            brightBlue:'#3587A4',
        },
        fontFamily:{
          'serif':['Source Serif Pro', 'serif']
        },
        extend: {},
    },
    plugins: [],
};
