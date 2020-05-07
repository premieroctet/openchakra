export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
    }
  },
  toggle: {
    zIndex: 0
  },

  tabweb:{
    width:'100%',
    position:'sticky',
    top:'35px',
    fontSize:15,
    backgroundColor:'white',
    zIndex:'20',
    [theme.breakpoints.down('sm')]: {
      display: 'none'}}
      ,

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
    borderColor: 'transparent'
  },

  historesp: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '150px',
    },
  },
})
