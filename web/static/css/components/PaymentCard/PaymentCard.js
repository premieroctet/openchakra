const Style = theme => ({
  containerNameCard:{
    [theme.breakpoints.down('lg')]:{
      textAlign: 'center'
    }
  },
  containerNumCard:{
    [theme.breakpoints.down('lg')]:{
      textAlign: 'center'
    }
  },
  containerImg:{
    display: 'flex',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  }

})
module.exports=Style
