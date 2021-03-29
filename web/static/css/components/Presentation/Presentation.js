export default theme => ({
  textField:{
    width: '100%'
  },
  button: {
    textTransform: 'initial',
    width: '100%'
  },
  containerIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      right: 0
    }
  },
  dialogPaper:{
    [theme.breakpoints.down('xs')]:{
      minWidth: '100%'
    }
  }
})
