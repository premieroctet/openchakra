export default theme => ({
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
  messagesDialog:{
    width: 600,
    position:'relative'
  },
  dialogActionRoot:{
    display: 'initial',
    padding: '5%'
  }
})
