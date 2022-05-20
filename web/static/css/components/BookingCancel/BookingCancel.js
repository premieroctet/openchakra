const style=theme => ({
  bigContainer: {
    flexGrow: 1,
    marginBottom: 50,
  },
  dispocard: {
    minHeight: '100px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
    border: 'solid 1px #ccc',
    borderRadius: '10px',
  },
  buttonCancel: {
    color: theme.palette.error.main,
  },
})
export default style
