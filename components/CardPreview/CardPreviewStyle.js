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
    backgroundPosition: 'center'
  },
  button: {
    margin: theme.spacing(1),
  },
  boxRating:{
    margin: 0
  },
  checkCircleIcon:{
    marginLeft: 5
},
  rating:{
    marginLeft: -15
  }
});
