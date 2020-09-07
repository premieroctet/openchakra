export default theme => ({
  bannerContainer: {
    height: '55vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: 56,
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'white',
    fontSize: 70,
    fontFamily: 'Signatra',
  },
  statusMedia: {
    position: 'absolute',
    top: '10%',
    right: '5%',
  },
  chipStyle: {
    backgroundColor: '#f87280',
    color: 'white',
    fontWeight: 'bold',
    border: '2px solid white',
  },
  margin: {
    height: 'auto',
  },
})
