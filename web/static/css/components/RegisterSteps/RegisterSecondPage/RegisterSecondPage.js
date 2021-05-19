export default theme => ({
  margin: {
    margin: theme.spacing(1),
    width: '100%',
  },
  genericContainer: {
    width: '100%',
    justifyContent: 'center',
    margin: 0
  },
  subtitle: {
    fontSize: '1.2rem',
    width: '100%',
    marginTop: 15,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'center',
  },
  textFieldAlgo: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
  },
  datenaissance: {
    marginTop: 20,
    width: '100%',
  },
  newContainer: {
    padding: '5%',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  colorIcon: {
    color: 'rgba(84,89,95,0.95)',
  },
  buttonCGU:{
    textTransform: 'initial'
  }
})
