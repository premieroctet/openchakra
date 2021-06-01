export default theme => ({
  titleRub: {
    fontWeight: 'bold',
  },
  mainContainerAddService:{
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }
  },
  hideOnMobile:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  }
})
