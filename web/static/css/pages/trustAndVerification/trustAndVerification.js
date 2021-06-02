export default theme => ({
  searchFilterRightContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '10vh'
  },
  searchFilterRightLabel:{
    marginRight: 10
  },
  searchSelectPadding:{
    paddingRight: '34px !important'
  },
  buttonSave:{
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'black'
  },
  textfield:{
    width: '50%',
    [theme.breakpoints.down('lg')]:{
      width: '100%'
    }
  },
  layoutAccountContainer:{
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
