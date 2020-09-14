export default theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  link: {
    color: '#4fbdd7',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  listStyle: {
    padding: 'inherit',
  },
  raiting: {
    marginBottom: 0,
    padding: 0,
  },
  iconStar: {
    color: '#4fbdd7',
  },
  titleAbout: {
    fontSize: '1.6rem',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  titleContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginBottom: 30,
    },
  },
  badge: {
    color: 'white',
  },
  boxRating: {
    padding: 0,
    margin: 0,
  },
});
