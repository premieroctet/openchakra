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
      justifyContent: 'end'
    }
  }
})
