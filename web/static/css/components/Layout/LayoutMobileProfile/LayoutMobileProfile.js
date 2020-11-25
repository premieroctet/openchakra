export default theme => ({
  layoutMobileProfilHeader:{
    backgroundImage: 'url(../../../../assets/img/banner/banneProfil.svg)',
    height: '30vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    backgroundRepeat: 'no-repeat'
  },
  layoutMobileLayoutProfileHeader:{
    position: 'absolute',
    left: '10px',
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
  button:{
    textTransform: 'initial',
    color: 'black'
  },
  profilLayoutScrollMenu:{
    display: 'flex',
    justifyContent: 'center',
    height : '10%',
    alignItems: 'flex-end'
  },
})
