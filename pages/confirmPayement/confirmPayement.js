export default theme => ({
  bigContainer: {
    flexGrow: 1
  },
  avatarLetter:{
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
    fontSize: 20,
  },
  rightContainer: {
    marginTop: "2%",
    marginBottom: "5%"
  },
  backgroundRightContainer:{
    backgroundImage: `url('../../static/resa.svg')`,
    backgroundPosition: "cover",
    backgroundRepeat: "no-repeat",
    border: "thin solid transparent",
    maxWidth: "100%",
    height: "90vh",
    padding: "2%",
    position: "sticky",
    top: 100,
    [theme.breakpoints.down("xs")]:{
      display : 'none'
    }
  },
  buttonPaid:{
    color: "white",
    fontSize: "16px",
    marginBottom: 50,
  },
  buttonContainerPiad:{
    fontWeight: 600,
    fontSize: 25,
    color: "#2FBCD3",
    marginTop: '3%',
    display:'flex',
    flexDirection: 'row-reverse'
  },
  h3Style:{
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold"
  },
  h2Style:{
    fontSize: "2rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "100"
  },
  leftContainer:{
    textAlign: "left",
    margin: "0 auto",
    float: "right",
    paddingLeft: "3%",
    [theme.breakpoints.down("xs")]:{
      paddingRight: "3%",
    }
  },
  marginItemContainer:{
    marginTop: 50,
    marginBottom: 30
  },
  widthLarge:{
    width: '100%'
  },
  containerAboutAndAvatar:{
    [theme.breakpoints.down("xs")]:{
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center'
    }
  },
  containerAvatar:{
    [theme.breakpoints.down("xs")]:{
      marginBottom: '15%'
    }
  },
  marginContainerAvatar:{
    marginRight: '15%',
    [theme.breakpoints.down("xs")]:{
      marginRight: 0
    }

  }
})
