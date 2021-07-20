import {SheetsRegistry} from 'jss'
import {createGenerateClassName, createMuiTheme} from '@material-ui/core/styles'


const PRIMARY = 'rgba(178,204,251,1)'
const SECONDARY = 'rgba(248, 207, 97, 1)'
const ERRORCOLOR = '#B26879'
const COLORTITLE = ''
const COLORSUBTITLE = ''
const TEXTCOLOR = ''

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    error: {
      main: ERRORCOLOR,
    },
    b2b: {
      main: '#353A51',
    },
    link: {
      main: '#4C89C4',
    },
    backgroundGrey: {
      main: '#EDEDED',
    },
    white: {
      main: 'rgba(255,255,255,1)',
    },

    black: {
      main: 'rgba(53,44,42,1)',
    },
    lightBlack: {
      main: 'rgba(38,38,38,6)',
    },
    placeHolder: {
      main: 'rgba(0, 0, 0, 0.87)',
    },
  },
  title: {

  },
  typography: {
    fontSize: 14,
    lineHeight: '20px',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'none',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: '#696767',
    title: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      fontSize: '32px',
      margin: 0,
    },
    subTitle: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      fontSize: '20px',
      margin: 0,
    },
    sectionTitle: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      fontSize: '18px',
      margin: 0,
    },
    text: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      fontSize: '16px',
      margin: 0,
    },
    textAlfredName: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '800',
      fontSize: '12px',
      margin: 0,
    },
    textLabel: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      fontSize: '10px',
      margin: 0,
    },
    buttonLink: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      fontSize: '17px',
    },
    blackButton: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    whiteButton: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    whiteButtonContained: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    infoBar: {
      fontFamily: 'Montserrat, sans-serif',
      lineHeight: '23px',
      fontSize: 14,
      fontWeight: 'bold',
    },
    placeHolder: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.1876em',
    },
  },
  border: {
    button: {
      borderRadius: 37,
    },
    buttonDiscover: {
      borderRadius: 24,
    },
    blackButton: {
      borderRadius: 39,
    },
    whiteButton: {
      borderRadius: 15,
      border: '2px solid rgba(112,112,112,1)',
    },
    textField: {
      borderRadius: 39,
    },
    categoryCard: {
      borderRadius: 50,
    },
  },
  padding: {
    blackButton: {
      padding: '12px 38px',
    },
    whiteButton: {
      padding: '5px 30px',
    },
    whiteButtonContained: {
      padding: '6px 38px',
    },
    homePage: {
      section: {
        padding: '8%',
      },
    },
    infoBar: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
})

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  }
}

let pageContext

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}
