export default theme => ({
  albumContainerHeader:{
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
      [theme.breakpoints.down('md')]:{
        flexDirection: 'column',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
        borderRadius: 10,
      }
  },
  albumTitleContainer:{
    [theme.breakpoints.down('md')]:{
      display : 'none'
    }
  }
})
