export default theme => ({
  generalWidthContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  generalWidthContainerNewsLtter: {
    width: '60%',
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    }
  },
  bannerSize: {
    width: '60%',
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    }
  },
  navbarAndBannerContainer: {
    height: '80vh',
    [theme.breakpoints.down('lg')]:{
      height: '90vh'
    },
    [theme.breakpoints.down('xs')]:{
      height: 'inherit'
    }
  },
  navbarAndBannerBackground: {
    backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
    backgroundColor: 'rgba(207,223,252,1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  navbarAndBannerBackgroundb2b: {
    backgroundColor: theme.palette.b2b.main,
  },
  navbarComponentPosition: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '2%'
  },

  bannerPresentationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh',
  },
  mainContainerStyle: {
    justifyContent: 'center',
    marginTop: '10vh',
    marginBottom: '10vh'
  },
  mainNewsLetterStyle: {
    justifyContent: 'center',
  },

  resaServiceButton: {
    color: '#F8CF61',
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
  becomeAlfredComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.primary.main,
  },
  howItWorksComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.yellow.main
  },
  howItWorksComponentB2b: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#3C4047'
  },
  generalWidthFooter: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '12vh'
    }
  },
  trustAndSecurityContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '5vh',
      marginBottom: '5vh',
      display: 'flex',
      justifyContent: 'center'
    }
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
    }
  },
  mainContainerStyleFooter: {
    justifyContent: 'center',
    backgroundColor: 'rgba(228, 228, 228, 8)'
  },
})
