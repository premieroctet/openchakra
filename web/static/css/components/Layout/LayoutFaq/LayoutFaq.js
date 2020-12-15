export default theme => ({
  mainContainerLayoutFaq:{
    position:'relative',
    minHeight: '100vh'
  },
  childrenContainer:{
    margin:'0 15%',
    display:'flex',
    justifyContent:'center',
    backgroundColor: 'white',
    padding: '5% 10%',
    [theme.breakpoints.down('sm')]:{
      margin:0,
      paddingBottom: '20%'
    },
    [theme.breakpoints.down('xs')]:{
      paddingBottom: '45%'
    }
  },
  becomeAlfredPageContainer:{
    paddingBottom: '10%',
  },
  footerContainerFaq:{
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection:'row-reverse',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    }

  }
})
