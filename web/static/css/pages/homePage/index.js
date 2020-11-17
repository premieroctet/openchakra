export default theme => ({
  generalWidthContainer:{
    width: '60%',
    [theme.breakpoints.down('xs')]:{
      width: '80%'
    }
  },
  bannerSize:{
    width: '60%',
    [theme.breakpoints.down('xs')]:{
      width:'80%'
    }
  },
  infoBarMainStyle:{
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBarColorText:{
    color: theme.palette.lightBlack.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    margin: 0,
    [theme.breakpoints.down('xs')]:{
      textAlign: 'center'
    }
  },
  showmoreContainer:{
    marginLeft: 5,
  },
  navbarSignIn:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
  },
  navBarlogIn:{
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight
  },
  navbarMainSytle:{
    alignItems: 'center',
    width: '80%',
    display: 'flex',
    [theme.breakpoints.down('xs')]:{
      width: '90%'
    }
  },
  navbarButtonContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center'
  },
  navabarHomepageMenu:{
    width: '100%'
  },
  navbarRegisterContainer:{
    marginRight: 5
  },
  navbarSearch: {
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
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
  navbarInput:{
    borderBottom: 'inherit',
    '&::placeholder':{
      opacity: '0.55',
      color: theme.palette.placeHolder.main,
    }
  },
  iconButton: {
    padding: 12,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main,
  },
  navbarLogoContainer:{
    width: '100%'
  },
  navbarSearchContainer:{
    width: '50%',
    marginTop: '5vh',
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }
  },
  divider: {
    height: 28,
    margin: 4,
  },
  bannerPresentationTitle:{
    fontFamily: theme.typography.title.fontFamily,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.palette.white.main,
    fontSize: theme.typography.title.fontSize,
    margin: theme.typography.title.margin,
    [theme.breakpoints.down('xs')]:{
      fontSize: '25px'
    }
  },
  bannerPresentationMainStyle:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerPresentationContainerDescription:{
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    marginBottom: '6%',
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }
  },
  bannerPresentationContainerText:{
    width: '75%'
  },
  bannerPresentationButton:{
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    fontWeight: theme.typography.whiteButtonContained.fontWeight,
    fontFamily: theme.typography.whiteButtonContained.fontFamily,
    borderRadius: theme.border.whiteButton.borderRadius,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButtonContained.padding,
    fontSize: theme.typography.whiteButtonContained.fontSize
  },
  bannerPresentationContainerIllustration:{
    display: 'flex',
    alignItems: 'center',
    width: '60%'
  },
  navbarAndBannerContainer:{
    justifyContent : 'center',
    height: '85vh',
    backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
    backgroundColor: 'rgba(207,223,252,1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  navbarAndBannerBackground:{
    width: '100%',
  },
  navbarComponentPosition:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '2%'
  },
  bannerPresentationText:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    [theme.breakpoints.down('xs')]:{
      fontSize: '15px'
    }
  },
  bannerPresentationContainer:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12vh'
  },
  mainContainerStyle:{
    justifyContent: 'center',
    marginTop: '6%',
    marginBottom: '6%'
  },
  mainNewsLetterStyle:{
    justifyContent: 'center',

  },
  categoryButton:{
    borderRadius: theme.border.whiteButton.borderRadius,
    border: theme.border.whiteButton.border,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontFamily: theme.typography.whiteButton.fontFamily,
    fontWeight: theme.typography.whiteButton.fontWeight
  },
  categoryTitle:{
    fontFamily: theme.typography.sectionTitle.fontFamily,
    fontWeight: theme.typography.sectionTitle.fontWeight,
    fontSize: theme.typography.sectionTitle.fontSize,
    margin: theme.typography.sectionTitle.margin
  },
  categoryText:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize,
    margin: theme.typography.text.margin
  },
  categoryMainContainer:{
    display: 'flex',
    flexDirection: 'column'
  },
  categoryContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  categoryLeftContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  becomeAlfredMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.padding.homePage.section.padding
  },
  becomeAlfredContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  becomeAlfredButton:{
    color: theme.palette.primary.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
  becomeAlfredTitle:{
    color: theme.palette.white.main,
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin,
  },
  becomeAlfredText:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  becomeAlfredComponent:{
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.primary.main,
  },
  ourAlfredMainStyle:{
    display: 'flex',
    flexDirection: 'column'
  },
  ourAlfredMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  ourAlfredMainHeader:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  ourAlfredTitle:{
    fontFamily: theme.typography.sectionTitle.fontFamily,
    fontWeight: theme.typography.sectionTitle.fontWeight,
    fontSize: theme.typography.sectionTitle.fontSize,
    margin: theme.typography.sectionTitle.margin
  },
  ourAlfredSubtitle:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize,
    margin: theme.typography.text.margin,
  },
  ourAlfredButton:{
    borderRadius: theme.border.whiteButton.borderRadius,
    border: theme.border.whiteButton.border,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontFamily: theme.typography.whiteButton.fontFamily,
    fontWeight: theme.typography.whiteButton.fontWeight
  },
  howItWorksComponent:{
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.yellow.main
  },
  howItWorksMainStyle:{
    padding: theme.padding.homePage.section.padding
  },
  howItWorksMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  howItWorksLeftContainer:{
    width: '30%'
  },
  howItWorksRightContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
  howItWorksRightText:{
    color: theme.palette.white.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
  },
  howItWorksLeftText:{
    color: theme.palette.white.main,
    fontSize: theme.typography.subTitle.fontSize,
    fontWeight: theme.typography.subTitle.fontWeight,
    fontFamily: theme.typography.subTitle.fontFamily,
  },
  newsLetterMainStyle:{
    padding: theme.padding.homePage.section.padding
  },
  newsLetterMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsLetterLeftContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
  newsLetterRightContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    alignItems: 'center'
  },
  newsLetterButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
  newsLetterTitle:{
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin,
  },
  newsLetterSubTitle:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  newsLetterButtonGoogle:{
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
    width: '100%'
  },
  newsLetterText:{
    color: theme.palette.black.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
  },
  newsLetterTextField:{
    width: '100%',
    marginBottom: '8%',
    [`& fieldset`]: {
      borderRadius: theme.border.textField.borderRadius,
    },
  },
  newsLetterContainer:{
    width: '100%'
  },
  generalWidthFooter:{
    width: '90%'
  },
  footerMainStyle:{
    display: 'flex',
    flexDirection: 'column',
  },
  footerMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  categoryImgContainer:{
    height: '100%',
    marginTop: '-25px',
    transform: 'rotate(-25deg)',
    [theme.breakpoints.down('xs')]:{
      margin:0
    }
  },
  categoryTextContainer:{
    marginLeft: 10,
  },
  ourAlfredImgContainer:{
    height: '100%',
    marginTop: '-25px',
    transform: 'rotate(-25deg)'
  },
  ourAlfredTextContainer:{
    marginLeft: 10,
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
  navbarMuidialogContent: {
    padding: 0,
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%',
  },
  navbarCloseButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  mainContainerStyleFooter:{
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: 'rgba(228, 228, 228, 8)'
  },
  categoryCardRoot:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryCardMedia:{
    height: '20vh',
    width: '90%',
    borderRadius: 50
  },
  categorySlideShowContainer:{
    marginTop: '3%'
  },
  slideShowContainer:{
    display: 'flex',
    alignItems: 'center',
    padding: '2%'
  },
  categoryCardBackground:{
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 50
  },
  cardPreviewLarge: {
    width: '90%',
    height: '90%',
  },
  cardPreviewContainerAvatar:{
    width: 100,
    height:100,
    position: 'relative',
    backgroundColor: 'white',
    top: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid rgba(112, 112, 112, 0.3)'
  },
  cardPreviewRatingBox:{
    display: 'flex',
    alignItems: 'center',
    margin:0,
    padding: 0
  },
  cardPreviewLabelService:{
    fontFamily: theme.typography.textLabel.fontFamily,
    fontWeight: theme.typography.textLabel.fontWeight,
    fontSize: theme.typography.textLabel.fontSize,
    margin: theme.typography.textLabel.margin
  },
  cardPreviewNameAlfred:{
    fontFamily: theme.typography.textAlfredName.fontFamily,
    fontWeight: theme.typography.textAlfredName.fontWeight,
    fontSize: theme.typography.textAlfredName.fontSize,
    margin: theme.typography.textAlfredName.margin
  },
  slideShowSectionContainer:{
    width: '100%'
  },
  cardPreviewMainStyle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  cardPreviewBoxContentContainer:{
    border: '2px solid rgba(112, 112, 112, 0.3)',
    width: '80%',
    borderRadius: 22,
    height: '15vh'
  },
  cardPreviewBoxContentPosition:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '55px'
  },
  cardPreviewContentIdentity:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%'
  },
  cardPreviewServiceContent:{
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
  navbarMenuBurgerContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  navbarAlgoliaContent:{
    flex:1,
    marginLeft: 20,
    '& .ap-input-icon':{
      display: 'none',
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
  navbarAppBar:{
    backgroundColor:'transparent',
    boxShadow: 'inherit'
  },
  navbarDatePickerContainer:{
    flex: 1,
    marginLeft: 20
  },
  navbarTextFieldService:{
    flex: 1,
    marginLeft: 20
  },
  infoBarLinkContainer:{
    paddingTop: theme.padding.infoBar.paddingTop,
    paddingBottom: theme.padding.infoBar.paddingBottom,
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    }
  },
  infoBarPicsContainer:{
    width: 15,
    height: 15,
    marginRight: 5
  },
  navbarDatePickerMain:{
    display: 'flex',
    alignItems: 'center'
  },
  navBartoolbar:{
    display: 'flex',
    flexDirection: 'column'
  },
  navbarTopContainer:{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
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
  newsLetterEmailIcon:{
    color: 'rgba(128,128,128,1)'
  },
  shomoreLink:{
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  },
})
