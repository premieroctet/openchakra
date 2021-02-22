const drawerWidth = 240;

export default theme =>({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    top: 'inherit',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    position: 'inherit',
    backgroundColor: theme.palette.yellow.main,
    borderTopRightRadius: '80px 80px',
    borderBottomRightRadius: '80px 80px',
    border:0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  AppBarPosition:{
    top: 'inherit'
  },
  paddingList:{
    marginBottom: '20vh',

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
    transition: 'inherit'
  },
  standartButton:{
    transition: 'inherit'
  },
  hoverButton:{
    borderTopLeftRadius: '80px',
    borderBottomLeftRadius: '80px',
    '& :hover':{
      backgroundColor: 'white',
      borderTopLeftRadius: '80px',
      borderBottomLeftRadius: '80px',
    }
  }
})
