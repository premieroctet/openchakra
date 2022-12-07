import {withTranslation} from 'react-i18next'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

class DateField extends React.Component {

  render = () => {
    let {value}=this.props

    value=moment(value)
    if (value && moment(value).isValid()) {
      value=moment(value).format('yyyy-MM-DD')
    }
    else {
      value=''
    }
    return (
      <TextField
        type="date"
        InputLabelProps={{shrink: true}}
        format={'DD/MM/YYYY'}
        {...this.props}
        value={value}
      />
    )
  }
}

export default withTranslation(null, {withRef: true})(DateField)
