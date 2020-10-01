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
    width: '25%'
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
  toolbar:{
    display: 'flex',
    justifyContent: 'space-evenly'
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
    marginLeft: 20,
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
    width: '90%'
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
    fontWeight: theme.typography.infoBar.fontWeight
  },
  searchDivierContainer:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2%'
  },
  searchDividerStyle:{
    height: 1,
    width: '100%'
  },
  scrollMenuTabs:{
    alignItems: 'center'
  },
  scrollMenuButtons:{

  },
  filterMenuTitleContainer:{
    marginTop: '2%'
  },
  filterMenuChipContainer:{
    marginTop: '2%'
  },
  filterMenuScrollMenuContainer:{
    marginTop: '2%'
  },
  searchMainConainer:{
    marginTop: '2%'
  },
  searchContainerHeader:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%'
  },
  searchMainContainerHeader:{
    display: 'flex',
    justifyContent: 'center',
  },
  searchSecondFilterContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    justifyContent: 'center'
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
  cardServiceAvatarContainer:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  cardServiceAvatar:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  stylecardServiceDistance:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
})
