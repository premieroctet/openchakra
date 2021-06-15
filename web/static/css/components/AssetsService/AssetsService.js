export default theme => ({
  policySizeTitle: {
    fontSize: 24,
    lineHeight: '1.25em',
    color: '#403f3f',
    margin: 0,
  },
  policySizeSubtitle: {
    color: '#403f3f',
  },
  policySizeContent: {
    color: '#403f3f',
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  inputFileContainer: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  buttonUpload: {
    color: 'white',
    textTransform: 'initial',
    fontWeight: 'bold',
  },
  titleContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
})
