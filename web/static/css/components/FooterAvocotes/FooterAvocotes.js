export default theme => ({
  mainContainer: {
    backgroundColor: '#525252',
    padding: '5%',
    color: 'white',
  },
  containerLogo: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
})
