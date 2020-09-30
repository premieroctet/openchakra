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
    backgroundColor: 'rgba(228, 228, 228, 8)'
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
  scrollMenuTabs:{
    borderRight: `1px solid black`,
  }
})
