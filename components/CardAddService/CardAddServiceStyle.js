export default theme => ({
  card: {
    width: 400,
    height:400,
    marginBottom: '5%',
    [theme.breakpoints.down('xs')]: {
      width:'100%'
    },
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
    height: 100,
  },
  textStyle:{
    color: '#4fbdd7',
    fontWeight: 'bold',
    fontSize: 'large'
  }
})
