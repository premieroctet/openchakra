export default theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    width: 50,
    height: 50,
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

})
