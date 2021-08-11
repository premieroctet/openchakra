import React from 'react'
import TextField from '@material-ui/core/TextField'
class IntegerEditor extends React.Component {

  onChange = ev => {
    if (this.props.onChange) {
      this.props.onChange(ev.target.value)
    }
  }

  render() {
    const {value, title}=this.props
    return (
      <>
        <h2>{title}</h2>
        <TextField
          value={value}
          label={title}
          type="number"
          onChange={this.onChange}
        />
      </>
    )
  }

}

export default IntegerEditor
