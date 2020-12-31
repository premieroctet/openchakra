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
  }
})
