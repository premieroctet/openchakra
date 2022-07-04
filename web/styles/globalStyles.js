import {createGlobalStyle} from 'styled-components'
import Roboto from '../static/assets/fonts/Roboto-Regular.woff2'
import {screen} from './screenWidths'

export const orig = createGlobalStyle`

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
  --brand-color: ${props => props.theme?.colors?.brand || 'inherit'};
}
`

export const feurst = createGlobalStyle`
  
@font-face {
  font-family: 'Roboto';
  src: local('Roboto'), url(${Roboto}) format('woff2');
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: var(--font-family) !important;
} 

:root {
  /* Colors */
  accent-color: ${props => props.theme?.accentColor || 'auto'};
  caret-color: ${props => props.theme?.accentColor || 'auto'};
  --brand-color: ${props => props.theme?.colors?.brand || 'inherit'};
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


/* media query example  */
@media (${screen.lg}) {

}


`


export const aftral = createGlobalStyle`


/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local(Poppins),
       url('../static/assets/fonts/Poppins/poppins-v20-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../static/assets/fonts/Poppins/poppins-v20-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../static/assets/fonts/Poppins/poppins-v20-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../static/assets/fonts/Poppins/poppins-v20-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
  font-display: swap;
}

* {
  font-family: var(--font-family) !important;
} 

:root {
    /* Colors */
    accent-color: ${props => props.theme?.accentColor || 'auto'};
    caret-color: ${props => props.theme?.accentColor || 'auto'};
    --brand-color: ${props => props.theme?.colors?.brand || 'inherit'};
    --bg-selectedZone: #bcc0cd;
    --text-selectedZone: #fff;
    
    --bg-color: #f7f7f7;
    --bg-card-color: #39466b;

  }

  `
