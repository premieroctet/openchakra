export default theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonSave:{
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'black'
  }
})
