export default theme => ({
  infoBarMainStyle:{
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBarColorText:{
    color: theme.palette.text.main,
    fontSize: theme.typography.fontSize,
    lineHeight: theme.typography.lineHeight
  },
  showmoreContainer:{
    marginLeft: 5,
  },
  shomoreLink:{
    color: theme.palette.link.main,
    fontSize: theme.typography.fontSize,
    lineHeight: theme.typography.lineHeight
  },
  navbarSignIn:{
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.white.main,
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight
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
    fontFamily: theme.typographyTitle.fontFamily,
    fontWeight: theme.typographyTitle.fontWeight,
    color: theme.typographyTitle.color,
    letterSpacing: theme.typographyTitle.letterSpacing
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
    textTransform: theme.typography.textTransform,
    color: theme.typographyButton.color,
    fontWeight: theme.typographyButton.fontWeight,
    backgroundColor: theme.palette.dark.main,
    borderRadius: theme.border.buttonDiscover.borderRadius
  },
  bannerPresentationContainerIllustration:{
    display: 'flex',
    alignItems: 'center'
  }
})
