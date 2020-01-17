export default theme => ({
  card: {
    width: 400,
    height:400,
    marginBottom: '5%'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundImage:  "url(" + "../../static/assets/img/skillsAlfred/bgCardAddService.svg" + ")",
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  },
  fabPosition:{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  fab: {
    margin: theme.spacing(1),
  },
  textPosition:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  textStyle:{
    color: '#505050',
    fontWeight: 'bold'
  }
})
