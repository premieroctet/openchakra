export default theme => ({
  toggle: {
    zIndex: 0,
  },
  containercalendar: {
    display: 'flex',
      marginBottom: 200,
      [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '50%',
        marginTop: 20,
    },
  },
});
