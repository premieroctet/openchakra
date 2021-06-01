export default theme => ({
  containerAskQuestion:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    }
  },
  containerProfileLayout:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
  },
  containerLayoutMobileProfile:{
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
  }
})
