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
    }
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
    text:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: '500',
      fontSize: '15px'
    },
    button:{

    },
    blackButton:{
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
    },
    containedButton:{

    },
    infoBar:{
      fontFamily: 'Helvetica',
      lineHeight: '23px',
      fontSize: 14
    }
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
      borderRadius: 19,
      border: '2px solid rgba(53,44,42,1)'
    }
  },
  padding:{
    blackButton:{
      padding: '12px 38px'
    },
    homePage:{
      section:{
        padding: '5%'
      }
    }
  },
  width:{
    homePage:{
      width: '80%'
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
