const drawerWidth = 240;

export default theme => ({

  containerNavigation:{
    margin: 0,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor:'white',
    zIndex:4,
    borderTop: '1px solid rgba(210, 210, 210, 0.5)',
  },
  positionNavigationContainer:{
    width:'100%',
    padding: 15,
    marginLeft: drawerWidth,
    [theme.breakpoints.down('sm')]:{
      marginLeft: 0
    }

  },
  containerNextButton:{
    display: 'flex',
    justifyContent: 'flex-end',
  },
  nextButton: {
    color: 'white',
    textTransform: 'initial',
    fontWeight: 'bold',
    backgroundColor: theme.palette.yellow.main,
  },
  backButton:{
    textTransform: 'initial',
  },
  root: {
    display: 'flex',
    backgroundColor: 'rgba(249,249,249, 1)',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]:{
      flexDirection : 'column'
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    margin: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: '30px 40px',
    border:0,
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginBottom: '12vh'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  paddingList:{
    paddingLeft: 15,

  },
  helpButton:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
    padding: '10px 50px'
  },

  appBarContainer:{
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-around',
    height: '100%'
  },


})
