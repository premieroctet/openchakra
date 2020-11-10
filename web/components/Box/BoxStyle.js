export default theme => ({
  borderBox:{
    borderRadius: 30,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    paddingLeft: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingRight: '10%',
    height: '100%',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]:{
      border :'inherit',
      paddingLeft: 0,
      paddingRight: 0
    }
  }
})
