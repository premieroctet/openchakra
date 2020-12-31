export default theme => ({
  textfield:{
    width: '50%',
    [theme.breakpoints.down('lg')]:{
      width: '100%'
    }
  },
  buttonSave:{
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'black'
  },
})
