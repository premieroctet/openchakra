export default theme => ({
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2,
  },
  policySizeContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  sizeSchedulle: {
    '& .rbc-month-view': {
      borderRadius: 4,
    },
    '& .rbc-month-row': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .rbc-date-cell': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      height: '100%',
    },
    '& .rbc-row-content': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    },
    '& .rbc-row-content .rbc-row:nth-child(2)': {
      position: 'absolute',
      width: '100%',
      top: 0,
    },
    '& .rbc-day-bg rbc-off-range-bg': {
      display: 'none',
    },
    '& .rbc-header': {
      padding:0,
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'inherit !important',
      },
    },
    '& .rbc-event': {
      backgroundColor: 'transparent',
    },
    '& .rbc-row-segment': {
      padding: 0,
    },
    '& .rbc-allday-cell':{
      display : 'none'
    }
  },
  heightContainer: {
    [theme.breakpoints.down('xs')]: {
      height: 'inherit !important',
    },
  },
  labelSelector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '&:hover': {
      backgroundColor: 'rgba(79, 189, 215,0.5)',
      borderRadius: 50,
      width: 35,
      height: 35,
      color: 'white',
    },
  },
  labelSelectorActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4fbdd7',
    borderRadius: 50,
    width: 35,
    height: 35,
    color: 'white',
  },
  containerLabelSelector: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  customToolbarStyle: {
    display: 'flex',
    width: '100%',
    marginBottom: 5,
  },
  off_range_style: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white',
  },
  today_style_avail: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today_style_off: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'lightgray',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today_style: {
    borderRadius: 50,
    width: 25,
    height: 25,
    border: '1px solid black',
  },
  day_style: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer',
  },
  non_available_style: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    background: 'repeating-linear-gradient(45deg, lightgrey 48%, #FFFFFF  50%,lightgrey 51%)'
  },
  myEventWrapperStyle: {
    borderTop: '25px solid pink',
    borderRight: '25px solid transparent',
    height: 0,
    width: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    marginLeft: 1,
  },


})
