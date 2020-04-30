export default theme => ({
  mainContainer:{
    [theme.breakpoints.down("xs")]:{
      display: 'flex',
      justifyContent: 'center'
    }
  },
  signupContainer: {
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',

  },
  card: {
    fontFamily: 'Helvetica',
    width: 800,
    marginTop: '100px',
    [theme.breakpoints.down("xs")]:{
      width: '90%',
    }
  },
  banner: {
    marginBottom: 25,
    backgroundColor: '#2FBCD3',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down("xs")]:{
      textAlign: 'center'
    }

  },
  newContainer: {
    padding: 20,
  },
  title: {
    fontFamily: 'Helvetica',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 22,
    letterSpacing: 1,
  },
})
