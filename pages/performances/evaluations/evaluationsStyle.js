export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
      marginTop: 0
    }
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

  myEvaluations:{
    paddingLeft: 55,
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      display: 'flex',
      justifyContent : 'center',
      flexDirection : 'column',
      marginLeft: 20
    }
  }
})
