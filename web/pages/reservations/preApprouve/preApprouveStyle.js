export default theme => ({
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
    },
  },
  dispocard: {
    minHeight: '100px',
    width: '200px',
    textAlign: 'center',

    boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
    border: 'solid 1px #ccc',
    borderRadius: '10px',
  },
  avatarLetter: {
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
})
