export default theme => ({
  paymenChoiceMainContainer:{
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '5%',
    paddingLeft: '5%',
    [theme.breakpoints.down('sm')]:{
      padding: 0
    }
  },
  paymentChoiceSecondContainer:{
    [theme.breakpoints.down('sm')]:{
      marginBottom: 200,
      marginTop: '2vh'
    },
    [theme.breakpoints.down('xs')]:{
      marginBottom: 400,
      marginTop: '2vh'
    },

  }
})
