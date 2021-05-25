export default theme => ({
  avatarLetterProfil: {
    height: '90%',
    width: '90%',
    margin: 'auto',
    fontSize: 'xx-large',
  },
  avatarLetter: {
    width: 80,
    height: 80,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60
    }
  },
  input: {
    display: 'none'
  },
  badge: {
    width: '100%',
    height: '100%'
  },
  buttonCamera: {
    float: 'right',
    zIndex: '2',
    color: '#312b2a',
    position: 'relative',
    border: 'white 0.5px solid',
    borderRadius: '50%',
    backgroundColor: '#BDBDBD',
    bottom: '40%',
    padding: '0.3vh',
    '&:hover': {
      backgroundColor: 'white'
    }
  }
})
