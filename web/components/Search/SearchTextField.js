import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import React from 'react';

class SearchTextField extends React.Component {

  render() {
    return (
      <Autocomplete
        native={true}
        options={this.props.options}
        onChange={this.props.onChange}
        isDisabled={this.props.isDisabled}
        renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
        getOptionLabel={option => option.label || option}
        freeSolo={true}
        loadingText='Chargement'
        loading={this.props.loading}
      />
    )
  }
}

export default SearchTextField
