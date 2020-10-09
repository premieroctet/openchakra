export default theme => ({
  bigContainer: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  media: {
    height: '250px!important',
    position: 'relative',
    objectFit: 'cover',
  },

  separatorBlue: {
    width: '150px',
  },
  containerTitle: {
    marginTop: 70,
    [theme.breakpoints.down('xs')]: {
      marginTop: 200,
    },
  },

  containerCardPreview: {
    padding: 5,
  },
  paddingResponsive: {
    [theme.breakpoints.down('xs')]: {
      padding: '0 !important',
      marginBottom: 20,
    },
  },









  /***** new css***/
  navbarSignIn:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
  },
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important',
    },
  },
  navbarCloseButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  navbarMuidialogContent: {
    padding: 0,
  },
  navbarPaperWidth:{
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%',
  },
  navbarWidthLoginContent:{
    display: 'flex',
    justifyContent: 'center',
  },
  navbarRegisterContainer:{
    marginRight: 5
  },
  navBarlogIn:{
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight
  },
  navbarMainSytle:{
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  navbarButtonContainer:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center'
  },
  navbarSearch: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
  },
  navbarRoot: {
    marginLeft: 20,
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
  },
  navbarInput:{
    '&::placeholder':{
      opacity: '0.55',
      color: theme.palette.placeHolder.main,
    }
  },
  searchNavbarComponentPosition:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  infoBarMainStyle:{
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBartoolbar:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  navbarAppBar:{
    boxShadow: 'inherit'
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
  mainContainerStyleFooter:{
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: 'rgba(228, 228, 228, 8)',
    position: 'relative',
    bottom: 0,
    display: 'flex'
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
  footerTitileSection:{
    fontFamily: theme.typography.sectionTitle.fontFamily
  },
  footerLink:{
    fontFamily: theme.typography.text.fontFamily
  },
  footerText:{
    fontFamily: theme.typography.text.fontFamily
  },
  searchFilterMenuPosition:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  searchFilterMenuContent:{
    width: '80%'
  },
  scrollMenuRoot:{
    flexGrow: 1,
    backgroundColor: 'white',
  },
  infoBarPicsContainer:{
    width: 15,
    height: 15,
    marginRight: 5
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
  filterMenuDivierContainer:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%'
  },
  filterMenuDividerStyle:{
    height: 1,
    width: '100%'
  },
  scrollMenuTab:{
    textTransform: 'initial'
  },
  filterMenuTitleContainer:{
    marginTop: '5%',
    textAlign: 'center'
  },
  filterMenuChipContainer:{
    marginTop: '2%',
    display: 'flex',

  },
  searchMenuScrollMenuContainer:{
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  searchScrollmenuContainer:{
    width: '90%'
  },
  searchMainConainer:{
    marginTop: '2%'
  },
  searchContainerHeader:{
    display: 'flex',
    width: '80%'
  },
  searchMainContainerHeader:{
    display: 'flex',
    justifyContent: 'center',
  },
  searchSecondFilterContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  searchSecondFilterContainerLeft:{
    marginRight: 20
  },
  searchMainContainerResult:{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '4%'

  },
  cardServiceFlexContainer:{
    display: 'flex',
    justifyContent :'center',
    position: 'relative'
  },
  searchContainerDisplayResult:{
    width: '70%'
  },
  cardServicePicsContainer:{
    width: '100%',
    height: '20vh'
  },
  cardServiceBackgroundPics:{
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20
  },
  cardServiceMainStyle:{
    width: '80%',
    marginTop: '8%',
    marginBottom: '5%',
  },
  cardServicePaper:{
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '40vh'
  },
  cardServiceScoreAndButtonContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardServiceRatingContainer:{
    display: 'flex',
    flexDirection: 'row',
    width: '50%'
  },
  cardServicePlaceContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardServiceButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    width: '100%'
  },
  cardServiceButtonContainer:{
    width: '50%'
  },
  cardPreviewRatingBox:{
    display: 'flex',
    alignItems: 'center',
    margin:0,
    padding: 0
  },
  cardServiceLabelService:{
    fontFamily: theme.typography.textLabel.fontFamily,
    fontWeight: theme.typography.textLabel.fontWeight,
    fontSize: theme.typography.textLabel.fontSize,
    margin: theme.typography.textLabel.margin
  },
  cardServiceBoxRatingDisplay:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardServiceRating:{
    marginRight: '20%',
    marginLeft: '20%'
  },
  cardServicePlaceLogo:{
    marginRight: '3%'
  },
  cardServiceChipName:{
    position: 'absolute',
    bottom:0,
    left:0
  },
  cardServiceChip:{
    backgroundColor: theme.palette.white.main,
  },
  stylecardServiceDistance:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navbarAddressContainer:{
    marginLeft: 20,
    width: '50%'
  },
  navbarFormControlAddress:{
    width: '100%'
  },
  navbarSearchContainer:{
    width: '100%',
  },
  navbarLogoContainer:{
    width: '100%'
  },
  navbarDatePickerMain:{
    display: 'flex',
    alignItems: 'center'
  },
  shomoreLink:{
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  },
  showmoreContainer:{
    marginLeft: 5,
  },
  navbarTopContainer:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center'
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
  scrollMenuIndicator:{
    backgroundColor: theme.palette.yellow.main
  },
  searchFilterRightContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchFilterRightLabel:{
    marginRight: 10
  },
  searchSelectPadding:{
    paddingRight: '34px !important'
  },
  filterMenuTitle:{
    fontFamily: theme.typography.subTitle.fontFamily
  },
  filterMenuDescription:{
    fontFamily: theme.typography.fontFamily
  },
  filterMenuAccordionTitle:{
    display: 'flex',
    justifyContent: 'center'
  },
  filterMenuAccordionContainer:{
    borderRadius: '32px !important'
  },
  searchNeedHelpMainStyle:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  searchNeedHelpMainContainer:{
    width: '80%'
  },
  searchSearchByHastagMainStyle:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  searchSearchByHastagContainer:{
    width: '80%'
  },
  cardServiceInfoPaper:{
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '40vh'
  },
  cardServiceInfoContent:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  searchResultMessage:{
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  searchResultMessageContent:{
    width: '80%'
  },




  filterMenuContainerStatut:{
    borderRadius: '15px',
    backgroundColor: '#2FBCD3',
    boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset',
    cursor: 'pointer',
    height: '45px',
  },
  filterMenuTextStatus:{
    color: 'white',
  },
  filterMenuTextNotFocused:{
  },
  filterMenuContentMainStyle:{
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    height: 'auto',
    zIndex: 1,
    position: 'relative',
  },
  filterMenuContentMainStyleDateFilter:{
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    height: 'auto',
    zIndex: 1,
    position: 'relative',
    padding: 10,
    width: '140%'
  },
  filTerMenuStatusMainStyleFilterDate:{
    width: '15%',
    marginLeft: '2%'
  },
  filterMenuFocused:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.white.main
  },
  filterMenuStatusNotFocused:{
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    cursor: 'pointer',
    height: 45,
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterMenuDateFocused:{
    borderRadius: '15px',
    backgroundColor: '#2FBCD3',
    boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset',
    cursor: 'pointer',
    height: 45,

  },
  filTerMenuStatusMainStyleFilter:{
    width: '15%'
  },
  filterMenuTextFocused:{
    color: theme.palette.white.main
  },
  filterMenuControlLabel:{
    margin: 0,
    verticalAlign: 'inherit'
  },
  filterMenuDateFilterButtonContainer:{
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  navbarMenuBurgerContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  searchLoadingContainer:{
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center'
  },
  cardServiceInfoTitle:{
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },
  cardServiceInfoText:{
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  }
})
