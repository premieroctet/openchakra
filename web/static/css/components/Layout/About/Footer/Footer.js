export default theme => ({
  mainContainerFooter:{
    display:'flex',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column',
      alignItems: 'flex-end'
    }

  }
})
