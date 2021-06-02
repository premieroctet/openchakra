export default theme => ({
  textField:{
    width: '100%',
  },
  button:{
    fontWeight: 'bold',
    color:'white',
    textTransform: 'initial'
  },
  formControl:{
    width: '100%'
  },
  editProfilCompanyAlgoliaPlace:{
    height: '100%'
  },
  containerAlgolia:{
    '& div':{
      height: '100%'
    },
    '& .algolia-places':{
      height: '100%'
    }
  },
  buttonCheckPhone:{
    fontWeight: 'bold',
    textTransform: 'initial',
    width: '100%',
    color:'white',
  },
  layoutAccountContainer:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
  },
  layoutMobileContainer:{
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
  }
})
