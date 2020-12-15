export default theme => ({
  ResaServiceMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '3%'
  },
  becomeAlfredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  becomeAlfredTitle: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin,
  },
  becomeAlfredText: {
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  resaServiceButton: {
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding,
  },
})
