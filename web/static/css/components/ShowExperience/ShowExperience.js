const style=theme => ({
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  containerIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      right: 0,
    },
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  containerExpPics: {
    width: '100%',
    height: 150,
  },
  expPics: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 20,
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
  },
  workIcon: {
    color: '#696767',
  },
})
export default style
