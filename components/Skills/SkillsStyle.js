export default theme=>({
  mainContainer:{
    display: 'flex',
    flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'center',
        justifyContent: 'center'
    },
  },
  cardSkills:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 120,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0,
    },
  },
  avatarSize:{
    width: 80,
    height: 80
  },
  chipStyle:{
    margin : 15
  },
  bigWidth: {
    width :500,
    [theme.breakpoints.down('xs')]: {
      width: 'auto'
    },
  },
  middleWidth: {
    width : 400,
    [theme.breakpoints.down('xs')]: {
      width: 'auto'
    },
  },
  titleSkills:{
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold"
  }
})
