export default theme => ({
  flexContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelContent: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
  priceContent: {
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      textAlign: 'end',
    },
  },
})
