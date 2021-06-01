export default theme => ({
  iosSwitchContainer:{
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row-reverse'
    }
  },
  containerButtonSave:{
    [theme.breakpoints.down('lg')]: {
      marginBottom: '12vh'
    }
  },
  buttonSave: {
    textTransform: 'initial',
    color: 'white',
    fontWeight: 'bold'
  },
  containerLayoutAccount:{
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    },
  },
  layoutMobileContainer:{
    [theme.breakpoints.only('xl')]: {
      display: 'none'
    },
    [theme.breakpoints.only('lg')]: {
      display: 'none'
    },
    [theme.breakpoints.only('md')]: {
      display: 'none'
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none'
    },
  }
})
