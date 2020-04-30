export default theme => ({
  bannerContainer: {
    height: '55vh',
    backgroundPosition: "center",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    marginTop: 75
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatar: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: '15%',
    left: '0%',
    right: '0%',
    margin: 'auto',
    display: 'block',
  },
  avatarLetter:{
    top: '15%',
    left: '0%',
    right: '0%',
    height: 150,
    width: 150,
    margin: 'auto',
    fontSize: "xxx-large",

  },
  itemAvatar: {
    flexDirection: 'column',
  },
  itemShare: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: '0%',
    right: '0%',
    margin: 'auto',
    fontSize: 30,
  },
  textBio: {
    color: 'white',
    textAlign: 'center',
  },
  itemDispo: {
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textDispo: {
    color: 'white',
  },
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: 'white',
    border: '2px solid #000',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  bannerPics:{
    position:"absolute",
    left:'3%',
    top:'20%',
    zIndex:502,

  }
})
