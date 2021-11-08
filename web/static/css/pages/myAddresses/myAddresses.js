export default theme => ({
  hideOnlyMobile: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  hideOnLaptop: {
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
