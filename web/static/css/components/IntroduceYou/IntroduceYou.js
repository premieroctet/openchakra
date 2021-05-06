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
  margin: {
    margin: theme.spacing(1),
  },
  titleContainer:{
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
      justifyContent: 'center'
    }
  }
})
