import {createGlobalStyle} from 'styled-components'
import {screen} from '../screenWidths'
import Roboto from '../../static/assets/fonts/Roboto-Regular.woff2'
import RobotoBold from '../../static/assets/fonts/Roboto-Bold-webfont.woff2'

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
  fontFamily: `Roboto, 'Source Sans Pro', sans-serif !important`,
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    normal: 1,
    title: 1.25,
    paragraph: 1.5,
  },
  radii: ['0px', '2px', '4px', '8px', '16px', '48px'],
}

export const GlobalStyleEdi = createGlobalStyle`
  
  @font-face {
    font-family: 'Roboto';
    src: local('Roboto'), url(${Roboto}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  :root {
    /* Colors */
    accent-color: ${props => props.theme?.accentColor || 'auto'};
    caret-color: ${props => props.theme?.accentColor || 'auto'};
    --brand-color: #182d45;
    --brand-color: ${props => props.theme?.colors?.blue || 'blue'};
    --yellow-500: ${props => props.theme?.colors?.yellow || rgb(218, 187, 66)};
    --green-500: ${props => props.theme?.colors?.green || 'hsl(90.3, 38.3%, 50.4%)'};
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
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme?.fontFamily};
  }

  * {
    font-family: inherit !important;
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

.col-end-auto	{grid-column-end: auto;}
.col-start-2 {grid-column-start: 2;}
.col-start-1 {grid-column-start: 1;}

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
.justify-self-start {justify-self: start;}
.justify-self-end {justify-self: end;}

.items-baseline	{align-items: baseline;}
.items-center {align-items: center;}
.items-end {align-items: end;}

.gap-x-1 {
  column-gap: var(--spc-1);
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

.my-2 {margin-block: var(--spc-2) !important;}

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

.opacity-100 {
  opacity: 1;
}

.opacity-0 {
  opacity: 0;
}

.scale-50 {
  transform: scale(50%);
}

.scale-100 {
  transform: scale(100%);
}

.translate-y-0 {
  transform: translateY(0px);
}

.-translate-y-full {
  transform: translateY(-100%);
}

.-translate-y-25	{ 
  transform: translateY(-25%);
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
