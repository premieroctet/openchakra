export default theme => ({
  contentFiltre: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  responsiveIOSswitch: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  responsiveIOSswitchContent: {
    display: 'flex',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'start',
    },
  },
  textField: {
    width: '70px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#C7D4EE',
      '& + $track': {
        backgroundColor: 'white',
      },
    },
    '&$focusVisible $thumb': {
      color: 'white',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
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
