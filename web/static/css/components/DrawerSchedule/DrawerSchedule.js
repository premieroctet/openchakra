export default theme => ({
  drawerScheduleDrawerPaper:{
    width: '90%',
    borderRadius: 17,
    padding: '5%'
  },
  drawerPaperAnchorBottom:{
    left: '10vh',
    [theme.breakpoints.down('md')]:{
      left: 'inherit',
      width: '100%'
    }
  },
  drawerScheduleButton:{
    marginRight: theme.spacing(2),
  },
})
