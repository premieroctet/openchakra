export default theme => ({
  chipsContainer:{
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  containerIcon:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    [theme.breakpoints.down('xs')]:{
      right: 0
    }
  },
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
  inputFileContainer:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  buttonUpload:{
    color: 'white',
    textTransform: 'initial',
    fontWeight: 'bold'
  }
})
