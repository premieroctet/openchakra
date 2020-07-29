export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
    }
  },
  containercalendar:{
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 200,
    [theme.breakpoints.down('sm')]: {
      width:'100%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '50%',
      marginTop: 20
    },
  },
  toggle: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})
