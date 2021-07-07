export default theme => ({
  mainContainer: {
    backgroundImage: 'url(../../../static/assets/icon/banneProfil.svg)',
    width: '100%',
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  containerFakeButton: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 40,
    width: 500,
    padding: 16,
  },
})
