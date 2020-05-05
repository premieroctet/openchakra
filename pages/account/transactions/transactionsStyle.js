export default  theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,

  },
  hidesm: {
    minWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }

  ,hidelg: {
    [theme.breakpoints.up('md')]: {
      display:'none',
    }

  },
  trigger:{
    [theme.breakpoints.down('sm')]: {
      marginTop: -10,
      width: '100%',
      marginLeft:'0px',
      height:'30px',
      backgroundColor:'#2FBCD3',

      display:'block',
      transition: 'display 0.7s',
      borderRadius:'5px',
      '&:focus': {
        display:'none',
        transition: 'display 0.7s',

      }
    }

  },
  toggle: {
    [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
      transition: 'margin-left 0.7s',

      '&:hover': {
        marginLeft:'0px',
        transition: 'margin-left 0.7s',
        boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

      }
    }
  },

  tabweb:{width:'100%', position:'sticky', top:'35px', fontSize:15, backgroundColor:'white', zIndex:'20',
    [theme.breakpoints.down('sm')]: {
      display: 'none'}},


  tabmobile:{
    fontSize:'10px', fontWeight:'300', marginTop:'-100px', height:60, backgroundColor:'white', position:'sticky', top:55, zIndex:20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      height: 100,
      top:65
    },
  },
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
    [theme.breakpoints.down('xs')]: {
      marginTop: 50,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  containerLeft:{
    paddingLeft: 55,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'inherit',
    },
  }
})
