export default theme => ({
  userServicePreviewWarningContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderContentRight: {
    border: '2px solid #d2d2d2',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]:{
      border: 'inherit'
    }
  },
  iconButtonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      height: 50,
      width: 50,
    },
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    },
  },
  datePickerStyle: {
    border: 'none',
    width: '100%'
  },
  rootAccordion:{
    boxShadow: 'inherit',
    padding: '4px 6px',
    border: '1px solid rgba(112,112,112,0.5)',
    borderRadius: '14px !important',
    width: '100%'
  },
  userServicePreviewAccordionDetails:{
    display: 'flex',
    flexDirection: 'column'
  },

  userServicePreviewAccordionNoShadow:{
    boxShadow: 'none'
  },


  userServicePButtonResa:{
    color: 'white !important',
    borderRadius: 14,
    textTransform: 'initial',
    padding: '5%',
    width: '100%'
  },
  mainDrawerBooking:{
    width: '80%',
    paddingTop: '5%',
    paddingBottom: '5%',
    [theme.breakpoints.down('xs')]:{
      width: '95%'
    }
  }
})
