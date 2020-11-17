export default theme => ({
  selectRoot:{
    whiteSpace: 'inherit'
  },
  navbarSearchContainer:{
    width: '50%',
    marginTop: '5vh',
    [theme.breakpoints.down('xs')]:{
      width: '100%',
    }
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
    marginLeft: 20
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
  divider: {
    height: 28,
    margin: 4,
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

  navbarAlgoliaPlace:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
    height: 'auto'
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
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
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
  navbarPaperWidth:{
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    width: '100%'
  },
  buttonNextRoot:{
    textTransform: 'initial',
    fontWeight:'bold',
    width: '100%',
    color:'white'
  },


  navbarRegisterContainer:{
    marginRight: 5
  },
})
