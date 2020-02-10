export default theme => ({
  mainContainer:{
    width: '100%',
    height: '100%',
  },
  contentContainer:{
    display: 'flex',
    height: 'auto',
    width: '100%'
  },
  contentLeft:{
    width: '60%',
    height : '100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  contentRight: {
    width: '40%',
    height: 'auto',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    position: 'relative',
    backgroundImage: "url(" + "../../../static/assets/img/creaShop/bgImage/etape0.svg" + ")",
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  contentLeftTop:{
    width : '100%',
  },
  contentTitle:{
    width: '80%',
  },
  contentTextSize:{
    width : 500,
    marginTop: 50,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  policySizeTitle:{
    fontSize: 35
  },
  policySizeStep:{
    fontFamily: 'Signatra',
    fontSize: 30
  },
  policySizeSubtitle:{
    fontSize: 25
  },
  policySizeContent:{
    fontSize: 16
  },
  hrStyle:{
    color : '#BCBCBC'
  }
})
