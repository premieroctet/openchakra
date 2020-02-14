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
  contentLeftTop:{
    width : '100%',
    [theme.breakpoints.down('md')]: {
      display:'flex',
      flexDirection: 'column',
    },
  },
  contentLeft:{
    width: '100%',
    height : '100%',
    display: 'flex',
    flexDirection : 'column',
  },
  contentTitle:{
    width: '100%'
  },
  contentTextSize:{
    width : 500,
    [theme.breakpoints.down('md')]: {
      width: '100%',
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
  policySizeSubtitle:{
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color :'#484848',
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
  options:{
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100
    },
  }

})
