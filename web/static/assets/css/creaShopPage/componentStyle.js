export default theme => ({
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  mainContainer: {
    width: '100%',
  },
  containerBooking: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    alignItems: 'center',
  },
  containerAlfred: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },

  },
  hrStyle: {
    width: '90%',
  },
  containerPosition: {
    display: 'flex',
  },
  contentPosition: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    width: '95%',
  },
  contentWelcomePosition: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1%',
    width: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  texfieldContent: {
    width: '100%',
    marginLeft: 30,
  },
  imgFatCastor: {
    width: 100,
  },
  alignCheckbox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  containerPositionWelcome: {
    display: 'flex',
    marginLeft: 30,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  editCancelButton: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  containerTitle: {
    [theme.breakpoints.down('xs')]: {
      width: '60%',
    },
  },
  texfieldContentWelcomedMessage: {
    width: '100%',
    marginLeft: 30,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  responsiveContentWelcomePosition: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1%',
    width: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  responsiveImgContent: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});
