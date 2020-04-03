
export default theme =>({
  root: {
    width: '100%',
  },
  appBar:{
    boxShadow: 'inherit',
  },
  appBarTransparent:{
    backgroundColor: 'rgba(0,0,0,.5)',

  },
  mainWrapper:{
    display: 'flex',
    width : '100%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  logoNavbar:{
    width: 110,
    cursor: "pointer"
  },
  rightContentNavBar:{
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.only('sm')]: {
      width: 'auto'
    },
  },
  search: {
    marginLeft: 20,
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0
    },
  },
  searchHidden:{
    marginLeft: 20,
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20
    },
  },
  navbarItem: {
    alignSelf: 'center',
    color: 'black',
    marginRight: '20px',
    fontSize: '15px'
  },
  navbarLink: {
    textDecoration: 'none',
    color: '#545659',
  },
  bigAvatar: {
    width: 40,
    height: 40,
  },
  buttonLogin:{
    marginRight: '20px',
    border: '1px solid rgba(255, 255, 255, 1)'
  },
  leftContainer:{
    width: '100%',
    display: 'flex',
    justifyContent:'space-between',
    marginTop: 10,
    marginBottom:10,
    [theme.breakpoints.between('sm', 'xl')]: {
      width: 'auto'
    },
  },
  textBlack:{
    color: 'black',
    margin: 0,
    fontSize: 'initial',
    [theme.breakpoints.down('xs')]: {
      color: 'black',
      textDecoration: 'none',
    },
  },
  textWhite:{
    color: 'white',
    margin: 0,
    fontSize: 'initial',
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      color: 'white',
      textDecoration: 'none',
    },
  },
  navbarLinkMobile: {
    color: 'black',
    textDecoration: 'none',
  },
  theavatarbutton: {
    width: 45,
    height: 45,
  },
  navbarLinkAvatar: {
    color: 'black',
    textDecoration: 'none',
    marginTop: '8%!important',
  },
  lemenuavatar: {
    marginTop: '2.5%!important',
    marginLeft: '1%!important',
  },
  iconWhite:{
    color: 'white'
  },
  iconBlack:{
    color: 'black'
  }
})
