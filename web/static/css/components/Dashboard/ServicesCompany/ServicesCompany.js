export default theme => ({
  listIstemPadding:{
    paddingTop: 20,
    paddingBottom: 20
  },
  chip: {
    margin: 2,
  },
  formControl:{
    width: 250
  },
  dialogPaper:{
    width: 600,
  },
  selectedMenu:{
    whiteSpace: 'inherit'
  },
  configService:{
    minWidth: 600
  },
  textField:{
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordionStyle:{
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2)'
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
})
