export default theme => ({
  containerPaymentSuccess:{
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 27,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    paddingLeft: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingRight: '10%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]:{
      width: '100%'
    }
  }
})
