export default theme=>({
  mainContainer:{
    display: 'flex',
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
    margin: 10
  },
  avatarSize:{
    width: 80,
    height: 80
  },
  chipStyle:{
    margin : 15
  },
})
