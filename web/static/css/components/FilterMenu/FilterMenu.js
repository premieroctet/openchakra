export default theme =>({

  filterMenuTitleContainer:{
    marginTop: '5%',
    textAlign: 'center'
  },
  filterMenuChipContainer:{
    marginTop: '2%',
    display: 'flex',

  },
  filterMenuDescription:{
    fontFamily: theme.typography.fontFamily
  },
  filTerMenuStatusMainStyleFilter:{
    width: '15%',
    [theme.breakpoints.down('md')]:{
      width: '50%'
    }
  },

  filterMenuContainerStatut:{
    borderRadius: '15px',
    backgroundColor: 'rgba(248, 207, 97, 1)',
    cursor: 'pointer',
    height: '45px',
  },
  filterMenuFocused:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.white.main
  },
  filterMenuTextFocused:{
    color: theme.palette.white.main
  },
  filterMenuContentMainStyle:{
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    height: 'auto',
    zIndex: 1,
    position: 'relative',
  },
  filterMenuControlLabel:{
    margin: 0,
    verticalAlign: 'inherit'
  },
  filterMenuStatusNotFocused:{
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    cursor: 'pointer',
    height: 45,
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filTerMenuStatusMainStyleFilterDate:{
    width: '15%',
    marginLeft: '2%',
    [theme.breakpoints.down('md')]:{
      width: '50%'
    }
  },
  filterMenuDateFocused:{
    borderRadius: '15px',
    backgroundColor: 'rgba(248, 207, 97, 1)',
    cursor: 'pointer',
    height: 45,

  },
  filterMenuContentMainStyleDateFilter:{
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px',
    height: 'auto',
    zIndex: 1,
    position: 'relative',
    padding: 10,
    width: '140%'
  },
  filterMenuDateFilterButtonContainer:{
    display: 'flex',
    justifyContent: 'space-evenly'
  },
})
