export default theme => ({
  aboutHastagsContainer:{
    [theme.breakpoints.down('sm')]:{
      marginBottom: '12vh'
    }
  },
  buttonSave: {
    textTransform: 'initial',
    color:'white',
    fontWeight: 'bold',
    width: '100%'
  },
  mydialogContainer:{
    minWidth: '100%'
  },
  root:{
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl:{
    width: '100%'
  },
  dialogPaper:{
    [theme.breakpoints.down('xs')]:{
      minWidth: '100%'
    }
  }
})
