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
  policySizeTitle: {
    fontSize: 24,
    lineHeight: '1.25em',
    color: '#696767',
  },
  policySizeSubtitle: {
    color: '#696767',
  },
  policySizeContent: {
    color: '#696767',
  },

})
