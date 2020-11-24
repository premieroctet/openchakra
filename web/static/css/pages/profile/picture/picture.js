export default theme => ({
  pictureContainer:{
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
      flexDirection: 'column-reverse',
      marginBottom: '12vh'
    }
  }
})
