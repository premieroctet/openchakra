export default theme => ({
  infoBarMainStyle: {
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBarLinkContainer: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center'
    }
  },
  infoBarColorText: {
    color: theme.palette.lightBlack.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    margin: 0
  },
  infoBarPicsContainer: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  showmoreContainer: {
    marginLeft: 5,
  },
  shomoreLink: {
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  },
})
