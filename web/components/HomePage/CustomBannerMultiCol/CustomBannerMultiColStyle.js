export default theme => ({
  howItWorksMainStyle: {
    padding: theme.padding.homePage.section.padding,
  },
  howItWorksRightContainer: {
    textAlign: 'center',
  },
  howItWorksRightText: {
    color: theme.palette.white.main,
    fontSize: theme.typography.text.fontSize,
    fontWeight: theme.typography.text.fontWeight,
    fontFamily: theme.typography.text.fontFamily,
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
