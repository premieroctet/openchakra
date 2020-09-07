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
    color: '#6a6a6c',
    fontSize: '0.8rem',
    float: 'right',
    marginRight: '10px',
  },
  send: {
    right: '7%',
    [theme.breakpoints.down('sm')]: {
      right: '10%',
    },
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-moz-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-moz-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.25)',
      outline: '1px solid slategrey',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.25)',
      outline: '1px solid slategrey',
    },
  },
  Rightcontent: {
    marginLeft: '4%',
    marginTop: 100,
  },
  toggle: {
    zIndex: 0,
    [theme.breakpoints.down('xs')]: {
      marginTop: 70,
    },
  },
  mobilerow: {
    boxShadow: '0 5px 5px -5px rgba(51, 51, 51, 0.29)',
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
  },
  avatarLetter: {
    height: 65,
    width: 65,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  containerNewMessage: {
    justifyContent: 'space-between',
    width: '100%',
  },
  widthBar: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '30%',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})
