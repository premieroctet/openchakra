export default theme => ({
  policySizeTitle: {
    fontSize: 24,
    lineHeight: '1.25em',
    color: '#696767',
  },
  policySizeSubtitle: {
    color: '#696767',
  },
  policySizeContent: {
    color: '#696767',
  },
  chipsContainer:{
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  inputFileContainer:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  buttonUpload:{
    color: 'white',
    textTransform: 'initial',
    fontWeight: 'bold'
  },
  titleContainer:{
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
      justifyContent: 'center'
    }
  }
})
