export default theme => ({
  contentFiltre: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 50,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  responsiveIOSswitch: {
    display: 'flex',
    alignItems: 'center',
  },
  responsiveIOSswitchContent: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  textField: {
    width: '70px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
})
