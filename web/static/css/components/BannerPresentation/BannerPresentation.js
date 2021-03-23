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
    fontWeight: 700,
    letterSpacing: '-0.0415625em',
    lineHeight: 1.25,
    color:'#FFFFFF',
    displa: 'flex',
    flexDirection:'column',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]:{
      fontSize: '25px'
    }
  },
  subtitleSpan:{
    fontSize: '60px',
    fontWeight: 900,
    lineHeight: '1em',
    display: 'block'
  },
  titleSpan:{
    fontSize: '20px',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '6.5px',
    display: 'block'
  },
  bannerPresentationText: {
    color: theme.palette.white.main,
  },
  containerLinkDiscrover:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh',
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
  bannerPresentationButtonB2b:{
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main,
  },
  illuStyle:{
    width: '80%'
  },
  illuContainer:{
    display: 'flex',
    justifyContent: 'center'
  }
})
