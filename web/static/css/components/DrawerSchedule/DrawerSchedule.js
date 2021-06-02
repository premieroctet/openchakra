export default theme => ({
  drawerScheduleDrawerPaper:{
    width: '90%',
    borderRadius: 17,
    padding: '5%'
  },
  drawerPaperAnchorBottom:{
    left: '10vh',
    [theme.breakpoints.down('md')]:{
      left: 'inherit',
      width: '100%'
    }
  },
  drawerScheduleButton:{
    marginRight: theme.spacing(2),
  },
  buttonShowContainer:{
    marginTop: '5vh',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  containerFab:{
    position: 'fixed',
    bottom: '15vh',
    zIndex: 6,
    right: 0,
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
