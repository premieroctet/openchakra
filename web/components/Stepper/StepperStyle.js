export default theme => ({
  root: {},
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
})
