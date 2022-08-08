const Style = theme => ({
  hidesm: {
    minWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobilerow: {
    marginTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15%',
      marginBottom: 30,
    },
  },
  reservationContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  mainContainerAbout: {
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '3vh',
    },
  },
  bookingDetailContainer: {
    display: 'flex',
    width: '70%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  containerStateResa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 30,
      marginBottom: 30,
    },
  },
  mainContainerStateResa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  },
  detailsReservationContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '3%',
  },
  containerButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  groupButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '5vh',
    },
  },
  containerPhone: {
    marginTop: '3vh',
    textAlign: 'center',
    width: '100%',
  },
  
})
module.exports=Style
