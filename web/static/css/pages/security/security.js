export default theme => ({
  textfield: {
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  buttonSave: {
    textTransform: 'initial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
  },
  layoutAccounContainer: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  layoutMobileContainer: {
    [theme.breakpoints.only('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.only('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
  root: {
    width: 72,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(46px)',
      color: theme.palette.secondary.main,
      '& + $track': {
        backgroundColor: 'white',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.secondary.main,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
})
