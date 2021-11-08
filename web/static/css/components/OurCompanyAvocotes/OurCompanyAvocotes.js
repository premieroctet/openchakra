export default theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    paddingLeft: '30%',
    paddingRight: '30%',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },

  },
})
