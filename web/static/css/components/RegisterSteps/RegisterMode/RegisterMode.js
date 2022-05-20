const style=theme => ({
  active: {
    backgroundColor: theme.palette.primary.main,
    textTransform: 'initial',
    color: 'white',
    fontSize: '16px',
    borderRadius: '40px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  inactive: {
    textTransform: 'initial',
    borderRadius: '40px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },

})
export default style
