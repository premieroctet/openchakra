export default theme => ({
  textfield:{
    width: '50%',
    [theme.breakpoints.down('lg')]:{
      width: '100%'
    }
  },
  buttonSave:{
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'black'
  },
  layoutAccounContainer:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  layoutMobileContainer:{
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
    }
  }
})
