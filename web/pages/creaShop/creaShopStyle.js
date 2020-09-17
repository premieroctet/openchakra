export default theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  marginContainer: {
    position: 'relative',
    marginLeft: 200,
    marginRight: 200,
    top: 150,
    [theme.breakpoints.down('md')]: {
      top: 150,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
      marginRight: 40,
    },
  },
  mainHeader: {
    width: '100%',
    display: 'flex',
    position: 'fixed',
    zIndex: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      height: 150,
    },
    [theme.breakpoints.down('xs')]: {
      height: 150,
    },
  },
  imageContentHeader: {
    width: '10%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '20%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
  contentStepper: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  leftContentComponent: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  mainContainerNoImg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 250,
  },
  rightContentComponent: {
    width: '40%',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  contentRight: {
    width: 'auto',
    height: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',

  },
  footerMainContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
    zIndex: 4,
  },
  footerContainer: {
    height: '100%',
    width: '100%',
  },
  marginHr: {
    marginLeft: 200,
    marginRight: 200,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  navButtonContent: {
    display: 'flex',
    marginRight: 200,
    marginLeft: 200,
    justifyContent: 'space-between',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
      marginRight: 40,
    },
  },
  nextButton: {
    color: 'white',
  },
  /***DrawerAndSchedule***/
  drawerAndSchedule_mainContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  drawerAndSchedule_scheduleContainer:{
    width: '65%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  drawerAndSchedule_drawerScheduleContainer:{
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: 0
    },
  },
  drawerScheduleDrawerPaper:{
    top: 'inherit',
    left: 'auto',
    position: 'relative',
    height: '100%',
    borderRight: 'inherit',
    zIndex: 1,
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      margin: 0,
      width: '100%',
      height: '100%',
      padding: '5%',

    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
      flexShrink: 0,
    },
  },
  drawerScheduleButton:{
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
      borderRadius: 5
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
    height: 325
  },
  schedule_monthDateHeaderLabelOldDay:{
    color: '#999999'
  },
  schedule_containerToolbar:{
    alignItems: 'center',
  }
})
