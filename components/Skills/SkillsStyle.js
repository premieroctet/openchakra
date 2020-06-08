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
