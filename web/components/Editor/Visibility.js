import {withTranslation} from 'react-i18next'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'

class VisibilityEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <Grid style={{display: 'flex'}}>
        <Checkbox
          checked={['block', null, undefined, ''].includes(this.props.value)}
          onChange={(ev, checked) => this.onChange(checked? 'block' : 'none')}
        />
        <span>{this.props.title}</span>
      </Grid>
    )
  }

}


export default withTranslation()(VisibilityEditor)
