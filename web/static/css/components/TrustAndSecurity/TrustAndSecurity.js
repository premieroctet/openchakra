export default theme => ({
  trustAndSecurityMainContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]:{
      flexWrap: 'wrap'
    },
    [theme.breakpoints.down('xs')]:{
      alignItems: 'start'
    }
  },
  trustAndSecurityContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]:{
      marginTop: '3vh',
      width: '50%',
      justifyContent: 'start',
      paddingLeft: '7%'
    },

  }
})
