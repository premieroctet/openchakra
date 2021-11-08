export default theme => ({
  layoutAccountContainer: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  layoutMobileContainer: {
    [theme.breakpoints.only('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.only('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
  },

})
