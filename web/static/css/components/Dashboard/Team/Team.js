export default theme => ({
  searchSelectPadding:{
    paddingRight: '34px !important'
  },
  searchFilterRightContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchFilterRightLabel:{
    marginRight: 10
  },
  formControl:{
    width: 250
  },
  dialogPaper:{
    minWidth: 600,
    maxWidth: 'inherit'
  },
  textField: {
    width: '100%'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  listChipContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  }
})
