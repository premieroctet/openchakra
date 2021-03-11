export default theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
  },
  contentLeftTop: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  contentTitle: {
    width: '80%',
  },
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2,
  },
  policySizeSubtitle: {
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: '#484848',
  },
  bottomSpacer: {
    width: 500,
    marginTop: 30,
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  policySizeContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  textFieldSelecteService: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      width: 300,
    },
  },
})
