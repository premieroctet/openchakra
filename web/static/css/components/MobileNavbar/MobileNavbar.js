export default theme => ({
  navigationRoot:{
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
    borderRadius: 10,
  },
  navigationActionRoot:{
    minWidth: 'inherit',
    maxWidth: '20%',
    padding: '0px 2px !important',
    '& .Mui-selected':{
      fontSize: 10,
      fontWeight: 600,
      textOverflow: 'ellipsis !important',
      display: '-webkit-box !important',
      overflowWrap: 'break-word !important',
      maxHeight: '24px !important',
      overflow:' hidden !important',
      lineHeight: '12px !important',
    },
    '& .MuiSvgIcon-root':{
      height: '30px !important',
      marginBottom: '2px !important',
      padding:' 3px !important',
    }
  },
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important',
    },
  },
  navbarPaperWidth:{
    width: '100%',
  },
  navbarWidthLoginContent:{
    display: 'flex',
    justifyContent: 'center',
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
  label:{
    fontSize: 10,
    fontWeight: 600,
    textOverflow: 'ellipsis !important',
    display: '-webkit-box !important',
    overflowWrap: 'break-word !important',
    maxHeight: '24px !important',
    overflow:' hidden !important',
    lineHeight: '12px !important',
  },
  drawerStyle:{
    '& .MuiDrawer-paperAnchorBottom':{
      height: '50%'
    }
  },
  modalMobileSearchBarInputTextField:{
    width: '100%'
  },
  fitlerMenuLogged:{
    overflow: 'inherit',
    textOverflow: 'inherit',
    whiteSpace: 'inherit'
  },
  buttonNextRoot:{
    textTransform: 'initial',
    fontWeight:'bold',
    width: '100%',
    color:'white'
  },
  navbarAlgoliaPlace:{
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
    height: 'auto',
    [theme.breakpoints.down('xs')]:{
      padding: '18.5px 14px',
    }
  },
  modalMobileSearchBartTextFieldWhereP:{
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight:  theme.typography.placeHolder.fontWeight,
    lineHeight:  theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
    },
    '& .MuiInputBase-input::placeholder':{
      opacity: '0.5'
    },
    '& div':{
      width:'100%'
    }
  },
  rootIconButton:{
    paddingTop:0,
    paddingBottom: 0
  }
})
