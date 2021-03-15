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
  contentTextSize: {
    width: 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
    },
  },
  contentAddandRemove: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  subContentAddanRemove: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buttonRemove: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: 'center',
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
    },
  },
  buttonAdd: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: 'center',
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 25,
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
    },
  },
  selectDelayInputRepsonsive: {
    zIndex: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
})
