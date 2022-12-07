const Style = theme => ({
  current: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'rgba(39,37,37,35%)',
  },
  sender: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'rgba(39,37,37,35%)',
  },
  currentUser: {
    display: 'flex',
    flexDirection: ' column',
    backgroundColor: 'rgba(198,215,250,100%)',
    borderRadius: '30px 30px 5px 30px',
    width: '50%',
    padding: '5%',
    marginTop: '1vh',
    marginBottom: '1vh',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

  },
  senderUser: {
    display: 'flex',
    flexDirection: ' column',
    backgroundColor: 'rgba(222,219,219,100%)',
    borderRadius: '30px 30px 30px 5px',
    width: '50%',
    padding: '5%',
    marginTop: '1vh',
    marginBottom: '1vh',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  currentUserContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  senderUserContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})
module.exports=Style
