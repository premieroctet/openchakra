export default theme => ({
  currentmsg: {
    backgroundColor: 'rgb(47, 188, 211)',
    width: 'auto',
    maxWidth: '400px',
    height: 'auto',
    lineHeight: '1.5',
    color: 'white',
    borderRadius: '50px 50px 5px 50px',
    boxShadow: '0px 0px 6px #4545454f',
    margin: '10px 10px',
    overflowWrap: 'break-word',
    padding: '10px 20px',
    textAlign: 'justify',
  },
  othermsg: {
    backgroundColor: '#F87280',
    width: 'auto',
    maxWidth: '400px',
    height: 'auto',
    lineHeight: '1.5',
    color: 'white',
    borderRadius: '50px 50px 50px 5px',
    boxShadow: '0px 0px 6px #4545454f',
    margin: '10px 10px',
    overflowWrap: 'break-word',
    padding: '10px 20px',
    textAlign: 'justify',
    marginLeft: '38px',
  },
  current: {
   display: 'flex',
    justifyContent:'flex-end',
    color:'rgba(39,37,37,35%)'
  },
  sender:{
    display: 'flex',
    justifyContent: 'flex-start',
    color:'rgba(39,37,37,35%)'
  },
  currentUser:{
    display: 'flex',
    flexDirection:' column',
    backgroundColor: 'rgba(198,215,250,100%)',
    borderRadius: '30px 30px 5px 30px',
    width: '50%',
    padding: '5%',
    marginTop: '1vh',
    marginBottom: '1vh',
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }

  },
  senderUser:{
    display: 'flex',
    flexDirection:' column',
    backgroundColor: 'rgba(222,219,219,100%)',
    borderRadius: '30px 30px 30px 5px',
    width: '50%',
    padding: '5%',
    marginTop: '1vh',
    marginBottom: '1vh',
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    }
  },
  currentUserContainer:{
    display:'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'end',
  },
  senderUserContainer:{
    display:'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'start',
  }
})
