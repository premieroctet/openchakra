export default theme => ({
  bigContainer: {
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  containercalendar: {
    display: 'flex',
    width: ' 50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
      marginTop: 100,
      width: '90%'
    },
  },
  toggle: {
    zIndex: 0,
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: 0
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  navbarShopContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawerScheduleDrawerPaper:{
    top: 'inherit',
    left: 'auto',
    position: 'relative',
    height: '100%',
    borderRight: 'inherit',
    zIndex: 1,
  },
  drawerScheduleNav: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },
  drawerScheduleButton:{
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }


})
