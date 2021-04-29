import React from 'react'
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

class DateField extends React.Component {

  render = () => {
    var {classes, value, onChange}=this.props

    console.log(`Date value:${value}`)
    value=moment(value)
    if (value && moment(value).isValid()) {
      value=moment(value).format('yyyy-MM-DD')
    }
    else {
      value=''
    }
    return (
      <TextField
        //className={classes.textFieldDatePicker}
        type="date"
        InputLabelProps={{ shrink: true }}
        format={"DD/MM/YYYY"}
        {...this.props}
        value={value}
      />
    )
  }
}

export default DateField
