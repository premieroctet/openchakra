export default theme => ({
  modalContainer:{
    position: 'absolute',
    width: 700,
    backgroundColor: 'white',
    border: '2px solid #4fbdd7',
    padding: '2%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft:0,
      marginRight: 0,
      marginBottom: '5%',
      marginTop:'5%'
    },
  },
  contentTimeSlot:{
    justifyContent: 'space-around',
    alignItems: 'baseline',
    marginTop: 20,
    marginBottom: 20
  },
  textFieldButton: {
    color : 'white',
    margin: theme.spacing(1),
  },
  textFieldChips: {
    color: 'white'

  },
  textFieldDefaultChips: {
    color : 'black'
  },
  formSchedule:{
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%'
    },
  },
  panelForm:{
    alignItems: 'end',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
  },
  panelFormDays:{
    width : '250px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  panelFormRecu:{
    width : '250px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '10%'

    },
  },
  containerRecurrence:{
    width:'100%',
    [theme.breakpoints.down('xs')]: {
      display:'inherit',
    },
  },
  policySizeTitle:{
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  },
  policySizeContent:{
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  sizeSchedulle:{
    '& .rbc-toolbar':{
      flexDirection: 'column'
    }
  }
})
