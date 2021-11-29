import { Label } from '@material-ui/icons';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
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
      options: this.props.options,
    }
    /**
    this.filterOptions=createFilterOptions({
      matchFrom: 'any',
      stringify: option => normalize(option),
      trim: true,
    })
    */
    this.filterOptions= (options, {inputValue}) => {
      const terms=inputValue.trim().split(' ')
      const search=terms.pop()
      return options.filter(o => normalize(o).includes(search))
    }
    this.renderTags = (value, getprops) => {
      return (<span>{value.join(' ')}</span>)
    }
  }

  onChange = (event, value, reason, details) => {
    console.log(`onChange Value:${value}, reasin:${reason}, details:${JSON.stringify(details)}`)
  }

  onInputChange= (ev, value, reason) => {
    console.log(`onInputChange Value:${value}, reasin:${reason}`)
    console.log(`options:${this.state.options.length}`)
    this.setState({options: [...this.state.options, value]})
  }

  render() {
    const {value, selected, selectOpen}=this.state

    return (
      <>
      <Autocomplete
        key={this.props.options}
        options={this.props.options}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        freeSolo={true}
        multiple={true}
        filterOptions={this.filterOptions}
        loading={this.props.loading}
        getOptionLabel={option => option}
        renderTags={this.renderTags}
        renderInput={params => <TextField {...params}/>}
      />
      </>
    )
  }
}

export default SearchTextField
