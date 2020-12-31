export default theme =>({
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  linkBloc: {
    width: '100%',
    padding: 50,
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    cursor: 'pointer',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      padding: 15,
    }
  },
  blockContainer:{
    [theme.breakpoints.down('xs')]:{
      margin:10
    }
  },
  linkText: {
    [theme.breakpoints.down('xs')]:{
      whiteSpace: 'nowrap'
    }
  },
  accord: {
    padding: '0 300px'
  },
  logoContainer:{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
  }
})
