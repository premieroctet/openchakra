const style=theme => ({
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',

    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  diplomaIcon: {
    color: '#696767',
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
  },
})
export default style
