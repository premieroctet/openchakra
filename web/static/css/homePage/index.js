export default theme => ({
  generalWidthContainer:{
    width: '80%'
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
    fontFamily: theme.typography.infoBar.fontFamily
  },
  showmoreContainer:{
    marginLeft: 5,
  },
  shomoreLink:{
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily

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
  input: {
    marginLeft: 20,
    flex: 1,

  },
  iconButton: {
    padding: 12,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main,
  },
  navbarLogoContainer:{
    width: '25%'
  },
  navbarSearchContainer:{
    width: '50%',
    marginTop: 100,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  bannerPresentationTitle:{
    fontFamily: theme.typography.title.fontFamily,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.typography.title.color,
    fontSize: theme.typography.title.fontSize,
    margin: theme.typography.title.margin,
  },
  bannerPresentationMainStyle:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bannerPresentationContainerDescription:{
    display: 'flex',
    flexDirection: 'column',
    width: '25%'
  },
  bannerPresentationContainerText:{
    width: '75%'
  },
  bannerPresentationButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
  bannerPresentationContainerIllustration:{
    display: 'flex',
    alignItems: 'center'
  },
  navbarAndBannerContainer:{
    justifyContent : 'center',
    height: '85vh'
  },
  navbarAndBannerBackground:{
    backgroundColor: '#4C89C4',
    width: '100%'
  },
  navbarComponentPosition:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  bannerPresentationText:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  bannerPresentationContainer:{
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center'
  },
  ourServicesTitle:{
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    fontSize: theme.typography.subTitle.fontSize,
    margin: theme.typography.subTitle.margin,
  },
  ourServicesText:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  ourServicesButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
  ourServicesRightContainer:{
    display: 'flex',
    alignItems:'center',
    flexDirection: 'column'
  },
  ourServicesMainStyle:{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  mainContainerStyle:{
    justifyContent: 'center',
    marginTop: '2%'
  },
  ourDescriptionMainStyle:{
    padding: theme.padding.homePage.section.padding,
  },
  ourDescriptionMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ourDescriptionContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
  ourDescriptionContainerText:{
    color: theme.palette.white.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
  },
  ourDescriptionContainerSubText:{
    color: theme.palette.white.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
    letterSpacing: theme.typography.letterSpacing
  },
  ourDescriptionComponentContainer:{
    width: '100%',
    backgroundColor: theme.palette.yellow.main,
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
    fontSize: theme.typography.text.fontSize
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
  }
})
