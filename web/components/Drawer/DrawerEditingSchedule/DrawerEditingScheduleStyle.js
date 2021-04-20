export default theme => ({
  formSchedule: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%',
    },
  },
  panelFormDays: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2,
  },
  marginSaveButton:{
    marginTop: '5vh',
    marginBottom: '5vh',
  }
})
