export default theme => ({
  bannerContainer: {
    height: '55vh',
    //backgroundImage: 'url("../../../static/photo-1538342014732-212dc8f76863-min.jpeg")',
    marginTop: 56,
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
    top: '35%',
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
})
