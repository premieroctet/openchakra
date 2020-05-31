const drawerWidth = 240;

export default theme => ({
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
  },
  drawerPaperMargin:{
    width: drawerWidth,
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 'inherit',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
})
