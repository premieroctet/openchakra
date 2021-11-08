export default theme => ({
  scrollMenuIndicator:{
    backgroundColor: theme.palette.secondary.main
  },
  scrollMenuTab:{
    textTransform: 'initial'
  },
  containerChildren:{
    margin:'0 15%',
    display:'flex',
    justifyContent:'center',
    backgroundColor: 'white',
    borderRadius: 27,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    padding: '5% 10%',
    marginTop : '5vh',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]:{
      margin:'0 5%',
      marginTop : '5vh',
      marginBottom: '5vh',
    }
  }
})
