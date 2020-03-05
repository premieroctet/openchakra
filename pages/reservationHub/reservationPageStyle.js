export default theme => ({
  mainContainer:{
    marginTop: 100,
    marginLeft: 200,
    marginRight: 200,
    display: 'flex',
    flexDirection: 'row'
  },
  badgeStyle:{
    color: "white",
    '& span:nth-child(+n+6)':{
    }
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
    color: 'white',
    margin: 'auto',
    fontSize: 20,
  },
  skillsContentContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})
