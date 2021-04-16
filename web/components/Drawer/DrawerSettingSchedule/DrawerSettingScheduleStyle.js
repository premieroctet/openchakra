export default theme => ({
  formSchedule: {
    '& .MuiPickersBasePicker-pickerView':{
      backgroundColor: 'red',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%',
    },
  },
  panelFormDays: {
    width: '100%',
    marginTop: '4vh'
  },
  textFieldChips: {
    color: 'white',
    fontWeight: 'bold',
    margin: 3,
  },
  marginSaveButton:{
    marginTop: '5vh',
    marginBottom: '5vh',
    [theme.breakpoints.down('xs')]:{
      marginBottom: 110
    }
  }
})
