export default theme => ({
  fullContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },

  [theme.breakpoints.between('sm', 'xl')]: {
    secondContainer: {
      width: '60%',
      heigh: '100vh',
      textAlign: 'center',
    },
  },
  [theme.breakpoints.down('sm')]: {
    secondContainer: {
      display: 'none',
    },
    hrStyle: {
      display: 'none',
    },
    fullContainer: {
      flexDirection: 'column',
    },
    loginContainer: {
      width: 'inherit',
    },
  },
  hrStyle: {
    borderWidth: 0.5,
    color: 'lightgray',
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%',
  },
  genericContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  colorIcon: {
    color: 'rgba(84,89,95,0.95)',
  },
  widthTextField: {
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  newContainer: {
    padding: '5%',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  containerDialogContent: {
    width: '100%',
    height: '100%',
    marginBottom: '1.6rem',
    marginTop: '-1.6rem',
  },
  titleRegister: {
    textAlign: 'center',
    margin: '0px auto 1.6rem',
    fontSize: '1.6rem',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  flexContainerPics: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
