export default theme => ({
  bigContainer: {
    marginTop: 70,
    flexGrow: 1,
  },
  hidesm: {
    minWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  },
  hidelg: {
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
  respright:{
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  toggle: {
    [theme.breakpoints.down('sm')]: {
      marginLeft:'-75px',
      transition: 'margin-left 0.7s',
      '&:hover': {
        marginLeft:'0px',
        transition: 'margin-left 0.7s',
        boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
      }
    }
  },
  containerLeft:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center'
  },
  paiementMethode:{
    backgroundColor : 'grey',
    color :'white'
  },
  isSelected:{
    color: 'white',
    marginBottom: '30px',
    backgroundColor: '#4fbdd7'
  },
  flexContainerCard:{
    display: 'flex',
    width:'100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  mainContainerCardPaiment:{

    [theme.breakpoints.down('xs')]: {
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }

})
