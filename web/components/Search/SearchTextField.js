import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import React from 'react';
import util from 'util'
const {normalize} = require('../../utils/text')

class SearchTextField extends React.Component {

  filterOptions = (options, state) => {
    console.log(state)
    const last_item=normalize(state.inputValue.split(/[\s,]+/).slice(-1).pop())
    options = options.filter(o => normalize(o.label).includes(last_item))
    return options
  }

  onChange = (event, value, reason) => {
    console.log(`Event:${util.inspect(event._targetInst.return.tag)}`)
    console.log(`value:${value}`)
    console.log(`reason:${reason}`)
  }

  onInputChange = (event, value, reason) => {
    console.log(`Event:${util.inspect(event._targetInst.return.tag)}`)
    console.log(`value:${value}`)
    console.log(`reason:${reason}`)
  }
  
  render() {
    return (
      <Autocomplete
        native={true}
        options={this.props.options}
        onChange={this.props.onChange}
        onKeyDown={this.onChange}
        isDisabled={this.props.isDisabled}
        renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
        getOptionLabel={option => option.label || option}
        freeSolo={true}
        loadingText='Chargement'
        loading={this.props.loading}
        autoComplete={true}
        filterOptions={this.filterOptions}
        multiple={true}
      />
    )
  }
}

export default SearchTextField
