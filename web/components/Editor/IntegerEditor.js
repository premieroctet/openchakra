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
      <Grid style={{display: 'flex'}}>
        <h2>{title}</h2>
        <TextField
          value={value}
          label={title}
          type="number"
          onChange={this.onChange}
        />
      </Grid>
    )
  }

}

export default IntegerEditor
