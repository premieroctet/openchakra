export default theme => ({
  layoutScrollMenu:{
    display: 'flex',
    justifyContent: 'center',
    height : '10%',
    alignItems: 'flex-end'
  },
  containerTitleAndSubtitle:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5%',
    [theme.breakpoints.down('xs')]:{
      padding: '10%'
    }
  },
  containerArrowBack:{

  },
  button:{
    margin: theme.spacing(1),
    color: 'white',
    textTransform: 'initial'
  }
})
