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





  /***Footer**/

  mainContainerStyleFooter:{
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  generalWidthFooter:{
    backgroundColor: 'rgba(228, 228, 228, 8)',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '2vh'

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
    width: '100%',
    marginTop: '3%'
  },
  footerDividerContainer:{
    display: 'flex',
    justifyContent: 'center'
  },
  footerDivider:{
    height: 1,
    width: '100%'
  },
  footerBrandContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerBrandStyle:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  footerRgpdButtons:{
    display:'flex',
    flexDirection: 'row',
    width: '20%',
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

  /**FilterMenu**/

  scrollMenuRoot:{
    flexGrow: 1,
    backgroundColor: 'white',
  },
  scrollMenuIndicator:{
    backgroundColor: theme.palette.yellow.main
  },
  scrollMenuTab:{
    textTransform: 'initial'
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
})
