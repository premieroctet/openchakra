export default theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  root:{
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl:{
    width: '100%'
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0,
    },
  },
  avatarSize: {
    width: 60,
    height: 60,
  },
  skillTitle: {
    fontSize: '0.8rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
  },
  skillValue: {
    fontSize: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSave: {
    textTransform: 'initial',
    color:'white',
    fontWeight: 'bold',
    width: '100%'
  },
  containerIcon:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    [theme.breakpoints.down('xs')]:{
      right: 0
    }
  },
  dialogPaper:{
    [theme.breakpoints.down('xs')]:{
      minWidth: '100%'
    }
  }

})
