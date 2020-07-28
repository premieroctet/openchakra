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
    zIndex: 0,
    margin: 15
  },
  webview: {
    [theme.breakpoints.up('xs')]:{
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]:{
      display:'none'
    }
  },
  mobileview: {
    [theme.breakpoints.up('md')]:{
      display:'none'
    }
  },
  titreservice:{
    [theme.breakpoints.up('md')]:{
      marginLeft: '30px',
    },
    [theme.breakpoints.down('sm')]:{
      marginLeft: '2px'
    }
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  myStat:{
    paddingLeft: '15%',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    }
  },
  containerStatistique:{
    marginTop: '40px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  mainContainer:{
    marginBottom:20,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  containerLabelCategory:{
    marginTop: '50px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 40
    }
  },
  containerDetails:{
    [theme.breakpoints.up('xs')]: {
      marginLeft: 20
    }
  }

})
