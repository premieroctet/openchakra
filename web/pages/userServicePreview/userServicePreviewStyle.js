export default theme => ({
  mainContainer: {
    marginTop: 100,
    marginLeft: 200,
    marginRight: 200,
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  badge: {
    color: 'white',
  },
  boxRating: {
    margin: 0,
  },
  rating: {
    marginLeft: -15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 'large',
    },
  },
  responsiveListContainer: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  noPadding: {
    padding: 0,

  },
  minWidth: {
    minWidth: 30,
  },
  sizeText: {
    fontSize: 'small',
  },
  flexPosition: {
    display: 'flex',
  },
  itemAvatar: {
    flexDirection: 'column',
  },
  avatarLetter: {
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
    fontSize: 20,
  },
  skillsContentContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  leftContainer: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  contentRight: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 100,
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
  borderContentRight: {
    border: '2px solid #d2d2d2',
    borderRadius: 30,
    marginRight: 100,
    marginLeft: 100,
    padding: '3%',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
      marginLeft: 50,
      marginRight: 50,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 50,
      marginLeft: 50,
      marginBottom: 20,
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  hrStyle: {
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  imageStyle: {
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    },
  },
  buttonReservation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 50,
  },
  showReservation: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconButtonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      height: 50,
      width: 50,
    },
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    },
  },
  drawerContent: {
    marginTop: 20,
  },
  avatarAnDescription: {
    display: ' flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
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
  itemListContainer: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  middleHr: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  scheduleContainer: {
    marginTop: 30,
  },
  scheduleContainerTitle: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  basketMinimumContainer: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  textContentBasket: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
  },
  priceBasketContent: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  delayPrevenance: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  textContentDelay: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
  },
  delayPrevenanceContent: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  perimeterContent: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  textContentPerimeter: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
  },
  bookingConditionContent: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  bookingConditionContentTitle: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 15,
    },
  },
  listStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  commentaryContent: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 100,
    },
  },
  equipmentsContainer: {
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 100,
    },
  },
  textEquipments: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
  },
  marginRight: {
    marginRight: 20,
  },
  textField: {
    width: 70,
  },
  datePickerStyle: {
    borderRadius: 5,
    border: '2px solid #d2d2d2',
    height: 30,
    boxShadow: '1px 1px 1px 1px gainsboro',
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
