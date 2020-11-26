export default theme => ({
  cardServiceInfoPaper:{
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '40vh'
  },
  cardServiceInfoContent:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardServiceInfoTitle:{
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },

  cardServiceInfoText:{
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },
  cardServicePaper:{
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '40vh',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]:{
      height: '30vh',

    }
  },
  profileModecardServicePaper:{
    height:300,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',

  },
  cardServiceMainStyle:{
    width: '80%',
    marginTop: '8%',
    marginBottom: '5%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
    }
  },
  cardServiceFlexContainer:{
    display: 'flex',
    justifyContent :'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]:{
      width: '50%'
    }
  },
  cardServicePicsContainer:{
    width: '100%',
    height: '20vh',
    [theme.breakpoints.down('xs')]:{
      width: 125,
      height: 125
    }
  },

  profileModecardServicePicsContainer:{
    width: '100%',
    height: '100%',
  },

  cardServiceBackgroundPics:{
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20
  },
  cardServiceChipName:{
    position: 'absolute',
    bottom:0,
    left:0
  },

  cardServiceChip:{
    backgroundColor: theme.palette.white.main,
  },
  cardServicePlaceContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      marginTop: '1vh',
      marginBottom: '1vh',
      marginLeft: '1vh'
    }
  },
  cardServicePlaceLogo:{
    marginRight: '3%'
  },

  stylecardServiceDistance:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardServiceScoreAndButtonContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]:{
      justifyContent: 'center'
    }
  },

  cardServiceRatingContainer:{
    display: 'flex',
    flexDirection: 'row',
    width: '50%'
  },
  cardPreviewRatingBox:{
    display: 'flex',
    alignItems: 'center',
    margin:0,
    padding: 0
  },
  cardServiceBoxRatingDisplay:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardServiceRating:{
    marginRight: '20%',
    marginLeft: '20%'
  },

  cardServiceLabelService:{
    fontFamily: theme.typography.textLabel.fontFamily,
    fontWeight: theme.typography.textLabel.fontWeight,
    fontSize: theme.typography.textLabel.fontSize,
    margin: theme.typography.textLabel.margin
  },

  dataContainer:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3vh',
    [theme.breakpoints.down('xs')]:{
      margin:0,
      width: '50%',
      flex: 'inherit'
    }
  },

  labelDataContainer:{
    [theme.breakpoints.down('xs')]:{
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  },
  profileModeCardService:{
    width: '90%',
    padding: '5%',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column',
      alignItems: 'center',

    }
  },
  profileModeDataContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3vh',
    height: '30%',
    justifyContent: 'center',
  },
  cardKmContainer:{
    display: 'flex',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
    
  },
  labelService:{
    [theme.breakpoints.down('xs')]:{
      marginLeft: '1vh'
    }
  },
  profileModecardServiceFlexContainer:{
    width: '100%',
    height:'60%',
    position: 'relative',
  }

})
