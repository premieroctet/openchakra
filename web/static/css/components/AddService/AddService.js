export default theme => ({
  containerAddService:{
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    [theme.breakpoints.down('lg')]:{
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
      borderRadius: 10,
    }
  },
  buttonAddService:{
    textTransform: 'initial',
    fontWeight: 'bold'
  },
  descriptionAddService:{
    color:'rgba(39,37,37,35%)',
    textAlign: 'center'
  }
})
