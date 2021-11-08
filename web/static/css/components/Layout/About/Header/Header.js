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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  button:{
    margin: theme.spacing(1),
    color: 'white',
    textTransform: 'initial'
  },
  navbarSearchContainer:{
  },
  navbarSearch: {
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
  },
  iconButton: {
    padding: 10,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
  },
})
