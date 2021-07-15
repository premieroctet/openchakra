export default theme => ({
  mainContainer: {
    margin: 0,
    width: '100%',
    paddingRight: '10%',
    paddingLeft: '10%',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '5%',
      paddingLeft: '5%',
    },
  },
  containerText: {
    margin: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  secondText: {
    marginTop: '-70px',
    [theme.breakpoints.down('md')]: {
      marginTop: 'initial',
    },
  },
  dividerContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  titleSection: {
    color: 'black',
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: '-50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  containerForm: {
    backgroundColor: '#F7F7F7',
    borderRadius: '5%',
  },
  mainContainerForm: {
    display: 'flex',
    justifyContent: 'center',
  },
})
