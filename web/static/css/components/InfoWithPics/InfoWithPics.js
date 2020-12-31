export default theme => ({
  infoWithPicsMainContainer:{
    display: 'flex',
    alignItems: 'center',
    padding: '5%'
  },
  infoWithPicsMarginRight:{
    marginRight: '5%',
    [theme.breakpoints.down('xs')]:{
      margin: 0
    }
  },
  infoWithPicsColorText:{
    color:'rgba(39,37,37,35%)'
  },
  picsSize:{
    width: 80,
    height: 80,
    [theme.breakpoints.down('xs')]:{
      width: 50,
      height: 50
    }
  },
  containerListIcon: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10
    },
  }
})
