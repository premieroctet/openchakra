import React from 'react'
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

class Date extends React.Component {

  render = () => {
    var {classes, defaultValue, onChange}=this.props

    console.log(`Date value:${defaultValue}`)
    defaultValue=moment(defaultValue)
    if (defaultValue && moment(defaultValue).isValid()) {
      defaultValue=moment(defaultValue).format('yyy-MM-DD')
    }
    else {
      defaultValue=''
    }
    return (
      <TextField
        //className={classes.textFieldDatePicker}
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        format={"DD/MM/YYYY"}
        {...this.props}
        defaultValue={defaultValue}
      />
    )
  }
}

export default Date
