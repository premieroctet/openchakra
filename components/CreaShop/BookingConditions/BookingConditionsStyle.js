export default theme => ({

  mainContainer:{
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    display: 'flex',
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
    backgroundImage: "url(" + "../../../static/assets/img/creaShop/bgImage/etape4.svg" + ")",
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  contentLeftTop:{
    width : '100%',
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
