import {SheetsRegistry} from 'jss';
import {createGenerateClassName, createMuiTheme} from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F7C9C9',
    },
    secondary: {
      main: '#B26879',
    },
    link: {
      main: '#4C89C4'
    },
    backgroundGrey: {
      main: '#EDEDED'
    },
    white: {
      main: 'rgba(255,255,255,1)'
    },
    yellow: {
      main: 'rgba(248, 207, 97, 1)'
    },
    black: {
      main: 'rgba(53,44,42,1)'
    },
    lightBlack:{
      main: 'rgba(38,38,38,6)'
    },
    placeHolder:{
      main: 'rgba(0, 0, 0, 0.87)'
    },
  },
  typography: {
    fontSize: 14,
    lineHeight: '20px',
    useNextVariants: true,
    fontFamily: 'Helvetica',
    textTransform: 'none',
    fontWeight: 'bold',
    letterSpacing: '2px',
    title:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
      fontSize: '28px',
      margin:0
    },
    subTitle:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
      fontSize: '20px',
      margin: 0
    },
    sectionTitle:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
      fontSize: '18px',
      margin: 0
    },
    text:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: '500',
      fontSize: '15px',
      margin: 0
    },
    textAlfredName:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: '800',
      fontSize: '12px',
      margin: 0
    },
    textLabel:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: '500',
      fontSize: '10px',
      margin: 0
    },
    button:{

    },
    blackButton:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
    },
    whiteButton:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
    },
    containedButton:{

    },
    infoBar:{
      fontFamily: 'Helvetica',
      lineHeight: '23px',
      fontSize: 14
    },
    placeHolder:{
      fontFamily: 'Futura, sans-serif',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.1876em',
    },
  },
  border:{
    button:{
      borderRadius: 37
    },
    buttonDiscover:{
      borderRadius: 24
    },
    blackButton:{
      borderRadius: 39
    },
    whiteButton:{
      borderRadius: 15,
      border: '2px solid rgba(112,112,112,1)'
    },
    textField:{
      borderRadius: 39
    },
    categoryCard:{
      borderRadius: 50
    }
  },
  padding:{
    blackButton:{
      padding: '12px 38px'
    },
    whiteButton:{
      padding: '5px 30px'
    },
    homePage:{
      section:{
        padding: '8%'
      }
    }
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
