export default theme => ({
  mainContainer:{
    width: '100%',
    height: '100%',
  },
  contentContainer:{
    display: 'flex',
    height: 700,
    width: '100%'
  },
  contentLeftTop:{
    width : '100%',
    [theme.breakpoints.down('md')]: {
      display:'flex',
      flexDirection: 'column',
    },
  },
  contentTitle:{
    width: '80%',
  },
  contentTextSize:{
    width : 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100
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
  policySizeStep:{
    fontFamily: 'Signatra',
    fontSize: 30
  },
  policySizeSubtitle:{
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color :'#484848',
  },
  policySizeContent:{
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  hrStyle:{
    color : '#BCBCBC'
  },
  textFieldSelecteService:{
    width : 500,
    [theme.breakpoints.down('md')]: {
      width: 300
    },
  },
  bottomSpacer:{
    width : 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  options:{
    [theme.breakpoints.down('lg')]: {
      marginBottom: 100
    },
  },
  button:{
    width : '60%',
    backgroundColor: 'white',
    border: '1px solid #4fbdd7',
    borderRadius: 25,
    height : 30,
    textAlign: 'left',
    cursor: 'pointer',
    '&:hover':{
      backgroundColor: '#4fbdd7',
      color: 'white'
    },
  },
  activeButton:{
    width : '60%',
    backgroundColor: '#4fbdd7',
    border: '1px solid #4fbdd7',
    borderRadius: 25,
    height : 30,
    textAlign: 'left',
    cursor: 'pointer',
    color: 'white'
  },
  buttonRemove: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: "center",
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
    },
  },
  buttonAdd: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: "center",
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 25,
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
    },
  },
  selectDelayInputRepsonsive: {
    zIndex: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
  contentAddandRemove:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  subContentAddanRemove:{
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  contentCityReferency:{
    border: '1px solid #C6C6C6',
    width:'60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  buttonContent:{
    display:"flex",
    justifyContent:"flex-end"
  },
  styleButton:{
    color:"white",
    borderRadius:"unset"
  },
  contentIntervention:{
    [theme.breakpoints.down('md')]: {
      marginBottom : 100
    }
  },
  contentAddandRemoveKm:{
    display: 'flex',
    alignItems : 'center'
  },
  subContentAddanRemoveKm:{
    display: 'flex',
    alignItems : 'center'
  },
  contentKilometers:{
    [theme.breakpoints.down('sm')]: {
      width : '100%'
    }
  },
  inputDiplomaCertifResp:{
    width: '50%',
    marginRight: '5%',
    zIndex:0,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  textField:{
    width: '50%',
    zIndex:0,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  describExperience:{
    zIndex:0,
    width:'100%'
  },
  texfieldContentWelcomedMessage:{
    width: '100%',
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: 'white'
  },
  margin: {
    margin: theme.spacing(1),
    color: 'white'
  },
  maxWidth:{
    width : '100%'
  },
  buttonAddPrestas:{
    display: 'flex',
    marginTop: 30,
    marginBottom: 100
  },
  marginThirty:{
    marginBottom: 30,
    marginTop: 30
  },
  containerPrestas:{
    marginTop: 30,
    width: '100%'
  }

})
