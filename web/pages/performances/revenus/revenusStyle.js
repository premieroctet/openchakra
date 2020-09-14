export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
      marginTop: 0,
    },
  },
  hidesm: {
    minWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hidelg: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  trigger: {
    [theme.breakpoints.down('sm')]: {
      marginTop: -10,
      width: '100%',
      marginLeft: '0px',
      height: '30px',
      backgroundColor: '#2FBCD3',

      display: 'block',
      transition: 'display 0.7s',
      borderRadius: '5px',
      '&:focus': {
        display: 'none',
        transition: 'display 0.7s',

      },
    },
  },
  toggle: {
    zIndex: 0,
    margin: 15,
  },
  thechart: {
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
  therevenus: {
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  myRevenu: {
    paddingLeft: '20%',
    marginBottom: '20px',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: 20,
    },
  },
  mainContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },

})
