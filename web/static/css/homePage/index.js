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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
  },
  navBarlogIn:{
    textTransform: theme.typography.textTransform,
  },
  navbarMainSytle:{
    justifyContent: 'center',
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
    padding: '2%',
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
    color: theme.palette.white.main
  },
  navbarLogoContainer:{
    width: '25%'
  },
  navbarSearchContainer:{
    width: '50%'
  },
  divider: {
    height: 28,
    margin: 4,
  },
})
