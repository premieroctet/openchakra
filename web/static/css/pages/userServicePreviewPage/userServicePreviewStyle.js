export default theme => ({
  mainContainer: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '12vh',
    [theme.breakpoints.down('xs')]:{
      marginTop: '5vh'
    }
  },
  itemAvatar: {
    flexDirection: 'column',
  },
  contentRight: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '8%'
  },
  avatarContainer: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
    },
  },
  buttonReservation: {
    position: 'fixed',
    bottom: '5px',
    width: '95%',
    height: 50,
    textTransform: 'initial',
    fontWeight: 'bold',
    zIndex:10,
    color:'white',
    borderRadius: 17
  },
  leftContainer:{
    paddingLeft: '5%',
    paddingRight: '5%',
    [theme.breakpoints.down('sm')]:{
      width: '90%'
    }
  },
  widthContainer:{
    width: '80%',
    [theme.breakpoints.down('xs')]:{
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  },
  showReservation: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },

  drawerContent: {
    marginTop: 20,
  },
  avatarAnDescription: {
    display: ' flex',
  },
  flexContentAvatarAndDescription: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  marginAvatarAndDescriptionContent: {
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
  scheduleContainer: {
    marginTop: '15%',
  },
  perimeterContent: {
    marginTop: '15%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  equipmentsContainer: {
    marginTop: '15%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 100,
    },
    '& .ListAlfredConditions-mainContainerListAlfred-144':{
      padding: '5%'
    }
  },

  userServicePreviewButtonProfil:{
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    borderRadius: theme.border.blackButton.borderRadius,
    textTransform: 'none',
    padding: '6px 24px'
  },

  /***Schedule**/

  schedule_scheduleMainStyle: {
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
    '& .rbc-allday-cell': {
      display : 'none'
    },
    '& .rbc-time-view': {
      borderRadius: 5,
      zIndex:0
    }
  },
  schedule_policySizeTitle: {
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
  schedule_policySizeContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  schedule_heightContainer: {
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: 'inherit !important',
    },
  },
  schedule_customToolbarStyle: {
    display: 'flex',
    width: '100%',
    marginBottom: 5,
  },
  schedule_non_available_style: {
    width: '100%',
    height: 'auto',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    background: 'repeating-linear-gradient(45deg, lightgrey 48%, #FFFFFF  50%,lightgrey 51%)'
  },
  schedule_timeSlotWrapper:{
    textAlign: 'center',
    width : '100%'
  },
  schedule_containerTimeSlotWrapper:{
    flex: '1 0 0'
  },
  schedule_myEventWrapperStyle:{
    borderTop: '25px solid pink',
    borderRight: '25px solid transparent',
    height: 0,
    width: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    marginLeft: 1,
  },
  schedule_today_style:{
    borderRadius: 50,
    width: 25,
    height: 25,
    border: '1px solid black',
  },
  style_today_style_off:{
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'lightgray',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedule_today_style_avail:{
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedule_day_style:{
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer',
  },
  schedule_off_range_style:{
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white',
  },
  schedule_labelSelectorActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4fbdd7',
    borderRadius: 50,
    width: 35,
    height: 35,
    color: 'white',
  },
  schedule_labelSelector: {
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
  schedule_monthDateHeaderLabel:{
    cursor: 'pointer',
    fontWeight: 'initial'
  },
  schedule_containerLabelSelector:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  schedule_height:{
    height: 450
  },
  schedule_monthDateHeaderLabelOldDay:{
    color: '#999999'
  },
  schedule_containerToolbar:{
    alignItems: 'center',
  },

  overrideCssChild:{
    '& .ListAlfredConditions-mainContainerListAlfred-144':{
      padding: '5%'
    }
  },
  hidden:{
    width: '100%'
  },
  contentRightContainer:{
    paddingLeft: '5%',
    paddingRight: '5%',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    },
    [theme.breakpoints.only('sm')]:{
      display: 'none'
    },
    [theme.breakpoints.only('md')]:{
      display: 'none'
    },
  }
})
