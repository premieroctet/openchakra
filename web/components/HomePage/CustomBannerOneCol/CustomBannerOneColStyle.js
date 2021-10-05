export default theme => ({
  howItWorksMainStyle: {
    padding: theme.padding.homePage.section.padding,
  },
  howItWorksLeftText: {
    color: theme.palette.white.main,
    fontSize: theme.typography.subTitle.fontSize,
    fontWeight: theme.typography.subTitle.fontWeight,
    fontFamily: theme.typography.subTitle.fontFamily,
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
})
