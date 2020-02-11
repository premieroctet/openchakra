export default theme => ({
  mainContainer:{
    width: '100%',
    height: '100%',
  },
  contentContainer:{
    display: 'flex',
    height: 'auto',
    width: '100%'
  },
  contentLeftTop:{
    width : '100%',
  },
  contentTitle:{
    width: '80%',
  },
  contentTextSize:{
    width : 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
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
  policySizeStep:{
    fontFamily: 'Signatra',
    fontSize: 30
  },
  policySizeSubtitle:{
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color :'#484848',
  },
  policySizeContent:{
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
  hrStyle:{
    color : '#BCBCBC'
  }
})
