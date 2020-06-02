export default theme => ({
  fullContainer: {
    backgroundImage: 'url(../static/background/connexion_inscription.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat:'no-repeat',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'top',
    flexDirection: 'column',
  },
  signupContainer: {
    backgroundColor: 'rgba(0,0,0, 0.15)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    alignItems: 'center',
    height: '180vh',
    flexDirection: 'column',
    position: 'absolute',
    top: '82%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
  },
  card: {
    //padding: '1.5rem 3rem',
    maxWidth: 600,
    marginTop: 170,
    boxShadow: '0px 2px 66px -37px rgba(10,10,10,0.65)',
    [theme.breakpoints.down("xs")]:{
      marginTop: 250
    }
  },
  datenaissance: {
    marginTop: 20,
    width: '100%'
  },
  banner: {
    marginBottom: 25,
    backgroundColor: '#2FBCD3',
    height: 80,

  },
  newContainer: {
    padding: 10,
  },
  title: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 22,
    letterSpacing: 1,
  },
  country: {
    width: '100%'
  },

  birthday:{
    height:40,
    fontSize: '0.9rem'
  }

})
