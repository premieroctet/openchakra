export default theme => ({

  mainContainer:{
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    display: 'flex',
    width: '100%'
  },
  contentLeftTop:{
    width : '100%',
  },
  contentTitle:{
    width: '100%'
  },
  contentTextSize:{
    width : 500,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
})
