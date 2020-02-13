export default theme => ({
  spacer:{
    width: '100%',
    height: 50
  },
  mainContainer:{
    display: "flex",
    flexDirection: "row"
  },
  marginContainer:{
    position: 'relative',
    marginLeft: 200,
    marginRight : 200,
    top: 150
  },
  mainHeader:{
    width: "100%",
    display: "flex",
    position: 'fixed',
    zIndex: 1,
    alignItems: 'center'
  },
  imageContentHeader:{
    width: '10%',
    margin: 'auto',
  },
  contentStepper:{
    width: '90%',
    backgroundColor: "brown"
  },
  leftContentComponent:{
    width: '60%',
    height : '100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  mainContainerNoImg:{
    width: '100%',
    height : '100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
  },
  rightContentComponent:{
    width: '40%',
    position: 'relative',
  },
  contentRight: {
    width: 'auto',
    height: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  footerMainContainer:{
    width: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
  },
  footerContainer:{
    height: '100%',
    width: '100%',
  },
  marginHr:{
    marginLeft: 200,
    marginRight: 200
  },
  navButtonContent:{
    display: 'flex',
    marginRight: 200,
    marginLeft: 200,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  nextButton:{
    color: 'white'
  }
})
