
export default theme =>({
  root: {
    width: '100%',
  },
  appBar:{
    boxShadow: 'inherit'
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
    color: '#545659',
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
  }
})
