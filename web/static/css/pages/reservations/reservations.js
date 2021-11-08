export default theme => ({

  descriptionContainer: {
    [theme.breakpoints.down('sm')]:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]:{
      justifyContent: 'flex-start',
    },

  },
  scrollMenuIndicator:{
    backgroundColor: theme.palette.secondary.main
  },
  scrollMenuTab:{
    textTransform: 'initial'
  },
  hiddenMobile:{
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  hidden:{
    [theme.breakpoints.only('xl')]:{
      display: 'none'
    },
    [theme.breakpoints.only('lg')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    }
  },
  detailButtonContainer:{
    width: '100%',
    margin: 0,
    display:'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]:{
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('sm')]:{
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xs')]:{
      justifyContent: 'center',
    },
  },
  alfredAmount:{
    [theme.breakpoints.down('md')]:{
      marginLeft: 15
    },
    [theme.breakpoints.down('sm')]:{
      marginLeft: 10
    }
  },
  buttonResa:{
    color: 'white',
    textTransform: 'initial',

  },
  reservationsMainContainer:{
    [theme.breakpoints.down('xs')]:{
      marginBottom: '12vh'
    }
  },

  bookingNameContainer:{
    [theme.breakpoints.down('sm')]:{
      textAlign: 'center'
    }
  },

  dialogPreviewPaper:{
    [theme.breakpoints.down('xs')]:{
      minWidth: '100%'
    }
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
  serviceName:{
    [theme.breakpoints.down('xs')]:{
      textAlign: 'center'
    }
  },
  buttonDetail:{
    textTransform: 'initial'
  }

})
