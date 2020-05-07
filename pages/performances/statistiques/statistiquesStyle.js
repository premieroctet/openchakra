export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
    }
  },
  toggle: {
    zIndex: 0
  },
  webview: {
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
})
