export default theme => ({
  cardServiceInfoPaper: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: 450,
  },
  cardServiceInfoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardServiceInfoTitle: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },

  cardServiceInfoText: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },
  cardServicePaper: {
    borderRadius: 20,
    height: 450,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  profileModecardServicePaper: {
    height: 300,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('lg')]: {
      width: 245,
    },
    [theme.breakpoints.down('md')]: {
      width: 275,
    },
    [theme.breakpoints.down('xs')]: {
      height: 300,
    },
  },
  cardServiceMainStyle: {
    width: '80%',
    height: '100%',
    paddingTop: 15,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  cardServiceFlexContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cardServicePicsContainer: {
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  profileModecardServicePicsContainer: {
    width: '100%',
    height: '100%',
  },

  cardServiceBackgroundPics: {
    width: 250,
    height: 200,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cardServiceBackgroundPicsProfil: {
    height: '100%',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20,
  },
  cardServiceChipName: {
    position: 'absolute',
    bottom: '19px',
    left: 0,
    [theme.breakpoints.down('xs')]: {
      bottom: '18px',
    },
  },
  cardServiceChipPro: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cardServiceChip: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  cardServiceChipBckg: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
    color: 'white',

  },
  cardServicePlaceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardServicePlaceLogo: {
    marginRight: '3%',
  },

  stylecardServiceDistance: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardServiceScoreAndButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardServiceRatingContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
  },
  cardPreviewRatingBox: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  cardServiceBoxRatingDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardServiceRating: {
    marginRight: '20%',
    marginLeft: '20%',
  },

  cardServiceLabelService: {
    fontFamily: theme.typography.textLabel.fontFamily,
    fontWeight: theme.typography.textLabel.fontWeight,
    fontSize: theme.typography.textLabel.fontSize,
    margin: theme.typography.textLabel.margin,
  },

  dataContainer: {
    marginTop: '3vh',
  },

  labelDataContainer: {
    [theme.breakpoints.down('xs')]: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  profileModeCardService: {
    width: '90%',
    padding: '5%',
  },
  profileModeDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3vh',
    height: '30%',
    justifyContent: 'center',
  },
  cardKmContainer: {
    display: 'flex',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

  },
  labelService: {
    height: 60,
  },
  labelServiceProfil: {
    height: 60,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '2vh',
    },
  },

  profileModecardServiceFlexContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
  },
  mainCardServiceContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  mainCardServiceContainerProfil: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'inherit',
    },
  },
  containerDescription: {
    height: 50,
  },
  descriptionStyle: {
    color: 'rgba(39,37,37,35%)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineClamp: 2,
    boxOrient: 'vertical',
    display: '-webkit-box',
  },
  carServiceInfoContainer: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
  },
  containerDistance: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  colorError: {
    color: theme.palette.error.main,
  },

  media: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  paperloadingCard: {
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: 450,
    cursor: 'pointer',
  },

  cardLoadingImgCont: {
    position: 'relative',
    width: '80%',
    marginTop: '8%',
    marginBottom: '5%',
    display: 'flex',
    flexDirection: 'column',
  },

  cardLoadingCard: {
    width: '100%',
    height: 200,
  },

  buttonShowProfil: {
    borderRadius: theme.border.whiteButton.borderRadius,
    textTransform: theme.typography.textTransform,
    padding: theme.padding.whiteButton.padding,
    fontWeight: theme.typography.whiteButton.fontWeight,
    backgroundColor: 'black',
    color: 'white',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonShowProfilContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  lastContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorIconExtension: {
    filter: 'invert(66%) sepia(0%) saturate(2996%) hue-rotate(65deg) brightness(110%) contrast(114%)',
  },
  colorIconSchool: {
    color: 'rgb(199, 199, 199)',
  },
})
