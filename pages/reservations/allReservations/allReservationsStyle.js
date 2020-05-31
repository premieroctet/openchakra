export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 100,
    }
  },
  mobilevoir: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  webvoir: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  mobilerow1: {
    boxShadow: "0px 0px 6px lightgray",
    borderRadius: "5px",
    margin: "15px auto",
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
  marginbot: {
    marginBottom: "3.5%"
  },
  hiddenone: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important"
    }
  },
  revealedone: {
    [theme.breakpoints.up("md")]: {
      display: "none!important"
    }
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderTop: "15px solid gray",
    margin: "0 auto",
    marginTop: -28
  },
  shopbar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  bottombar: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      boxShadow: "2px -5px 14px -15px rgba(0,0,0,0.75)"
    }
  },
  topbar: {
    visibility: "visible",
    position: "sticky",
    top: 75,
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      visibility: "hidden"
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
    top: 72,
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

  mobilerow: {
    marginTop: "1%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15%"
    }
  },
  Rightcontent: {
    marginLeft: "4%"
  },
  toggle: {
    zIndex: 0,
  },
  paddresp: {
    paddingLeft: 55,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 15
    }
  },
  trigger: {
    [theme.breakpoints.down("sm")]: {
      marginTop: -10,
      width: "100%",
      marginLeft: "0px",
      height: "30px",
      backgroundColor: "#2FBCD3",

      display: "block",
      transition: "display 0.7s",
      borderRadius: "5px",
      "&:focus": {
        display: "none",
        transition: "display 0.7s"
      }
    }
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
  },
  navbarShopContainer:{
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})
