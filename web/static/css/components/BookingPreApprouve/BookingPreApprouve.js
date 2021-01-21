export default theme => ({
  bigContainer: {
    flexGrow: 1,
    marginBottom: 50,

  },
  dispocard: {
    minHeight: '100px',
    width: '200px',
    textAlign: 'center',

    boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
    border: 'solid 1px #ccc',
    borderRadius: '10px',
  },
  avatarLetter: {
    height: 70,
    width: 70,
    margin: 'auto',
  },
  fontSizeTitleSectionAbout: {
    fontSize: '1rem',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -1,
    fontWeight: 'bold',
    marginBottom: '5%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      textAlign : 'center'
    },
  },
  containerDate:{
    display: 'flex',
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    }
  },
  endDateContainer:{
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]:{
      margin: 0,
      marginTop: '3vh'
    }
  }
})
