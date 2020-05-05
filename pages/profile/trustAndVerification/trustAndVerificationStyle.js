export default theme => ({
  bigContainer: {
    marginTop: 100,
    marginBottom: 70,
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden',
    },
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
  buttresp: {
    [theme.breakpoints.down('sm')]: {
      width:'86%!important',
      fontSize:'0.7rem'
    }
  },
  buttresp2: {
    [theme.breakpoints.down('sm')]: {
      width:'168%!important',
      fontSize:'0.7rem'
    }
  },
  respenr:{
    [theme.breakpoints.down('sm')]: {
      justifyContent:'flex-start!important',
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
  },
  textField:{
    marginTop: 15,
    width:'50%',
    [theme.breakpoints.down('xs')]:{
     width:'80%'
    }
  },
  contentIcones:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  forminputs:{
    display: 'inline-block',
    marginTop:5,
    textAlign:"center"
  },
  containerProfessional:{
    display: 'flex',
    flexDirection: 'column'
  },
  buttonSend:{
    width: '50%',
    [theme.breakpoints.down('xs')]:{
      width:'95%'
    }
  },
  typeFile:{
    width: '35%',
    [theme.breakpoints.down('xs')]:{
      width:'70%'
    }
  },
  containerRecto:{
    marginTop: 20,
    border:'0.2px solid lightgrey',
    display:"flex",
    justifyContent:"center",
    width: '35%',
    [theme.breakpoints.down('xs')]:{
      width: '100%',
    }
  },
  buttonSendSMS:{
    width: '50%',
   
  }
})
