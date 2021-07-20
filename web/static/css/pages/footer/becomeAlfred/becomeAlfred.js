export default theme => ({
  howItWorksComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.secondary.main
  },
  generalWidthContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  hiddenXs:{
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  }
})
