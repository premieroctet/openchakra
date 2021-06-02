export default theme => ({
  card: {
    padding: '1.5rem 3rem',
    borderRadius: '35px',
  },
  formContainer:{
    paddingLeft: '15%',
    paddingRight: '15%',
    [theme.breakpoints.down('xs')]:{
      padding: 0
    }
  },
  saveButton:{
    backgroundColor: theme.palette.b2b.main,
    fontWeight: 'bold',
    textTransform: 'initial',
    color: 'white'
  },
  containerImg:{
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    }
  }
})
