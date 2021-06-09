import React from 'react';
import util from 'util'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
const {normalize, getWordAt} = require('../../utils/text')

const Item = ({ entity: name }) => <div>{`${name}`}</div>

class SearchTextField extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      value: '',
      options:['abattage', 'coiffure'],
      selectOpen: false,
    }
    this.normalized_options=this.props.options.map(o => normalize(o.label))
  }

  onChange = ev => {
    const {target}=ev
    this.setState({value: target.value})
  }

  onKeyUp = event => {
    const {target}=event
    console.log(target.selectionStart)
    console.log(target.selectionEnd)
    const word=getWordAt(this.state.value, target.selectionStart).word
    console.log(word)
    const re=new RegExp(word)
    const filtered=this.normalized_options.filter(o => o.match(re)).slice(0,50)
    this.setState({options: filtered})
    console.log(filtered)
    this.setState({selectOpen: true})
  }

  onSelection = ev => {
    const {target}=event
    console.log('onSelection')
    this.setState({selected: target.value, selectOpen: false})
  }

  render() {
    const {value, selected, options, selectOpen}=this.state
    return (
      <>
        <TextField
          value={value}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
        />
        <Select
          value={selected}
          onChange={this.onSelection}
          open={selectOpen}
        >
          {options.map(o => (
            <MenuItem value={o} key={o}>{o}</MenuItem>
          ))}
        </Select>
         <div>Test</div>
      </>
    )
  }
}

export default SearchTextField
