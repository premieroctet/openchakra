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
    width: 150,
      [theme.breakpoints.down('xs')]: {
        marginBottom: 30
      },
  },
  avatarSize:{
    width: 100,
    height: 100
  },
  chipStyle:{
    margin : 15
  }
})
