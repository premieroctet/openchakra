export default theme => ({

  bigContainer: {
    marginTop: 68,
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    }
  },
  toggle: {
    height: "100%",
    marginTop: "15px",
    marginBottom: "15px",
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
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
  rightcontent: {
    width: '70%',
    marginTop: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  },
  mainContainer:{
    border: "0.2px solid lightgrey",
    margin: "auto",
    justifyContent: "center",
    position: "sticky",
    top: 100,
    width: "90%"
  },
  itemAvatar: {
    marginTop: 10,
    width: '90%'
  },
  avatarLetter:{
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  titleAbout:{
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      display:'flex',
      justifyContent: 'center'
    }
  },
  servicesContainer:{
    marginTop: '3%',
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      marginTop: '5%',
    }
  },
  largeWidth:{
    width: '100%',
  },
  cardPreviewContainer:{
    marginTop:30,
    display: 'flex',
    alignItems: 'center',
    padding: 10
  },
  tabweb:{
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 15,
      marginRight: 15
    }
  },
  titleAboutSection:{
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    }
  }
})
