import {createGlobalStyle} from 'styled-components'

export const theme = {
  accentColor: '#141953', /* Default color for inputs */
  mainBgColor: '#141953', // Feurst blue
  mainBgColorHover: '#2732a5',
  mainTextColor: '#FFF',
  mainTextColorHover: '#EEE',
    
  secBgColor: 'bg-indigo-300',
  secBgColorHover: 'bg-indigo-300',
  secTextColor: 'text-gray-400',
  secTextColorHover: 'text-white',
  //   breakpoints: [32, 48, 64],
  //   space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: {xs: '0.75rem', base: '1rem'},
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    normal: 1,
    title: 1.25,
    paragraph: 1.5,
  },
  letterSpacings: {
    normal: 'normal',
  },
  colors: {
    black: '#000',
    white: '#fff',
    transparent: 'transparent',
    blue: '#1D4ED8',
    orange: '#F59E0B',
  },
  radii: ['0px', '2px', '4px', '8px', '16px', '48px'],
}

export const GlobalStyleEdi = createGlobalStyle`
  
  :root {
      accent-color: ${props => props.theme.accentColor};
      caret-color: ${props => props.theme.accentColor}
  }

  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }

  input {
      transition: 1s ease-in
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

  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  .shadow_button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
 
  .pushable {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
  }

  .pushable:hover {
    filter: brightness(110%);
  }
  .pushable:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  .pushable:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  .pushable:focus:not(:focus-visible) {
    outline: none;
  }

  .front {
    display: block;
    position: relative;
    padding: 12px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

`
