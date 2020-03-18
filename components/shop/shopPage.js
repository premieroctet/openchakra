export default theme =>({
  marginMainContainer:{
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 50,
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
  },
  aboutAndSkillsMainContainer:{
    display:'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0
    },
  },
  aboutContentContainer:{
    display:'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '3%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginTop: 0,
    },
  },
  skillsContentContainer:{
    display:'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
     width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 20
    },
  },
  servicesContainer:{
    display: 'flex',
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'column',
    marginTop: '3%',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  largeWidth:{
    width: '100%',
  },
  marginTop:{
    marginTop:30
  },
  hrShop:{
    width : '90%'
  },
  cardPreviewContainer:{
    marginTop:30,
    display: 'flex',
    alignItems: 'center',
    padding: 10
  },

})
