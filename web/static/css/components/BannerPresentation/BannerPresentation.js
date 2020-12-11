export default theme => ({
  bannerPresentationMainStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerPresentationContainerDescription: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    marginBottom: '6%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },

  },
  bannerPresentationTitle: {
    fontFamily: theme.typography.title.fontFamily,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.palette.white.main,
    fontSize: theme.typography.title.fontSize,
    margin: theme.typography.title.margin,
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px'
    }
  },
  bannerPresentationContainerText: {
    width: '75%'
  },
  bannerPresentationText: {
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px'
    }
  },
  bannerPresentationButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    fontWeight: theme.typography.whiteButtonContained.fontWeight,
    fontFamily: theme.typography.whiteButtonContained.fontFamily,
    borderRadius: theme.border.whiteButton.borderRadius,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButtonContained.padding,
    fontSize: theme.typography.whiteButtonContained.fontSize
  },
})
