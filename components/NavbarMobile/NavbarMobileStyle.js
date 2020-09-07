export default theme => ({
  bottombar: {
    width: 'auto',
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  root: {
    minWidth: 'inherit',
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.70rem',
    },
  },

})
