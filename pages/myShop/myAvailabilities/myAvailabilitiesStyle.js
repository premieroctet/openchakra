export default theme => ({
  containercalendar:{
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    [theme.breakpoints.down('sm')]: {
      width:'100%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '50%',
    },
  },
})
