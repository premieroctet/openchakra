import { TextField } from '@material-ui/core';
import  Select from 'react-select'
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
      value: null,
      selectOpen: false,
    }
    this.normalized_options=this.props.options.map(o => normalize(o.label))
  }

  onChange = ev => {
    this.setState({value: ev})
    this.props.onChange && this.props.onChange(ev.label)
  }

  searchFn = (candidate, input) => {
    if (candidate) {
      console.log(`Searching ${input} in ${JSON.stringify(candidate)}`)
      const search = normalize(input)
      return candidate.value.includes(search)
    }
    return true
  };

  getSelectedOption = (options, service) => {
    const {particular_professional_access}=this.state
    let opts=particular_professional_access ? [].concat(...options.map(o => o.options)) : options
    return opts.find(o => o._id==service)
  }

  render() {
    const {value, selected, selectOpen}=this.state

    const options=this.props.options.map(o => ({label: o, value: normalize(o)}))
    return (
      <>
      <Select
        options={options}
        onChange={this.onChange}
        searchable={true}
        isMulti={true}
        filterOption={this.searchFn}
        isLoading={this.props.loading}
        loadingMessage={() => 'Recherche des services'}
        value={value}
      />
      </>
    )
  }
}

export default SearchTextField
