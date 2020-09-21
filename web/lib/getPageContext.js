import {SheetsRegistry} from 'jss';
import {createGenerateClassName, createMuiTheme} from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2FBCD3',
    },
    secondary: {
      main: '#F8727F',
    },
    link: {
      main: '#4C89C4'
    },
    text: {
      main: '#262626'
    },
    backgroundGrey: {
      main: '#EDEDED'
    }
  },
  typography: {
    fontSize: 14,
    lineHeight: '20px',
    useNextVariants: true,
    fontFamily: 'Helvetica',
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
