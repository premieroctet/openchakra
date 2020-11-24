export default theme => ({
  navigationRoot:{
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
    borderRadius: 10,
  },
  navigationActionRoot:{
    paddingTop: '6px !important',
    minWidth: 'inherit',
    maxWidth: 'inherit',
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
})
