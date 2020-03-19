export default theme =>({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      marginRight: 20
    },
    searchIcon: {
      width: theme.spacing(9),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing,
      paddingRight: theme.spacing,
      paddingBottom: theme.spacing,
      paddingLeft: theme.spacing(10),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
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
      [theme.breakpoints.up('md')]: {
        display: 'none',
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
    navbarLinkMobile: {
      color: 'black',
      textDecoration: 'none',
    },
    navbarLinkAvatar: {
      color: 'black',
      textDecoration: 'none',
      marginTop: '8%!important',
    },
    bigAvatar: {
      width: 40,
      height: 40,
    },

    lemenuavatar: {
      marginTop: '2.5%!important',
      marginLeft: '1%!important',
    },
})
