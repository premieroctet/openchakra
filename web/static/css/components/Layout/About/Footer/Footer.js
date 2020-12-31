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
    display: 'flex',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    }
  },
  mainContainerWidth:{
    width: '90%',
    display:'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]:{
      width: '100%',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    }
  },
  marginLink:{
    marginLeft: 20,
    marginRight: 20,
    [theme.breakpoints.down('xs')]:{
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0,
      marginRight:0
    }
  }
})
