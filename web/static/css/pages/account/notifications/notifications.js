export default theme => ({
  iosSwitchContainer:{
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row-reverse'
    }
  },
  containerButtonSave:{
    [theme.breakpoints.down('lg')]: {
      marginBottom: '12vh'
    }
  },
  buttonSave: {
    textTransform: 'initial',
    color: 'white',
    fontWeight: 'bold'
  },
})
