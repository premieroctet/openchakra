export default theme => ({
  avatarSize:{
    width: 100,
    height: 100
  },
  cardSkills:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%'
  },
  picsSize:{
    height: 70,
    width: 70
  },
  labelRating:{
    display: 'flex',
    alignItems: 'center'
  },
  ratingStyle:{
    marginLeft: '10px'
  },
  hrSeparator:{
    width: '100%',
    marginTop: 30,
    color : 'rgb(80, 80, 80, 0.2)'
  },
  titleSkills:{
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold"
  },
  flexContainer: {
    display: 'flex',
    alignItems : 'center',
    margin: 0,
    padding: 0
  },
  badge: {
    color: 'white'
  },
  containerAvatarAndAbout:{
    width: '100%',
    marginTop: 15,
    [theme.breakpoints.down('xs')]:{
      marginTop: '10%',

    }

  },
  containerGeneralNotes:{
      width: '100%'
    
  },
  mainContainer:{
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  },
  containerSkills:{
    width: '100%',
    display: 'flex',
    marginTop: '5%'
  },
  mainContainerAvatarAndAbout:{
    display : 'flex',
    marginTop: 30,
    flexDirection: 'column'
  },
  containerNotes:{
    display:'flex',
    flexDirection: 'column',
    width: '50%',
    marginLeft: 10,
    [theme.breakpoints.down('xs')]:{
      width: '100%',
      marginLeft: 'inherit'
    }
  },
  containerAlfredMode:{
    width: '100%',
    display: 'flex',
  },
  containerNotesComponent:{
    marginTop: 30,
    marginLeft:5,
    [theme.breakpoints.down('xs')]:{
      marginLeft:0,
      display:'flex',
      justifyContent : 'center'
    }
  }
})
