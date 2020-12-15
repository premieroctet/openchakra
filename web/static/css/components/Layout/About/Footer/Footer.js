export default theme => ({
  mainContainerFooter:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTop: '1px solid rgba(112,112,112,20%)',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column',
      alignItems: 'flex-end'
    }
  },
  rightMainContainerFooter:{
    display: 'flex'
  },
  mainContainerWidth:{
    width: '90%',
    display:'flex',
    justifyContent: 'space-between',
  },
  marginLink:{
    marginLeft: 20,
    marginRight: 20,
  }
})
