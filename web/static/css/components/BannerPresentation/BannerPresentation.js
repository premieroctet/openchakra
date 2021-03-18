export default theme => ({
  bannerPresentationMainStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerPresentationContainerDescription: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down('lg')]:{
      width: '100%'
    },
    [theme.breakpoints.down('xs')]:{
      textAlign: 'center'
    }
  },
  bannerPresentationTitle: {
    color: theme.palette.white.main,
    margin: theme.typography.title.margin,
    [theme.breakpoints.down('xs')]:{
      fontSize: '25px'
    }
  },
  bannerPresentationContainerText: {
    width: '75%',
    [theme.breakpoints.down('sm')]:{
      width: '100%',

    }
  },
  bannerPresentationText: {
    color: theme.palette.white.main,
    [theme.breakpoints.down('xs')]:{
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
