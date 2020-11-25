export default theme => ({
  navbarSearchContainer:{
    width: '50%',
    marginTop: '5vh',
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
    padding: 14,
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
    padding: 12,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main,
  },
  navbarCloseButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  navbarAddressContainer: {
    marginLeft: 20,
    width: '50%'
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
    '& .ap-input-icon':{
      display: 'none',
    }
  },
  navbarRootTextFieldWhere:{
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]:{
      width: '90%',
      borderRadius: 4
    },
    "& .MuiFormLabel-root": {
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
  buttonIgnore:{
    textTransform: 'initial',
    color: 'rgba(39,37,37,35%)'
  },
  navbarAlgoliaPlace:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
    height: 'auto',
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
    [theme.breakpoints.down('xs')]:{
      width: '95%'
    }
  },
  navbarAppBar:{
    backgroundColor:'transparent',
    boxShadow: 'inherit'
  },

  navBartoolbar:{
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  navbarTopContainer:{
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  navbarLogoContainer:{
    width: '100%'
  },

  navabarHomepageMenu:{
    width: '100%'
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

  navbarMenuBurgerContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  navbarButtonContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center'
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
  navbarSearchP: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
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
  navbarAppBarP:{
    boxShadow: 'inherit'
  },
  navBartoolbarP:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },
  navbarTopContainerP:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center'
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
  }
})
