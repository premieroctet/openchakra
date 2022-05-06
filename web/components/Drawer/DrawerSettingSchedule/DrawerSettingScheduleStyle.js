const Style = theme => ({
  formSchedule: {
    '& .MuiPickersBasePicker-pickerView': {
      backgroundColor: 'red',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%',
    },
  },
  panelFormDays: {
    width: '100%',
    marginTop: '4vh',
  },
  textFieldChipsActive: {
    color: 'white',
    fontWeight: 'bold',
    margin: 3,
    //backgroundColor: '#4fbdd7',
  },
  textFieldChips: {
    color: 'white',
    fontWeight: 'bold',
    margin: 3,
    backgroundColor: '#c4c4c4',
  },
  marginSaveButton: {
    marginTop: '5vh',
    marginBottom: '5vh',
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
})
module.exports=Style
