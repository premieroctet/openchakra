export default theme => ({
  servicesConntainer:{
    [theme.breakpoints.down('lg')]:{
      display: 'flex',
      flexDirection: 'column-reverse'
    },
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh'
    }
  }
})
