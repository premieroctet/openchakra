export default theme => ({
  bottombar:{
    width: 'auto',
    backgroundColor : 'rgba(180,180,180, 0.4)',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }},
  bottomNavigationAction:{
  }
})
