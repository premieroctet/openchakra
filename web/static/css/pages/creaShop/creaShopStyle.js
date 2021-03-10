const drawerWidth = 240;

export default theme => ({
  nextButton: {
    color: 'white',
    textTransform: 'initial',
    fontWeight: 'bold',
    backgroundColor: theme.palette.yellow.main
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
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    position: 'fixed',
    backgroundColor: '#E2E2E2',
    borderTopRightRadius: '30px 40px',
    border:0,
    height: '100vh'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]:{
      padding: 0
    }
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
  listItemText:{
    '& span':{
      fontWeight: 'bold'
    }
  },
  activeButton:{
    backgroundColor: 'white',
    borderTopLeftRadius: '80px',
    borderBottomLeftRadius: '80px',
    transition: 'inherit',
    paddingTop: 16,
    paddingBottom: 16,
    '& .MuiSvgIcon-root':{
      color:'black'
    }
  },
  standartButton:{
    transition: 'inherit',
    paddingTop: 16,
    paddingBottom: 16,
    color: 'white'
  },
  hoverButton:{
    borderTopLeftRadius: '80px',
    borderBottomLeftRadius: '80px',
    '& :hover':{
      color:'black',
      backgroundColor: 'white',
      borderTopLeftRadius: '80px',
      borderBottomLeftRadius: '80px',
      '& .MuiSvgIcon-root':{
        color:'black'
      }
    }
  },
  appBarContainer:{
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-around',
    height: '100%'
  }
})
