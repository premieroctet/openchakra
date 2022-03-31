import {createGlobalStyle} from 'styled-components'
import {screen} from './screenWidths'

// const blueFeurst = '#141953'
const blueFeurst = 'hsl(210.6, 50.9%, 41.6%)'

export const theme = {
  accentColor: blueFeurst /* Default color for inputs */,
  colors: {
    blue: blueFeurst, // Feurst blue
    white: '#FFF', // pure white
    redAlert: 'red',
    yellow: '#e0ba14',
  },
  containerSize: 'min(100% - 2rem, 60rem)',
  //   space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
  fontFamily: 'Roboto',
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    normal: 1,
    title: 1.25,
    paragraph: 1.5,
  },
  radii: ['0px', '2px', '4px', '8px', '16px', '48px'],
  rounded: {
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
}

export const GlobalStyleEdi = createGlobalStyle`
  
  :root {
    accent-color: ${props => props.theme.accentColor || 'auto'};
    caret-color: ${props => props.theme.accentColor || 'auto'};
    --brand-color: #182d45;
    --bg-blue-700: #2b3760;
    --bg-yellow-500: rgb(218, 187, 66);
    --bg-app: #f5f5f5;
    --bg-input: #f2f2f2;
    --text-input: #707070;
    --bg-selectedZone: #bcc0cd;
    --text-selectedZone: #fff;
    --text-gray-500: #747474;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --font-normal: 400;
    --font-medium	: 500;
    --font-semibold	: 600;
    --font-bold	: 700;
    --delayIn: .3s;
    --delayOut: .5s;
    --spc-1: 
    --spc-0.5: 0.125rem;
    --spc-1: 0.25rem;
    --spc-1-5: 0.375rem;
    --spc-2: 0.5rem;
    --spc-2-5: 0.625rem;
    --spc-3: 0.75rem;
    --spc-3-5: 0.875rem;
    --spc-4: 1rem;
    --spc-5: 1.25rem;
    --spc-6: 1.5rem;
    --spc-7: 1.75rem;
    --spc-8: 2rem;
    --spc-9: 2.25rem;
    --spc-10: 2.5rem;


  }

  html {
    height: -webkit-fill-available;
  }

  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }

  .container {
    width: ${props => (props.theme.containerSize ? props.theme.containerSize : 'min(100% - 2rem, 50rem)')}; 
    margin-inline: auto;
  }


/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  body {
    /* The hack for Safari */
    min-height: -webkit-fill-available;
  }
}

 .img-responsive {
    min-width: 50px;
    min-height: 50px;
    width: 100%;
    height: auto;
  }
  /* media query example  */
  @media (${screen.md}) {
    /* input {
      border: 2px solid red !important;
    } */
  }
  
.text-sm {
  font-size: 0.875rem;
}
.text-base {
  font-size: var(--text-base);
}
.text-lg {
  font-size: var(--text-lg);
}
.text-xl {
  font-size: var(--text-xl);
}
.text-2xl {
  font-size: var(--text-2xl);
}
.text-3xl {
  font-size: var(--text-3xl);
}
.text-4xl {
  font-size: var(--text-4xl);
}

.text-gray-500 {
  color: var(--text-gray-500);
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.no-underline	{text-decoration-line: none;}

/* Disposition */

.block {display: block;}

.grid {
  display: grid !important;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-1-2 {
  grid-template-columns: 1fr 2fr;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.content-start {
  align-content: flex-start;
}
.content-between {
  align-content: space-between;
}

.flex {
  display: flex !important;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.place-items-center {
  place-items: center;
}

.justify-center {
  justify-content: center;
}
.justify-evenly {
  justify-content: space-evenly;
}
.justify-between {
  justify-content: space-between;
}
.justify-self-end {
  justify-self: end;
}	

.items-center {
  align-items: center;
}

.items-end {
  align-items: end;
}

.gap-x-2 {
  column-gap: 0.5rem;
}

.gap-x-4 {
  column-gap: 1rem;
}

.gap-x-8 {
  column-gap: 4rem;
}

.gap-y-1 {
  row-gap: 0.25rem;
}

.gap-y-4 {
  row-gap: 1rem;
}

/* Positionnement */

.sticky {
  position: sticky;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.bottom-0 {
  bottom: 0;
}

.z-10 {
  z-index: 10;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.max-w-350 {
  max-width: 350px;
}

/* Espacements */

.m-4 {
  margin: 1em;
}
.m-8 {
  margin: 2em;
}

.mx-auto {
  margin: 0 auto;
}

.mr-8 {
  margin-right: 2rem;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

.ml-12 {
  margin-left: 3rem;
}

.p-2 {
  padding: 0.5rem;
}
.p-4 {
  padding: 1rem;
}
.pl-4 {
  padding-left: 1rem;
}
.pl-6 {
  padding-left: 1.5rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

/* Backgrounds */

.bg-white {
  background-color: ${props => props.theme.colors.white || '#FFF'};
}

/* Arrondis */

.rounded-xl {
  border-radius: 0.75rem;
}

input:focus-visible    {
  outline-color: ${props => props.theme.accentColor};
  outline-offset: 2px;
  outline-style: solid;
}

table {
  border: 2px solid #111;
}

`
