export default theme => ({
  navbarSearchContainer:{
    width: '50%',
    marginTop: '5vh',
    [theme.breakpoints.down('lg')]:{
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
    padding: '14px 14px 14px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
  },
  navbarTextFieldService:{
    flex: 1,
  },
  navbarRootTextField: {
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus':{
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused':{
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    },
    '& div':{
      width:'100%'
    }
  },
  iconButton: {
    color: theme.palette.white.main,
  },
  navbarCloseButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  divider: {
    height: 28,
    margin: 4,
  },
  navbarFormControlAddress: {
    width: '100%'
  },
  navbarAlgoliaContent:{
    flex:1,
    marginLeft: 20,
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
  buttonIgnore:{
    textTransform: 'initial',
    color: 'rgba(39,37,37,35%)'
  },
  navbarAlgoliaPlace:{
    border: 0,

    [theme.breakpoints.down('xs')]:{
      padding: '18.5px 14px',
    }
  },
  navbarDatePickerMain:{
    display: 'flex',
    alignItems: 'center'
  },
  navbarDatePickerContainer:{
    flex: 1,
    marginLeft: 20
  },
  navbarRootTextFieldWhen:{
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus':{
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused':{
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    }
  },
  navbarMainSytle:{
    alignItems: 'center',
    width: '80%',
    display: 'flex',
    [theme.breakpoints.down('md')]:{
      width: '95%'
    },
  },
  navbarTopContainer:{
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      width: '100%'
    }
  },

  navbarLogoContainer:{
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
  navbarMenuBurgerContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  navbarTabRoot:{
    textTransform: 'inherit',
    opacity: 'inherit',
    color: theme.palette.white.main,
    fontWeight: theme.typography.buttonLink.fontWeight,
    fontSize: theme.typography.buttonLink.fontSize,
    '&:hover':{
      borderBottom: '2px solid rgba(255,255,255,1)'
    }
  },
  inputDatePicker:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
  },
  logoMyAlfred:{
    height: 64,

  },


  navbarButtonContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '20%',
    alignItems: 'center',
  },
  navbarButtonContainerP:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      flexDirection: 'inherit',
      width: '40%'
    }
  },
  navBarlogIn:{
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight
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
  navbarRootTextFieldP: {
    marginLeft: 20,
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    },
    '& div':{
      width:'100%'
    }
  },
  navbarRootTextFieldWhereP:{
    flex: 1,
    marginLeft: 20,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    },
    '& div':{
      width:'100%'
    }
  },
  navbarRootTextFieldWhenP:{
    width: '100%',
    marginLeft: 20,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus':{
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused':{
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    }
  },
  navbarAlgoliaContentP:{
    flex:1,
    '& .ap-input-icon':{
      display: 'none',
    }
  },
  navbarDatePickerContainerP:{
    flex: 1,
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
  navbarTopContainerP:{
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      width: '100%'
    }

  },
  inputDatePickerP:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
  },
  modalMobileSearchBarInputTextField:{
    width: '100%'
  },
  modalMobileSearchBartTextFieldWhereP:{
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    },
    '& div':{
      width:'100%'
    }
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
  }
})
