export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
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
  responsiveContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '135%!important',
    },
  },
  toggle: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-75px',
      transition: 'margin-left 0.7s',
      '&:hover': {
        marginLeft: '0px',
        transition: 'margin-left 0.7s',
        boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
      },
    },
  },
  buttonAddaddress: {
    color: '#4fbdd7',
    marginTop: 15,
    borderColor: '#4fbdd7',
    backgroundColor: 'white',
    border: '1px solid',
    boxShadow: 'inherit',
    '&:hover': {
      backgroundColor: '#4fbdd7',
      color: 'white',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  containerLeft: {
    paddingLeft: 55,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'inherit',
    },
  },
  containerRightOfCity: {
    marginLeft: 20,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
})
