export default theme => ({
  margin: {
    margin: theme.spacing(1),
    width: '100%',
  },
  genericContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  flexContainerPics: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  colorIcon: {
    color: 'rgba(84,89,95,0.95)',
  },
  widthTextField: {
    width: '70%',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
})
