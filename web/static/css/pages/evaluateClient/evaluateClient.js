export default theme => ({
  bigContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh'
    }
  },
  buttonBack:{
    fontWeight: 'bold',
    textTransform : 'initial'
  },
  buttonSend:{
    fontWeight: 'bold',
    textTransform : 'initial',
    color: 'white'
  },
  hideOnMobile:{
    [theme.breakpoints.down('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.down('md')]:{
      display: 'none'
    }
  },
  hideOnWeb:{
    [theme.breakpoints.down('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.down('lg')]:{
      display: 'none'
    },
  }
})
