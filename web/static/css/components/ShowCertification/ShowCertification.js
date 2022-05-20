const style=theme => ({
  certifIcon: {
    color: '#696767',
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
  },
  certificationLogo: {
    backgroundImage: 'url(../../../assets/icon/pro_icon.svg)',
    height: 24,
    width: 24,
  },
})
export default style
