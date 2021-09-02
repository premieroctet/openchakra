import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

class IntegerEditor extends React.Component {

  onChange = ev => {
    if (this.props.onChange) {
      this.props.onChange(ev.target.value)
    }
  }

  render() {
    const {value, title}=this.props
    return (
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item>
          <TextField
            value={value}
            label={title}
            type="number"
            variant={'outlined'}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item>
          <span>{title}</span>
        </Grid>
      </Grid>
    )
  }

}

export default IntegerEditor
