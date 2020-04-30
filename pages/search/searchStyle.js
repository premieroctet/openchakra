export default theme => ({
  bigContainer: {
    marginTop: 80,
    minHeight: 530
  },
  card: {
    margin: 20,
  },
  media: {
    height: "250px!important",
    position: 'relative',
    objectFit: 'cover',
  },
  respfilter:{
    position: 'sticky',
    top: 60,
    zIndex: 10,
    background: 'white',
    height: 60,
    [theme.breakpoints.down('sm')]: {
      top: 200,
    },
    [theme.breakpoints.down('xs')]: {
      top: 230
    }
  },
  mobilevoir: {
    [theme.breakpoints.up("md")]: {
      display: "none!important"
    }
  },
  webvoir: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important"
    }
  },
  DateInput_input__focused:{
    borderBottom: '1px solid #fb1515!important',
  },
  algol: {
    fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
    '::placeholder':{
      color: '#cfcfcf',
    },
    '&:hover':{
      border: '1px solid black!important',
      transition: 'border 0.5s',
    },
    '&:focus':{
      border: '2px solid #2FBCD3!important',
      transition: 'border 0.5s',
    }
  },
  separatorBlue:{
    width: '150px'
  },
  containerTitle:{
    [theme.breakpoints.down("xs")]: {
      marginTop: 160
    }
  },
  filterStatus:{
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    height: '100px',
    marginTop: 8,
    padding:10,
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      width: 200
    }
  }
})
