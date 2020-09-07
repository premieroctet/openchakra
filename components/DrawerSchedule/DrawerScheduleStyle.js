const widthDrawer = '35%';

export default theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: widthDrawer,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: widthDrawer,
    right: 0,
    left: 'inherit',
    marginTop: 150,
    padding: '1%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%',
      height: '100%',
      padding: '5%',
    },
  },
})
