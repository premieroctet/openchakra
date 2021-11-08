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
  margin: {
    margin: theme.spacing(1),
  },
  titleContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
})
