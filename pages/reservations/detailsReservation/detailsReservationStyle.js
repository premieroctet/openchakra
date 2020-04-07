export default theme => ({
  exp1: {
    "&::before": {
      height: "0px!important"
    },
    [theme.breakpoints.down("sm")]: {
      width: '100%!important'
    }
  },
  bordernone:{
    [theme.breakpoints.down("sm")]: {
      border: 'none!important',
    },
  },
  displayn:{
    display: 'none'
  },
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 100,
    }
  },
  hidesm: {
    minWidth: "271px",
    [theme.breakpoints.down("sm")]: {
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
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  avatarLetter:{
    width: 100,
    height: 100
  },
  hrSeparator:{
    width: '100%',
    marginTop: 30,
    color : 'rgb(80, 80, 80, 0.2)'

  }
})
