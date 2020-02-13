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
    backgroundImage: "url(" + "../../../static/assets/img/creaShop/bgImage/etape3.svg" + ")",
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
  buttonAddAndRemove: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: "center",
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 25
  },
  selectDelayInputRepsonsive: {
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
})
