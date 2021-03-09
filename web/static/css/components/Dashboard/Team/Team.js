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
    width: 600,
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
})
