export default theme => ({
  cardServiceUserInfoPaper: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: 450,
  },
  cardServiceInfoPaper: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    height: 350,
  },
  cardServiceUserInfoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardServiceUserInfoTitle: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },

  cardServiceUserInfoText: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.fontFamily,
  },
  cardServiceUserPaper: {
    borderRadius: 20,
    height: 450,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  cardServicePaper: {
    borderRadius: 20,
    height: 350,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  profileModeCardServiceUserPaper: {
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
  cardServiceUserMainStyle: {
    width: '80%',
    height: '100%',
    paddingTop: 15,
    margin: 0,
    [theme.breakpoints.down('lg')]: {
      width: '90%',
    },
  },
  cardServiceUserFlexContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cardServiceUserPicsContainer: {
    height: 200,
    width: '100%',
  },

  profileModeCardServiceUserPicsContainer: {
    width: '100%',
    height: '100%',
  },

  cardServiceUserBackgroundPics: {
    height: 200,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20,
  },
  cardServiceUserBackgroundPicsProfil: {
    height: '100%',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20,
  },
  cardServiceUserChipName: {
    position: 'absolute',
    bottom: 15,
    left: 0,
  },
  cardServiceUserCHipNameP: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cardServiceUserChipPro: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  cardServiceUserChip: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  cardServiceUserChipBckg: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
    color: 'white',

  },
  cardServiceUserPlaceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardServiceUserPlaceLogo: {
    marginRight: '3%',
  },

  cardServiceUserDistance: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardServiceUserScoreAndButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardServiceUserRatingContainer: {
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
  cardServiceUserBoxRatingDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardServiceUserRating: {
    marginRight: '20%',
    marginLeft: '20%',
  },

  cardServiceUserLabelService: {
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
  profileModeCardServiceUser: {
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

  profileModeCardServiceUserFlexContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
  },
  mainCardServiceUserContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  mainCardServiceUserContainerProfil: {
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
