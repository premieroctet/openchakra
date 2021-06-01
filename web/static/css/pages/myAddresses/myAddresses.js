export default theme => ({
  buttonSave:{
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'black'
  },
  textField:{
    width: '100%'
  },
  editContainer:{
    display : 'flex',
    [theme.breakpoints.down('lg')]:{
      justifyContent: 'flex-end'
    }
  },
  hideOnlyMobile:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  hideOnLaptop:{
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    }
  }
})
