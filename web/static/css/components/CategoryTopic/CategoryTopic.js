export default theme => ({
  categoryMainContainer:{
    display: 'flex',
    flexDirection: 'column'
  },

  categoryContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  categoryLeftContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  categoryImgContainer:{
    height: '100%',
    marginTop: '-25px',
    transform: 'rotate(-25deg)',
    [theme.breakpoints.down('xs')]:{
      margin:0
    }
  },

  categoryTextContainer:{
    marginLeft: 10,
  },
  slideShowContainer:{
    display: 'flex',
    alignItems: 'center',
    padding: '2%'
  },

  slideShowSectionContainer:{
    width: '100%'
  },
  categoryTitle:{
    fontWeight: theme.typography.sectionTitle.fontWeight,
    fontSize: theme.typography.sectionTitle.fontSize,
    margin: theme.typography.sectionTitle.margin
  },
  categoryText:{
    color: theme.typography.text.color,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize,
    margin: theme.typography.text.margin
  },
  categorySlideShowContainer:{
    marginTop: '5vh',
    [theme.breakpoints.down('md')]:{
      overflowX: 'scroll',
      display: 'flex',
      flexWrap: 'nowrap',
      zIndex:0
    }
  },
  categoryButton:{
    borderRadius: theme.border.whiteButton.borderRadius,
    border: theme.border.whiteButton.border,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontWeight: theme.typography.whiteButton.fontWeight
  },
})
