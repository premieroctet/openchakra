import {createGlobalStyle} from 'styled-components'
import {screen} from '../screenWidths'

const blue = '#141953'
const blueFeurst = 'hsl(210.6, 50.9%, 41.6%)'

export const theme = {
  accentColor: blueFeurst /* Default color for inputs */,
  colors: {
    blue: blue,
    blueFeurst: blueFeurst, // Logo
    white: '#FFF', // pure white
    redAlert: 'red',
    yellow: '#e0ba14',
    black: '#111',
    metalGray: '#a8a9ab',
    lightGray: '#e4e4e4',
  },
  containerSize: {
    base: 'min(100% - 2rem, 60rem)',
    lg: 'min(100% - 2rem, 70rem)',
    xl: 'min(100% - 2rem, 80rem)',
  },
  //   space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: {
    xxs: '0.6rem',
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
}

export const GlobalStyleEdi = createGlobalStyle`
  
  :root {
    /* Colors */
    accent-color: ${props => props.theme?.accentColor || 'auto'};
    caret-color: ${props => props.theme?.accentColor || 'auto'};
    --brand-color: #182d45;
    --brand-color: ${props => props.theme?.colors?.blue || 'blue'};
    --black: #111;
    --white: ${props => props.theme?.colors?.white || '#FFF'};
    --yellow-500: ${props => props.theme?.colors?.yellow || rgb(218, 187, 66)};
    --bg-selectedZone: #bcc0cd;
    --text-selectedZone: #fff;
    --gray-800: rgb(190, 190, 190);
    --gray-500: #747474;
    --metal-gray: ${props => props.theme?.colors?.metalGray || 'gray'};
    --gray-400 : #dedddd;
    --gray-200: #f8f8f8;

    --stone-50: #FAFAF9;
    --stone-100: #F5F5F4;
    --stone-200: #E7E5E4;
    --stone-300: #D6D3D1;
    --stone-400: #A8A29E;
    --stone-500: #78716C;
    --stone-600: #57534E;
    --stone-700: #44403C;
    --stone-800: #292524;
    --stone-700: #1C1917;

    /* text */
    --text-xxs: 0.6rem;
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
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

    /* Animation delays */
    --delayIn: .2s;
    --delayOut: .5s;

    /* Spacing */
    --spc-0-5: 0.125rem;
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
    --spc-11: 2.75rem;
    --spc-12: 3rem;
    --spc-24: 6rem;
    --spc-32: 8rem;
    --spc-96: 24rem;

    /* Grid */
    --grid-cols-1: repeat(1, minmax(0, 1fr));
    --grid-cols-2: repeat(2, minmax(0, 1fr));
    --grid-cols-3: repeat(3, minmax(0, 1fr));

    /* BorderRadius */
    --rounded: 0.25rem;
    --rounded-md: 0.375rem;
    --rounded-xl: 0.75rem;
    --rounded-2xl: 1rem;
    --rounded-3xl: 1.5rem;
    --rounded-7xl: 3.5rem;
    --rounded-full: 9999px;

    /* containers */
    --container-sm: ${props => (props.theme?.containerSize?.sm ? props.theme.containerSize.sm : 'min(100% - 2rem, 30rem)')}; 
    --container-md: ${props => (props.theme?.containerSize?.md ? props.theme.containerSize.md : 'min(100% - 2rem, 40rem)')}; 
    --container-base: ${props => (props.theme?.containerSize?.base ? props.theme.containerSize.base : 'min(100% - 2rem, 50rem)')}; 
    --container-lg: ${props => (props.theme?.containerSize?.lg ? props.theme.containerSize.lg : 'min(100% - 2rem, 60rem)')}; 
    --container-xl: ${props => (props.theme?.containerSize?.xl ? props.theme.containerSize.xl : 'min(100% - 2rem, 70rem)')}; 

    /* Miscellaneous */
    --minTapSize: 44px;
  }

  html {
    height: -webkit-fill-available;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme?.fontFamily};
  }


  
  .container-sm {
    width: var(--container-sm);
    margin-inline: auto;
  }
  .container-md {
    width: var(--container-md);
    margin-inline: auto;
  }
  .container-base {
    width: var(--container-base);
    margin-inline: auto;
  }
  
  .container-lg {
    width: var(--container-lg); 
    margin-inline: auto;
  }

  .container-xl {
    width: var(--container-xl); 
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

/* Text */

.dl-inline dt {
  float: left;
  clear: left;
  margin-right: 10px;
}
.dl-inline dd {
  margin-left: 0px;
}

/* font-sizes */
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

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

/* font-weight */

.font-semibold {
  font-weight: var(--font-semibold);
}

/* font-colors */
.text-black {
  color: var(--black);
}
.text-white {
  color: var(--white);
}

.no-underline	{text-decoration-line: none;}

/* Forms */

input:focus:not(:focus-visible) {
  outline: none;
}


/* Disposition */

.block {display: block;}

.grid {
  display: grid !important;
}

.grid-cols-2 {
  grid-template-columns: var(--grid-cols-2);
}

.grid-cols-3 {
  grid-template-columns: var(--grid-cols-3);
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

.grow {
  flex-grow: 1;
}

.place-items-center {
  place-items: center;
}

.justify-center {justify-content: center;}
.justify-end {justify-content: end;}
.justify-evenly {justify-content: space-evenly;}
.justify-between {justify-content: space-between;}
.justify-self-end {justify-self: end;}	

.items-baseline	{align-items: baseline;}
.items-center {align-items: center;}
.items-end {align-items: end;}

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

.gap-y-3 {
  row-gap: 0.75rem;
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

.max-w-200 {
  max-width: 200px;
}
.max-w-350 {
  max-width: 350px;
}

/* Espacements */

.m-4 {margin: var(--spc-4);}
.m-8 {margin: var(--spc-8);}

.mx-auto {margin: 0 auto;}

.mr-8 {margin-right: var(--spc-8);}

.mb-0 {margin-bottom: 0}
.mb-4 {margin-bottom: var(--spc-4) !important;}
.mb-6 {margin-bottom: var(--spc-6) !important;}
.mb-8 {margin-bottom: var(--spc-8) !important;}

.ml-12 {margin-left: var(--spc-12);}

.p-2 {padding: var(--spc-2);}
.p-4 {padding: var(--spc-4);}

.pl-4 {padding-left: var(--spc-4);}
.pl-6 {padding-left: var(--spc-6);}
.pr-6 {padding-right: var(--spc-6);}

.px-1 {
  padding-left: var(--spc-1);
  padding-right: var(--spc-1);
}

.py-2 {
  padding-top: var(--spc-2);
  padding-bottom: var(--spc-2);
}

/* Backgrounds */

.bg-white {
  background-color: var(--white);
}
.bg-brand {
  background-color: var(--brand-color);
}
.bg-gray-200 {
  background-color: var(--gray-200);
}

/* Arrondis */

.rounded-xl {
  border-radius: 0.75rem;
}

/* Components */
.tooltip {
  position: relative;
  display: inline-block;
}

[role=tooltip] {
  visibility: hidden;
  position: absolute;
}
[aria-describedby]:hover,
[aria-describedby]:focus {
  position: relative;
}
[aria-describedby]:hover + [role=tooltip],
[aria-describedby]:focus + [role=tooltip] {
 visibility: visible;
}



/* A11Y */

.sr-only {	
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

 /* media query example  */
@media (${screen.lg}) {
  
}


`
