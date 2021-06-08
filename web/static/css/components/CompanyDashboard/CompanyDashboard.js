const drawerWidth = 300

export default theme => ({
  root: {
    display: 'flex',
    backgroundColor: 'rgba(249,249,249, 1)',
    minHeight: '100vh',
    [ theme.breakpoints.down('sm') ]: {
      flexDirection: 'column',
    },
  },
  rootTabs: {
    minWidth: '100%',
    '& button': {
      minWidth: 0,
    },
  },
  scrollIndicator: {
    backgroundColor: 'white',
  },
  colorSelected: {
    color: 'pink',
  },
  drawer: {
    [ theme.breakpoints.up('sm') ]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    margin: theme.spacing(2),
    [ theme.breakpoints.up('md') ]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    position: 'fixed',
    backgroundColor: '#353A51',
    borderTopRightRadius: '30px 40px',
    border: 0,
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [ theme.breakpoints.down('sm') ]: {
      padding: 0,
    },
  },
  appBar: {
    [ theme.breakpoints.up('xs') ]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  paddingList: {
    paddingLeft: 15,

  },

  buttonCareteker: {
    display: 'flex',
    justifyContent: 'center',
    '& :hover': {
      color: 'black',
      backgroundColor: 'white',
    },
  },
  buttonCaretekerActif: {
    display: 'flex',
    justifyContent: 'center',
    '& :hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },

  buttonMicroservice: {
    display: 'flex',
    justifyContent: 'center',
    '& :hover': {
      color: 'black',
      backgroundColor: 'white',
    },
  },

  buttonMicroserviceActif: {
    display: 'flex',
    justifyContent: 'center',
    '& :hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },

  buttonActive: {
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: 'black',
    padding: '10px 50px',
    backgroundColor: 'white',
  },

  helpButton: {
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
    padding: '10px 50px',
  },
  listItemText: {
    '& span': {
      fontWeight: 'bold',
    },
  },
  activeButton: {
    backgroundColor: 'white',
    borderTopLeftRadius: '80px',
    borderBottomLeftRadius: '80px',
    transition: 'inherit',
    paddingTop: 16,
    paddingBottom: 16,
    '& .MuiSvgIcon-root': {
      color: 'black',
    },
  },
  standartButton: {
    transition: 'inherit',
    paddingTop: 16,
    paddingBottom: 16,
    color: 'white',
  },
  hoverButton: {
    borderTopLeftRadius: '80px',
    borderBottomLeftRadius: '80px',
    '& :hover': {
      color: 'black',
      backgroundColor: 'white',
      borderTopLeftRadius: '80px',
      borderBottomLeftRadius: '80px',
      '& .MuiSvgIcon-root': {
        color: 'black',
      },
    },
  },
  appBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: '50%',
    paddingBottom: '5%',
  },
  drawerContainer: {
    [ theme.breakpoints.up('sm') ]: {
      display: 'none',
    },
  },
  drawerMobile: {
    [ theme.breakpoints.down('sm') ]: {
      display: 'none',
    },
  },
  navbarContainer: {
    [ theme.breakpoints.only('xs') ]: {
      display: 'none',
    },
    [ theme.breakpoints.only('sm') ]: {
      display: 'none',
    },
  },
  mobileNavbar: {
    position: 'fixed',
    bottom: '3%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    zIndex: 4,
    [ theme.breakpoints.only('lg') ]: {
      display: 'none',
    },
    [ theme.breakpoints.only('xl') ]: {
      display: 'none',
    },
    [ theme.breakpoints.only('md') ]: {
      display: 'none',
    },

  },
})
