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
  },
  contentTitle:{
    width: '80%'
  },
  contentTextSize:{
    width : 500,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  buttonRemove: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: "center",
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 25
  },
  buttonAdd: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: "center",
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 25,
    marginRight: 25
  },
  selectDelayInputRepsonsive: {
    [theme.breakpoints.down('sm')]: {
      width: '100%!important',
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
  policySizeContent:{
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
  },
})
