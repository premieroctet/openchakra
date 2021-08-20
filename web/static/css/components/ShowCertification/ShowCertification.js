export default theme => ({
  certifIcon: {
    color: '#696767',
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
  },
})
