export default theme => ({
  containercalendar:{
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 200,
    [theme.breakpoints.down('sm')]: {
      width:'100%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '50%',
      marginTop: 20
    },
  },
})
