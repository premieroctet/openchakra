export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
      marginTop: 0,

    }
  },
  toggle: {
    zIndex: 0,
    margin: 20
  },

  tabmobile:{
    fontSize:'10px',
    fontWeight:'300',
    marginTop:'-100px',
    height:60,
    backgroundColor:'white',
    position:'sticky',
    top:55,
    zIndex:20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }},

  trait:{
    width: '100%',
    height: 4,
    backgroundColor: 'rgb(47, 188, 211)',
    borderColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
    },
  },

  trait1:{
    width: '100%',
    height: 4,
    backgroundColor: 'lightgray',
    borderColor: 'transparent'
  },

  trait2:{
    width: '100%',
    height: 4,
    backgroundColor: 'lightgray',
    borderColor: 'transparent',

  },

  trait3:{
    width: '100%',
    height: 4,
    backgroundColor: 'rgb(47, 188, 211)',
    borderColor: 'transparent',
  },

  historesp: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    },
  },
  myHistorique:{
    paddingLeft: '20%',
    marginBottom: '20px',
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      display: 'flex',
      justifyContent : 'center',
      flexDirection : 'column',
      marginLeft: 20
    }
  }
})
