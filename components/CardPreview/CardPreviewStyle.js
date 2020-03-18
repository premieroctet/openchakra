export default theme => ({
  card: {
    width: '100%',
    height: 'auto',
},
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  },
  button: {
    margin: theme.spacing(1),
    color: 'white'
  },
  boxRating:{
    margin: 0,
  },
  checkCircleIcon:{
    marginLeft: 5,
    color: '#4fbdd7',
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    }
  },
  rating:{
    marginLeft: -15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 'large'
    }
  },
  actionMediaEdit:{
    position: 'absolute',
    top : '5%',
    right: '18%',
    [theme.breakpoints.down('sm')]: {
      right: '20%',
    }
  },
  actionMediaRemove:{
    position: 'absolute',
    top : '5%',
    right: '5%',
    [theme.breakpoints.down('sm')]: {
      right: '5%'
    }
  },
  statusMedia:{
    position: 'absolute',
    top: '5%',
    left: '5%'
  },
  iconButtonStyle:{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'white',
    },
    [theme.breakpoints.down('sm')]: {
        height:50,
        width:50,
  },
    [theme.breakpoints.down('xs')]: {
      height:20,
      width:20,
    }
  },
  chipStyle:{
    backgroundColor: '#f87280',
    color:'white',
    fontWeight: 'bold',
    border: '2px solid white'
  },
  badgeStyle:{
    color: "white",
    '& span:nth-child(+n+6)':{
    }
  },
  cardContent:{
    display:'flex',
    flexDirection:'row',
    height: 85
  },
  cardContentPosition:{
    width: '50%',
    display:'flex',
    flexDirection:'column'
  },
  cardContentHeader:{
    display:'flex',
    marginBottom: '2%'
  },
  cardContentRight:{
    width:'50%',
    display:'flex',
    flexDirection:'column',
    alignItems: 'flex-end',

  },
  flexPosition:{
    display:'flex',
    alignItems : 'center'
  },
  minWidth:{
    minWidth:30
  },
  noPadding:{
    padding:0

  },
  imageStyle: {
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20,
    }
  },
  sizeText: {
    fontSize: 'small',
  },
  responsiveListContainer:{
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height:'auto'
    },
  },
  avatar:{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  avatarLetter:{
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
  contentDistanceUnderAvatar:{
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  },
  sizeTextUnderAvatar:{
    fontWeight: 'bold',
    color: 'white',
    textShadow: 'black 0px 0px 3px'
  }
});

