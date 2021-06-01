export default theme => ({
  ourAlfredMainStyle:{
    display: 'flex',
    flexDirection: 'column'
  },

  ourAlfredMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  ourAlfredMainHeader:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  ourAlfredImgContainer:{
    height: '100%',
    marginTop: '-25px',
    transform: 'rotate(-25deg)',
    [theme.breakpoints.down('xs')]:{
      margin: 0
    }
  },
  ourAlfredTextContainer:{
    marginLeft: 10,
  },
  ourAlfredTitle:{
    fontFamily: theme.typography.sectionTitle.fontFamily,
    fontWeight: theme.typography.sectionTitle.fontWeight,
    fontSize: theme.typography.sectionTitle.fontSize,
    margin: theme.typography.sectionTitle.margin
  },
  ourAlfredSubtitle:{
    fontFamily: theme.typography.text.fontFamily,
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize,
    margin: theme.typography.text.margin,
  },
  ourAlfredButton:{
    borderRadius: theme.border.whiteButton.borderRadius,
    border: theme.border.whiteButton.border,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontFamily: theme.typography.whiteButton.fontFamily,
    fontWeight: theme.typography.whiteButton.fontWeight
  },
  categorySlideShowContainer:{
    marginTop: '5vh',
    [theme.breakpoints.down('md')]:{
      overflowX: 'scroll',
      display: 'flex',
      flexWrap: 'nowrap',
      zIndex:0,
      overflowY: 'hidden'
    }
  },
  categoryButton:{
    borderRadius: theme.border.whiteButton.borderRadius,
    border: theme.border.whiteButton.border,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontFamily: theme.typography.whiteButton.fontFamily,
    fontWeight: theme.typography.whiteButton.fontWeight
  },
  hiddenOnMobile:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  alfredSlideContainer:{
    width: '100%',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    }
  },
  containerCardPreviewMobile:{
    width: '100%',
    margin: 0,
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    }
  },
  containerMobileButton:{
    marginTop: '10vh',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    }
  }
})
