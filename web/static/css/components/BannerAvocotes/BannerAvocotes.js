export default theme => ({
  container: {
    backgroundColor: '#0D5169',
    width: '100%',
    height: '60vh',
    margin: 0,
    [theme.breakpoints.down('sm')]:{
      height: '80vh'
    },
  },
  title: {
    color: 'white',
    margin: 0,
  },
  subtitle: {
    color: 'white',
    margin: 0,
  },
  imgEquipment: {
    height: 300,
    width: '100%',
  },
  containerImgAndTitle: {
    paddingLeft: '10% !important',
    paddingRight: '10% !important',
  },
})
