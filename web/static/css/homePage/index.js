export default theme => ({
  infoBarMainStyle:{
    backgroundColor: theme.palette.backgroundGrey.main,
    display: 'flex',
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
  }
})
