export default theme => ({
  servicesConntainer:{
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
      flexDirection: 'column-reverse'
    },
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh'
    }
  },
})
