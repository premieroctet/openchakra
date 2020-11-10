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
    cursor: 'pointer'
  },
  cardServiceMainStyle:{
    width: '80%',
    marginTop: '8%',
    marginBottom: '5%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardServiceFlexContainer:{
    display: 'flex',
    justifyContent :'center',
    position: 'relative'
  },
  cardServicePicsContainer:{
    width: '100%',
    height: '20vh'
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
    alignItems: 'center'
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
    justifyContent: 'space-between'
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

})
