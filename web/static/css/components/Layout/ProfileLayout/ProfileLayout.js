export default theme => ({
  profilLayoutMainContainer:{
    display:'flex',
    justifyContent:'center'
  },
  profilLayoutContainer:{
    display: 'flex',
    justifyContent:'center',
    flexDirection: 'column',
    alignItems:'center',
    width: '100%'
  },
  profilLayoutBackgroundContainer:{
    backgroundColor: 'rgba(249,249,249, 1)',
    width: '100%'
  },
  profilLayoutMargin:{
    margin:'3vh 15%',
    display:'flex',
    justifyContent:'center'
  },
  profilLayoutBox:{
    borderRadius: 17,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    width: '100%',
    backgroundColor: 'white',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]:{
      height:'55vh'
    }
  },
  profilLayoutBannerImg:{
    display: 'flex',
    justifyContent: 'center',
    height: '50%',
    backgroundImage: 'url(../../../../assets/img/banner/banneProfil.svg)',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 17,
    position: 'relative',
    backgroundRepeat: 'no-repeat'
  },
  profilLayoutProfileHeader:{
    position: 'absolute',
    top: '43%',
    left: '50%',
    transform: 'translate(-49%,50%)',

  },
  profilLayoutAvatar:{
    width: 100,
    height:100,
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid rgba(178, 204, 251, 1)',
    position: 'absolute',
    bottom: '-50px',
  },
  cardPreviewLarge: {
    width: '90%',
    height: '90%',
  },
  profilLayoutScrollMenu:{
    display: 'flex',
    justifyContent: 'center',
    height : '10%',
    alignItems: 'flex-end'
  },
  profilLayoutChildren:{
    margin:'3vh 15%',
    display:'flex',
    justifyContent:'center'
  }
})
