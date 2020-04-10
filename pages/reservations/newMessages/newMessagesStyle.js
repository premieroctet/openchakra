export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 100,
    }
  },
  mobilerow1: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  webrow: {
    alignItems:'center',
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  hidesm: {
    minWidth: "271px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  hidelg: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  trait: {
    width: "100%",
    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait1: {
    width: "100%",

    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent"
  },
  trait2: {
    width: "100%",
    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait3: {
    width: "100%",

    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent"
  },
  tabweb: {
    visibility: "visible",
    width: "100%",
    position: "sticky",
    top: 75,
    fontSize: 15,
    backgroundColor: "white",
    zIndex: "20",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      visibility: "hidden"
    }
  },

  tabmobile: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      fontSize: "10px",
      fontWeight: "300",
      backgroundColor: "white",
      position: "sticky",
      top: 55,
      zIndex: 20
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
    },
  },
  avatarContainer:{
    marginRight: "5%"
  },
  descriptionContainer:{
    paddingRight: "5%",
    paddingLeft: "5%"
  },
  priceContainer:{
    display:'flex',
    justifyContent: 'center'
  },
  hrSeparator:{
    width: '100%',
    marginTop: 20,
    color : 'rgb(80, 80, 80, 0.2)'
  }
})
