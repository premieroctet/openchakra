export default theme => ({

  /**InfoBar**/

  infoBarMainStyle:{
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBarLinkContainer:{
    paddingTop: theme.padding.infoBar.paddingTop,
    paddingBottom: theme.padding.infoBar.paddingBottom,
    alignItems: 'center',
    display: 'flex'
  },
  infoBarColorText:{
    color: theme.palette.lightBlack.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    margin: 0
  },
  infoBarPicsContainer:{
    width: 15,
    height: 15,
    marginRight: 5
  },
  showmoreContainer:{
    marginLeft: 5,
  },
  shomoreLink:{
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  },

  /**NavBar**/
  navbarCloseButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  navbarSearchContainer:{
    width: '100%',
  },
  navbarSearch: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
  },
  navbarRootTextField: {
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
    }
  },
  divider: {
    height: 28,
    margin: 4,
  },
  navbarAddressContainer:{
    marginLeft: 20,
    width: '50%'
  },
  navbarFormControlAddress:{
    width: '100%'
  },
  navbarAlgoliaContent:{
    flex:1,
    '& .ap-input-icon':{
      display: 'none',
    }
  },
  navbarAlgoliaPlace:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    padding: 0,
  },
  navbarDatePickerMain:{
    display: 'flex',
    alignItems: 'center'
  },
  navbarDatePickerContainer:{
    flex: 1,
  },
  inputDatePicker:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
  },
  iconButton:{
    padding: 12,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main,
  },
  navbarMainSytle:{
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  navbarAppBar:{
    boxShadow: 'inherit'
  },
  navBartoolbar:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },
  navbarTopContainer:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
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
  navbarRegisterContainer:{
    marginRight: 5
  },
  navbarSignIn:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
  },
  navbarMuidialogContent: {
    padding: 0,
  },



  /***Footer**/

  mainContainerStyleFooter:{
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: 'rgba(228, 228, 228, 8)',
    position: 'relative',
    bottom: 0,
    display: 'flex'
  },
  generalWidthFooter:{
    width: '80%'
  },
  footerMainStyle:{
    display: 'flex',
    flexDirection: 'column',
  },
  footerMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerSection:{
    display: 'flex',
    flexDirection: 'column'
  },
  footerSocialSection:{
    display:'flex',
    flexDirection: 'row-reverse',
    width: '90%',
    marginTop: '3%'
  },
  footerDividerContainer:{
    display: 'flex',
    justifyContent: 'center'
  },
  footerDivider:{
    height: 1,
    width: '80%'
  },
  footerBrandContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerBrandStyle:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%'
  },
  footerRgpdButtons:{
    display:'flex',
    flexDirection: 'row',
    width: '30%',
    justifyContent : 'space-between'
  },
  footerTitileSection:{
    fontFamily: theme.typography.sectionTitle.fontFamily
  },
  footerLink:{
    fontFamily: theme.typography.text.fontFamily
  },
  footerText:{
    fontFamily: theme.typography.text.fontFamily
  },
})
