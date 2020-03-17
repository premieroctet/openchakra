export default theme => ({
  mainContainer:{
    marginTop: 100,
    marginLeft: 200,
    marginRight: 200,
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 15
    }
  },
  badgeStyle:{
    color: "white",

  },
  boxRating:{
    margin: 0,
    marginLeft: 15
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
      height:'auto'
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  leftContainer:{
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  contentRight:{
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  avatarContainer: {
    width : '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      display: 'flex'
    }
  }
})
