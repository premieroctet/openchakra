export default theme => ({

  mainContainer:{
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    display: 'flex',
    height: 700,
    width: '100%'
  },
  contentLeft:{
    width: '60%',
    height : '100%',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  contentRight: {
    width: '40%',
    height: '100%',
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
    backgroundColor: 'blue'
  },
  contentTitle:{
    width: '100%'
  },
  contentTextSize:{
    width : 500,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
})
