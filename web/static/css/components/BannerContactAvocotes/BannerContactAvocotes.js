export default theme => ({
  mainContainer: {
    backgroundImage: 'url(../../../static/assets/img/avocotes/banner.jpeg)',
    width: '100%',
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
  },
  blur: {
    backgroundColor: 'rgba(82,82,82,0.7)',
    width: '100%',
    height: '100%',
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
    alignItems: 'center',
    borderRadius: 40,
    width: 500,
    padding: 10,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',

    },
  },
})
