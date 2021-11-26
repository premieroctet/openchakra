import { Label } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import util from 'util'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
const {normalize, getWordAt} = require('../../utils/text')
const Item = ({ entity: name }) => <div>{`${name}`}</div>
class SearchTextField extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      value: '',
      selectOpen: false,
    }
    this.normalized_options=this.props.options.map(o => normalize(o.label))
    this.textField=React.createRef()
    this.searchFn=this.searchFn.bind(this)
  }

  onChange = (ev, value) => {
    this.setState({value: value})
    this.props.onChange && this.props.onChange(value)
  }

  searchFn = (options, state) => {
    console.log(`Refs:${JSON.stringify(this.textField)}`)
    console.log(`Searching ${JSON.stringify(state)} in ${JSON.stringify(options)}`)
    return options
  };

  render() {
    const {value, selected, selectOpen}=this.state

    //const options=this.props.options.map(o => ({label: o}))
    const options=this.props.options
    return (
      <>
      <Autocomplete
        options={options}
        onChange={this.onChange}
        autoComplete={true}
        freeSolo={true}
        filterOptions={this.searchFn}
        isLoading={this.props.loading}
        loadingMessage={() => 'Recherche des services'}
        //value={value}
        renderInput={(params) => <TextField {...params} fef={this.textField} />}
      />
      </>
    )
  }
}

export default SearchTextField
