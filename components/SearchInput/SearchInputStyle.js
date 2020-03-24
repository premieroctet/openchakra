export default theme => ({
  mainContainer : {
    display : 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    borderBottom: 0
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  contentInput:{
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent : 'center'
    },
  },
  contentInputService:{
    display: 'flex',
    width: '50%',
    alignItems:'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent : 'center',
      border: '1px solid rgb(232, 235, 235)',
      borderRadius: 5,
      backgroundColor: 'rgb(232, 235, 235)'
    },
  },
})
