import {withTranslation} from 'react-i18next'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { FormControlLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'

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
      <Grid container spacing={2}>
        <Grid item xl={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={['block', null, undefined, ''].includes(this.props.value)}
                onChange={(ev, checked) => this.onChange(checked? 'block' : 'none')}
              />
            }
            label={this.props.title}
          />
        </Grid>
        <Grid item xl={12}>
          <Divider/>
        </Grid>
      </Grid>
    )
  }

}


export default withTranslation('custom', {withRef: true})(VisibilityEditor)
