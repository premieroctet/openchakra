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
      width: '90%',
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
    '& .rbc-month-view':{
      borderRadius: 10
    },
    '& .rbc-month-row':{
      borderRadius:'0px 0px 10px 5px',
      display:'flex',
      justifyContent: 'center'
    },

    '& .rbc-date-cell':{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      height: '100%'
    },
    '& .rbc-row-content':{
      display:'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center'
    },
    '& .rbc-row-content .rbc-row:nth-child(2)':{
      position: 'absolute',
      width: '100%',
      top: 0
    },
    '& .rbc-day-bg rbc-off-range-bg':{
      display : 'none'
    },
    '& .rbc-header':{
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'inherit !important'
      },
    },
    '& .rbc-event':{
      backgroundColor: 'transparent'
    },
    '& .rb-day-bg':{
      height: '100px !important'
    },
    '& .rbc-row-segment':{
      padding:0
    },
  },
  heightContainer:{
    [theme.breakpoints.down('xs')]:{
      height: 'inherit !important'
    }
  },
  contentEndTime:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: 20
  },
  contentDateAndTime:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  labelSelector:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%',
    '&:hover':{
      backgroundColor: '#4fbdd7',
      borderRadius: 50,
      width:50,
      height: 50,
      color: 'white'
    }
  },
  labelSelectorActive:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4fbdd7',
    borderRadius: 50,
    width:50,
    height: 50,
    color: 'white'
  },
  containerLabelSelector:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor:'pointer'
  }


})
