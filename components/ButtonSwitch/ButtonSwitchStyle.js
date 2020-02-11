export default theme => ({
  contentFiltre:{
    display:'flex',
    height:'50px',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      height:'90px',
    }
  },
  responsiveIOSswitch:{
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    }
  },
  responsiveIOSswitchContent:{
    display:'flex',
    width:'50%',
    alignItems: 'flex-end',
    justifyContent:'end',
    [theme.breakpoints.down('xs')]: {
      width:'50%',
    }
  },
  textField: {
    width: '70px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
})
