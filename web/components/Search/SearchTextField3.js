import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import React from 'react'
import util from 'util'
import MenuItem from '@material-ui/core/MenuItem'
const {normalize, getWordAt} = require('../../utils/text')
import _ from 'lodash'
class SearchTextField extends React.Component {

  constructor(props) {
    super(props)

    let triggers=[]
    this.props.options.forEach(o => {
      /**
      for (let i=1; i<o.length; i++) {
        triggers.push(o.slice(0, i))
      }
      */
      triggers.push(o[0])
    })
    triggers=_.uniqBy(triggers)
    let options={}
    triggers.forEach(t => {
      options[t]=this.props.options.filter(o => o.startsWith(t))
    })

    this.state={
      value: '',
      selectOpen: false,
      options: this.props.options,
      triggers: 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
  }

  changeOnSelect = (trigger, slug) => {
    console.log(`changeOnSelect:${trigger}, ${slug}`)
    return slug
  }

  handleRequestOptions = part => {
    console.log(`HGandlerequestoptions:${part}`)
  }

  render() {
    const {value, options, triggers}=this.state


    return (
      <TextInput trigger={triggers} options={options} changeOnSelect={this.changeOnSelect}
      onRequestOptions={this.handleRequestOptions} requestOnlyIfNoOptions={false} matchAny={true}
      />
    )
  }
}

export default SearchTextField
