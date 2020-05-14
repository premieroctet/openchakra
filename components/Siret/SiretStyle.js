export default theme => ({
  textFieldSiret:{
    '& .MuiInputLabel-outlined':{
      zIndex: '0 !important'
    }
  },
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
  menu: {
    width: 200,
  },
})
