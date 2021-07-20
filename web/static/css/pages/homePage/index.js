export default theme => ({
  generalWidthContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  generalWidthContainerNewsLtter: {
    width: '60%',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
  },
  bannerSize: {
    width: '60%',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
  },
  navbarAndBannerContainer: {
    height: '80vh',
    [theme.breakpoints.down('lg')]: {
      height: '90vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'inherit',
    },
  },
  navbarAndBannerBackground: {
    backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  navbarAndBannerBackgroundb2b: {
    backgroundColor: theme.palette.b2b.main,
  },
  navbarComponentPosition: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '2%',
  },

  bannerPresentationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh',
  },
  mainContainerStyle: {
    justifyContent: 'center',
    marginTop: '10vh',
    marginBottom: '10vh',
  },
  mainNewsLetterStyle: {
    justifyContent: 'center',
  },
  becomeAlfredComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.primary.main,
  },
  howItWorksComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.secondary.main,
  },
  howItWorksComponentB2b: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#3C4047',
  },
  generalWidthFooter: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '12vh',
    },
  },
  trustAndSecurityContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '5vh',
      marginBottom: '5vh',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  trustAndSecurityComponent: {
    padding: '2vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5vh',
      marginBottom: '5vh',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '90%',
    },
  },
  mainContainerStyleFooter: {
    justifyContent: 'center',
    backgroundColor: 'rgba(228, 228, 228, 8)',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  infoBarContainer: {
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  newsLetterContainer: {
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  hideAndShowTrustAndSecurity: {
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },

  },
  mobileNavBarContainer: {
    position: 'fixed',
    bottom: '3%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.only('lg')]: {
      display: 'none',
    },
  },
})
