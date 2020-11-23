export default theme => ({
  footerMainStyle:{
    display: 'flex',
    flexDirection: 'column',
  },
  footerMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]:{
      justifyContent: 'start'
    }
  },
  footerSection:{
    display: 'flex',
    flexDirection: 'column'
  },
  footerSocialSection:{
    display:'flex',
    flexDirection: 'column',
    width: '90%',
    marginTop: '3%',
    alignItems: 'end',
    [theme.breakpoints.down('xs')]:{
      alignItems: 'start'
    }

  },
  footerDividerContainer:{
    display: 'flex',
    marginTop:'3vh',
    marginBottom: '3vh',
    justifyContent: 'center'
  },
  footerDivider:{
    height: 1,
    width: '80%'
  },
  footerTitileSection:{
    fontFamily: theme.typography.sectionTitle.fontFamily
  },
  footerLink:{
    fontFamily: theme.typography.text.fontFamily
  },
  footerBrandContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh',
      marginTop: '5vh',
    }
  },
  footerBrandStyle:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    [theme.breakpoints.down('xs')]:{
      width: 'inherit',
      flexDirection: 'row',
    },
    [theme.breakpoints.down('lg')]:{
      width: '100%'
    }
  },
  footerRgpdButtons:{
    display:'flex',
    flexDirection: 'row',
    width: '30%',
    justifyContent : 'space-between',
    [theme.breakpoints.down('xs')]:{
      width: '100%',
      flexDirection: 'column',
      marginBottom: '15vh',
      alignItems: 'end'
    },
    [theme.breakpoints.down('lg')]:{
      width: '50%'
    }
  },
  footerLawContainer:{
    [theme.breakpoints.down('lg')]:{
      width: '50%'
    }
  },
  footerSocialContainer:{
    display: 'flex',
    flexDirection: 'row'
  },
  footerLinkInfoContainer:{
    [theme.breakpoints.down('xs')]:{
      marginTop: '2vh',
      marginBottom: '2vh'
    }
  }
})
