export default theme => ({
  topicDivider:{
    height: 6,
    backgroundColor:'rgba(178, 204, 251, 100%)',
    borderRadius: 27,
    width: '3vw',
    [theme.breakpoints.down('xs')]:{
      width: '15vw'
    }
  }
})
