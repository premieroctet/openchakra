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
  },
  dialogTitleMessages:{
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    }
  },
  dialogTitleMessagesContent:{
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5vh',
    [theme.breakpoints.down('xs')]:{
      alignItems: 'center',
      margin: 0
    }
  },
  iconButton:{
    [theme.breakpoints.down('xs')]:{
      padding: 0
    }
  },
  avatarLetter:{
    width: 80,
    height: 80,
    margin: 'auto'
  }
})
