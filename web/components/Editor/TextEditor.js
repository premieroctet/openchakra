import { OutlinedInput } from '@material-ui/core';
import {TextField} from 'material-ui'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange = event => {
    const {value}=event.target
    console.log(`Changed text to ${value}`)
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {

    return (
      <Grid>
        <span>{this.props.title}</span>
        <OutlinedInput
          variant={'outlined'}
          onChange={this.onChange}
          defaultValue={this.props.value}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(TextEditor)
