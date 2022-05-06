const Style = theme => ({
  iosSwitchContainer: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  },
  containerButtonSave: {
    [theme.breakpoints.down('lg')]: {
      marginBottom: '12vh',
    },
  },
  buttonSave: {
    textTransform: 'initial',
    color: 'white',
    fontWeight: 'bold',
  },
  containerLayoutAccount: {
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
      color: 'rgba(248,207,97,1)',
      '& + $track': {
        backgroundColor: 'white',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: 'rgba(248,207,97,1)',
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
module.exports=Style
