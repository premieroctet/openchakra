export default theme => ({
  root: {
    overflow:'hidden',
    width: '100%',

  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  responsiveContent: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  stepIcon: {
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
  },
  stepLabelRoot:{
    '& .MuiStepLabel-labelContainer':{
      overflow:'hidden',
      '& span':{
        overflow:'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    },
  },
  stepRoot:{
    overflow: 'hidden'
  },
  stepperRoot:{
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
  },
  stepLabelShop:{
    '& span':{
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 'bold',
    },
    '& .MuiStepLabel-label.MuiStepLabel-active':{
      fontWeight: 'bold',
      color: 'white',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    '& .MuiStepIcon-root.MuiStepIcon-active':{
      color: theme.palette.yellow.main
    },
    '& .MuiStepIcon-root.MuiStepIcon-completed':{
      color: theme.palette.yellow.main
    },
    '& .MuiStepLabel-label.MuiStepLabel-completed':{
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'white',

    }
  },
  stepShop:{
    padding: 16,
  },
  stepperShop:{
    padding: 0,
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
  },
  stepIconShop:{
    minWidth: 56,
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
  }
})
