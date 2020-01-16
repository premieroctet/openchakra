export default theme => ({
  card: {
    width: 400,
    marginBottom: '5%'
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
    backgroundImage:  "url(" + "../../static/assureback.jpg" + ")",
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  },
  button: {
    margin: theme.spacing(1),
  },
  boxRating:{
    margin: 0,
  },
  checkCircleIcon:{
    marginLeft: 5,
},
  rating:{
    marginLeft: -15
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
  }},
  chipStyle:{
    backgroundColor: '#f87280',
    color:'white',
    fontWeight: 'bold',
    border: '2px solid white'
  },

});

