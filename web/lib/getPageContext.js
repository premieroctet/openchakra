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
    text: {
      main: '#262626'
    },
    backgroundGrey: {
      main: '#EDEDED'
    },
    white: {
      main: '#FFFFFF'
    },
    yellow: {
      main: '#E7C63B'
    },
    dark: {
      main: '#352C2A'
    }
  },
  typography: {
    fontSize: 14,
    lineHeight: '20px',
    useNextVariants: true,
    fontFamily: 'Helvetica',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  typographyTitle: {
    fontFamily: 'Futura',
    color: '#352C2A',
    fontWeight: 'bold',
    lineHeight: '67px',
    letterSpacing: '4px'
  },
  typographyText: {
    fontFamily: 'Helvetica',
    color: '#352C2A',
    fontWeight: 'bold',
    letterSpacing: '4px',
    fontSize: 14,
    lineHeight: '20px',
  },
  typographyButton: {
    fontWeight: 'bold',
    textTransform: 'none',
    color: '#FFFFFF',
  },
  border:{
    button:{
      borderRadius: 37
    },
    buttonDiscover:{
      borderRadius: 24
    }

  }
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
