const style=theme => ({
  scrollMenuIndicator: {
    backgroundColor: theme.palette.secondary.main,
  },
  scrollMenuTab: {
    textTransform: 'initial',
  },
  hiddenMobile: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  hidden: {
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
  buttonResa: {
    color: 'white',
    textTransform: 'initial',
  },
  dialogPreviewPaper: {
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
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
  buttonDetail: {
    textTransform: 'initial',
  },

})
export default style
