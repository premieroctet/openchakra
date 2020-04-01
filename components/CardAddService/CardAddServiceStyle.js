export default theme => ({
  card: {
    width: '100%',
    height: 450,
    [theme.breakpoints.down('lg')]: {
      height: 400
    },
    [theme.breakpoints.down('md')]: {
      height: 400
    },
    [theme.breakpoints.down('sm')]: {
      height: 500
    },
    [theme.breakpoints.down('xs')]: {
      height: 'auto'
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundImage:  "url(" + "../../static/assets/img/skillsAlfred/bgCardAddService.svg" + ")",
    display: 'block',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    position: 'relative',
    height:300
  },
  fab: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    margin: theme.spacing(1),
  },
  textPosition:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  textStyle:{
    color: '#4fbdd7',
    fontWeight: 'bold',
    fontSize: 'large'
  }
})
