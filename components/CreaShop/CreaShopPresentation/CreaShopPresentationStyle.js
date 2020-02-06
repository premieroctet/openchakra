export default theme => ({

  mainContainer:{
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    display: 'flex',
    height: 700,
    width: '100%'
  },
  contentLeft:{
    width: '60%',
    height : '100%',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between'
  },
  contentRight: {
    width: '40%',
    height: '100%',
    backgroundColor: 'green'
  },
  contentLeftTop:{
    width : '100%',
    backgroundColor: 'blue'
  },
  contentLeftFooter:{
    width: '100%',
    backgroundColor: 'yellow',
  },
  contentTitle:{
    width: '100%'
  }
})
