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
})
