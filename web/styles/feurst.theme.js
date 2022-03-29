import {createGlobalStyle} from 'styled-components'
import {screen} from './screenWidths'

// const blueFeurst = '#141953'
const blueFeurst = 'hsl(210.6, 50.9%, 41.6%)'

export const theme = {

  accentColor: blueFeurst, /* Default color for inputs */
  colors: {
    blue: blueFeurst, // Feurst blue
    white: '#FFF', // pure white
    redAlert: 'red',
  },
  //   space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
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
  }

  /* media query example  */
  @media (${screen.md}) {
    /* input {
      border: 2px solid red !important;
    } */
  }

  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }

  input:focus-visible    {
    outline-color: ${props => props.theme.accentColor};
    outline-offset: 2px;
    outline-style: solid;
  }

  .img-responsive {
    min-width: 50px;
    min-height: 50px;
    width: 100%;
    height: auto;
  }

  table {
    border: 2px solid #111;
  }

`
