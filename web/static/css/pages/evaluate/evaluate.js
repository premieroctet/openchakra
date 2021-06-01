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
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    }

  },
  hideOnLaptop:{
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    }
  }
})
