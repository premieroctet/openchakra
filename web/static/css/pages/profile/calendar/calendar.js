export default theme => ({
  mainContainerSchedule:{
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh'
    }
  },
  profileLayoutContainer:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  layoutMobileProfileContainer:{
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
