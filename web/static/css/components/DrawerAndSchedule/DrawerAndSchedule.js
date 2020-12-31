export default theme => ({
  drawerAndSchedule_mainContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  drawerAndSchedule_scheduleContainer:{
    width: '100%'
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
      flexShrink: 0,
    },
  },


})
