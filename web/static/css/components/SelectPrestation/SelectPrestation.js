export default theme => ({
  policySizeTitle: {
    color: '#696767',
  },
  policySizeSubtitle: {
    color: '#696767',
  },
  policySizeContent: {
    color: '#696767',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: 'white',
  },

  containerPrestas: {
    marginTop: 30,
    width: '100%',
  },

  buttonAddPrestas: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 100,
  },
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
    width: '100%',
    textAlign: 'center'
  },
  bottomSpacer: {
    marginTop: 30,
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  maxWidth: {
    width: '100%',
  },

  marginThirty: {
    marginBottom: 30,
    marginTop: 30,
  },
  titleContainer:{
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
      justifyContent: 'center'
    }
  }
})
