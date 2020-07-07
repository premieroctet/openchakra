export default theme => ({
  bigContainer: {
    marginTop: 80,
    minHeight: 530
  },

  media: {
    height: "250px!important",
    position: 'relative',
    objectFit: 'cover',
  },
  respfilter:{
    position: 'fixed',
    top: 65,
    zIndex: 10,
    background: 'white',
    height: 60,
    [theme.breakpoints.down('sm')]: {
      top: 65,
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
    marginTop: 70,
    [theme.breakpoints.down("xs")]: {
      marginTop: 200
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
  },
  containerCardPreview:{
    padding: 5
  },
  paddingResponsive:{
    [theme.breakpoints.down("xs")]: {
      padding: '0 !important',
      marginBottom: 20
    }
  }
})
