export default theme => ({
  mainContainer:{
    marginTop: 100,
    marginLeft: 200,
    marginRight: 200,
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0
    },
  },
  badgeStyle:{
    color: "blue",
  },
  boxRating:{
    margin: 0,
  },
  rating:{
    marginLeft: -15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 'large'
    }
  },
  responsiveListContainer:{
    marginTop: 10,
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height:'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
  },
  noPadding:{
    padding:0

  },
  minWidth:{
    minWidth:30
  },
  sizeText: {
    fontSize: 'small'
  },
  flexPosition:{
    display:'flex'
  },
  itemAvatar: {
    flexDirection: 'column',
  },
  avatarLetter:{
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
    fontSize: 20,
  },
  skillsContentContainer:{
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems : 'center'
    }
  },
  leftContainer:{
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  contentRight:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 100
  },
  avatarContainer: {
    width : '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex'
    }
  },
  borderContentRight:{
    border: '2px solid #d2d2d2',
    borderRadius: 30,
    marginRight: 100,
    marginLeft: 100,
    padding: '3%',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      marginLeft: 50,
      marginRight: 50,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 50,
      marginLeft: 50,
      marginBottom: 20
    }
  },
  hrStyle:{
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width : '90%'
    }
  },
  imageStyle: {
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    }
  },
  buttonReservation:{
    position: 'fixed',
    bottom:0,
    width: '100%',
    height: 50
  },
  showReservation:{
    display:'flex',
    justifyContent: 'center',
  },
  iconButtonStyle:{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      height:50,
      width:50,
    },
    [theme.breakpoints.down('xs')]: {
      height:20,
      width:20,
    }
  },
  drawerContent:{
    marginTop: 20,
  },
  avatarAnDescription:{
    display: ' flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    }
  },
  flexContentAvatarAndDescription:{
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  },
  marginAvatarAndDescriptionContent:{
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      marginTop: 30,
    }
  },
  itemListContainer:{
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection:'column',
      alignItems: 'center'
    }
  },
  middleHr:{
    width : 400,
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  scheduleContainer:{
    marginTop: 30,
  },
  scheduleContainerTitle:{
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center'
    }
  },
  basketMinimumContainer:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center'
    }
  },
  textContentBasket:{
    [theme.breakpoints.down('xs')]: {
     textAlign: 'center',
      marginLeft : 15,
      marginRight : 15
    }
  },
  priceBasketContent:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20
    }
  },
  delayPrevenance:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center'
    }
  },
  textContentDelay:{
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft : 15,
      marginRight : 15
    }
  },
  delayPrevenanceContent:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20
    }
  },
  perimeterContent:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center'
    }
  },
  textContentPerimeter:{
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft : 15,
      marginRight : 15
    }
  },
  bookingConditionContent:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center'
    }
  },
  bookingConditionContentTitle:{
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  listContent:{
    display: 'flex',
    flexDirection : 'column',
    [theme.breakpoints.down('xs')]: {
      marginLeft : 15
    }
  },
  listStyle:{
    display: 'flex',
    alignItems: 'center',
    flexDirection : 'row'
  },
  commentaryContent:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center',
      marginBottom: 100
    }
  },
  equipmentsContainer:{
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center',
      marginBottom: 100
    }
  },
  textEquipments:{
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft : 15,
      marginRight : 15
    }
  },
  marginRight:{
    marginRight: 20
  }
})
