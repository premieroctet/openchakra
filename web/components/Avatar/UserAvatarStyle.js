export default theme => ({
  avatarLetterProfil: {
    height: '90%',
    width: '90%',
    margin: 'auto',
    fontSize: 'xx-large',
  },
  avatarLetter:{
    width: 80,
    height: 80,
    [theme.breakpoints.down('sm')]:{
      width: 60,
      height: 60
    }
  },
  input:{
    display:'none'
  },
  badge:{
    width: '100%',
    height : '100%'
  }
})
