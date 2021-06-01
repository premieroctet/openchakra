export default theme => ({
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important',
    },
  },
  navbarMuidialogContent: {
    padding: 0,
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  socialAndLegalContainer:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column-reverse',

    }
  },
  legalContainer:{
    margin: 0,
    width: '100%',
    [theme.breakpoints.down('sm')]:{
      display: 'flex',
      justifyContent: 'center'

    }
  },
  socialContainer:{
    margin: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]:{
      justifyContent: 'center',
    }
  },
  containerSectionFooter:{
    width:'100%',
    margin:0,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]:{
      textAlign: 'center'
    }
  },
  storeContainer:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      justifyContent: 'center',
      flexDirection: 'column'
    }
  },
  hiddenOnMobile:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  }

})
