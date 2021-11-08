export default theme => ({
  mainContainerAdressFactu: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 200,
      marginTop: '2vh',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 400,
      marginTop: '2vh',
    },

  },

  addressAndFactContainer: {
    width: '90%',
    marginBottom: '10vh',
    [theme.breakpoints.down('md')]: {
      marginBottom: '15vh',
    },
  },
  addressAndFactuMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '5%',
    paddingLeft: '5%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  adandfaccontainer: {
    backgroundColor: 'white',
    borderRadius: 27,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    paddingLeft: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  divider: {
    height: 2,
    borderRadius: 10,
    width: '50%',
    backgroundColor: 'rgba(210, 210, 210, 0.5)',
  },
})
