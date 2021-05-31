export default theme => ({
  navbarSearchContainer:{
    width: '50%',
    marginTop: '5vh',
    [theme.breakpoints.down('lg')]:{
      width: '50%',
    },
    [theme.breakpoints.down('sm')]:{
      width: '90%',
    },
    [theme.breakpoints.down('xs')]:{
      cursor: 'pointer',
      width: '100%',
    },
  },
  hiddenXLandLG:{
    [theme.breakpoints.up('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.up('lg')]:{
      display: 'none'
    }
  },
  navbarSearchContainerB2B:{
    width: '40%',
    marginTop: '5vh',
    [theme.breakpoints.down('lg')]:{
      width: '50%',
    },
    [theme.breakpoints.down('md')]:{
      width: '70%',
    },
    [theme.breakpoints.down('sm')]:{
      width: '90%',
    },
    [theme.breakpoints.down('xs')]:{
      cursor: 'pointer',
      width: '100%',
    },
  },
  fitlerMenuLogged:{
    overflow: 'inherit',
    textOverflow: 'inherit',
    whiteSpace: 'inherit'
  },
  navbarSearch: {
    padding: '10px 14px 10px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
  },

  iconButton: {
    color: theme.palette.white.main,
  },

  navbarFormControlAddress: {
    width: '100%'
  },
  navbarRootTextFieldWhere:{
    width: '100%',
    '& .algolia-places':{
      height: '100%',
      color:'rgba(0, 0, 0, 0.87)',
      width: '100%',
      alignItems: 'center',
      display: 'inline-flex',
      lineHeight: '1.1876em',
      boxSizing: 'border-box',
      position: 'relative',
      fontWeight: 400,
      fontSize: '1rem',
    },
    '& input':{
      border: 0,
      padding: '6px 0 7px',
      height: '1.1876em',
      opacity: '0.65',
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxSizing: 'content-box'
    },
    '& .ap-input-icon':{
      display: 'none',
    }
  },
  navbarRootTextFieldWhereP:{
    width: '100%',
    '& .algolia-places':{
      height: '100%',
      color:'rgba(0, 0, 0, 0.87)',
      width: '100%',
      alignItems: 'center',
      display: 'inline-flex',
      lineHeight: '1.1876em',
      position: 'relative',
      fontWeight: 400,
      fontSize: '1rem',
    },
    '& input':{
      padding: '18.5px 14px',
      height: '100%',
      opacity: '0.65',
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    '& .ap-input-icon':{
      display: 'none',
    }
  },

  navbarMainSytle:{
    alignItems: 'center',
    width: '70%',
    display: 'flex',
    [theme.breakpoints.down('lg')]:{
      width: '95%'
    },
  },
  navbarMainSytleB2B:{
    width: '95%',
  },

  navbarLogoContainer:{
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]:{
      display: 'none'
    }
  },
  navbarLogoContainerP:{
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    }
  },

  navabarHomepageMenu:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    }
  },
  navbarHomepageMenuB2B:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      display: 'none'
    }
  },
  navbarMenuBurgerContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  navbarMenuBurgerContainerB2B:{
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    }
  },
  navbarTabRoot:{
    opacity: 'inherit',
    color: theme.palette.white.main,
    fontWeight:' bold',
    textTransform: 'initial',
    transition: '0.3s',
    '&:hover':{
      color: 'rgba(255, 255, 142, 1)'
    }
  },
  navbarTabRootB2b:{
    opacity: 'inherit',
    color: theme.palette.white.main,
    fontWeight:' bold',
    textTransform: 'initial',
    transition: '0.3s',
    minWidth: 'inherit',
    '& span':{
      whiteSpace: 'nowrap'
    },
    '&:hover':{
      color: 'rgb(176, 205, 200)'
    }
  },

  logoMyAlfred:{
    height: 64,

  },
  hiddenOnlyXs:{
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  hiddenOnMobile:{
    width: '100%',
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },



  },


  navbarButtonContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  navbarButtonContainerP:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navbarButtonContainerPB2B:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
  },
  navbarButtonContainerB2B:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
  },
  navBarlogIn:{
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight
  },
  navBarlogInB2B:{
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight,
    '&:hover':{
      color: 'rgb(176, 205, 200)',
    }
  },
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important',
    },
  },

  navbarMuidialogContent: {
    padding: 0,
  },

  navbarWidthLoginContent:{
    display: 'flex',
    justifyContent: 'center',
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%',
  },
  navbarSignIn:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
  },
  navbarSignInB2B:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,

    '&:hover':{
      color: 'rgb(176, 205, 200)',
      border: '3px solid rgb(176, 205, 200)',
    }
  },
  navbarSignInB2BContained:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.b2b.main,
    backgroundColor: theme.palette.white.main,
    '&:hover':{
      color: 'rgb(176, 205, 200)',
      border: '3px solid rgb(176, 205, 200)',
    }
  },
  textFieldMobilSearchInput:{
    width: '90%'
  },
  buttonNextRoot:{
    textTransform: 'initial',
    fontWeight:'bold',
    width: '100%',
    color:'white'
  },
  drawerStyle:{
    '& .MuiDrawer-paperAnchorBottom':{
      height: '50%'
    }
  },
  navbarRegisterContainer:{
    marginRight: 5
  },

  navbarSearchContainerSearchPage:{
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh',

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

  /**Ifsearchpage**/
  navbarSearchContainerSearchP:{
    width: '100%',
  },

  navbarMainSytleP:{
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  navbarAppBar:{
    boxShadow: 'inherit'
  },
  navBartoolbarP:{
    marginTop: '1%',
    marginBottom: '1%',
    [theme.breakpoints.down('sm')]:{
      padding: 0
    }
  },
  navBartoolbar:{
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  dialogNavbarMobileFilter:{
    minWidth: '100%'
  },
  rootIconButton:{
    paddingTop:0,
    paddingBottom: 0
  },
  navbarPaperWidth:{
    width: 600
  },
  buttonService:{
    width: '100%',
    textTransform:'initial',
    border: '3px solid #353A51',
    borderRadius: theme.border.button.borderRadius,
  },
  buttonLoginB2b:{
    width: '100%',
    textTransform:'initial',
    border: '3px solid #353A51',
    borderRadius: theme.border.button.borderRadius,
    backgroundColor: '#353A51',
    color:'white',
    '& :hover':{
      color:'#353A51',
    }
  },
  buttonRegisterB2b:{
    width: '100%',
    textTransform:'initial',
    border: '3px solid rgb(176, 205, 200)',
    borderRadius: theme.border.button.borderRadius,
    backgroundColor: 'rgb(176, 205, 200)',
    color:'white',
    '& :hover':{
      color:'rgb(176, 205, 200)',
    }
  },
  filterMenuFocused:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.white.main
  },
})
