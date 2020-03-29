export default theme=>({
  mainContainer:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
  },
  cardSkills:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    margin: 'auto'
  },
  avatarSize:{
    width: 100,
    height: 100
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
