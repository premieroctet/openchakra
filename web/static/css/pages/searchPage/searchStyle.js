export default theme => ({
  bigContainer: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  media: {
    height: '250px!important',
    position: 'relative',
    objectFit: 'cover',
  },

  separatorBlue: {
    width: '150px',
  },
  containerTitle: {
    marginTop: 70,
    [theme.breakpoints.down('xs')]: {
      marginTop: 200,
    },
  },

  containerCardPreview: {
    padding: 5,
  },
  paddingResponsive: {
    [theme.breakpoints.down('xs')]: {
      padding: '0 !important',
      marginBottom: 20,
    },
  },

  paginationRoot:{
    '& .MuiPaginationItem-page.Mui-selected':{
      backgroundColor: 'rgba(248, 207, 97, 1)',
      color: 'white'
    }
  },

  navbarRoot: {
    marginLeft: 20,
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
  },
  navbarInput:{
    '&::placeholder':{
      opacity: '0.55',
      color: theme.palette.placeHolder.main,
    }
  },
  searchNavbarComponentPosition:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  searchFilterMenuPosition:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  searchFilterMenuContent:{
    width: '80%'
  },
  searchMainConainer:{
    marginTop: '2%'
  },
  searchContainerHeader:{
    display: 'flex',
    width: '80%'
  },
  searchMainContainerHeader:{
    display: 'flex',
    justifyContent: 'center',
  },
  searchSecondFilterContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  searchSecondFilterContainerLeft:{
    marginRight: 20
  },
  searchMainContainerResult:{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '4%',
    [theme.breakpoints.down('xs')]:{
      justifyContent: 'initial'
    }

  },

  searchContainerDisplayResult:{
    width: '70%',
    [theme.breakpoints.down('sm')]:{
      width: '90%',
    },
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }
  },
  searchMainContainer:{
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.down('xs')]:{
      marginBottom: '20vh'

    }
  },
  cardServiceButton:{
    color: theme.palette.white.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.black.main,
    borderRadius: theme.border.blackButton.borderRadius,
    width: '100%'
  },
  cardServiceButtonContainer:{
    width: '50%'
  },
  searchFilterRightContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchFilterRightLabel:{
    marginRight: 10
  },
  searchSelectPadding:{
    paddingRight: '34px !important'
  },
  searchNeedHelpMainStyle:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  searchNeedHelpMainContainer:{
    width: '80%'
  },
  searchSearchByHastagMainStyle:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  searchSearchByHastagContainer:{
    width: '80%'
  },
  searchResultMessage:{
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  searchResultMessageContent:{
    width: '80%'
  },

  searchLoadingContainer:{
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center',
    marginTop: '10vh',
    marginBottom: '10vh'
  },

})
