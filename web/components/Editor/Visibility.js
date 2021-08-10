import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

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
    console.log(`Visibility:${this.props.value}`)
    return (
      <>
        <h2>{this.props.title}</h2>
        <Checkbox
          checked={this.props.value=='block'}
          onChange={(ev, checked) => this.onChange(checked? 'block' : 'none')}
        />
      </>
    )
  }

}


export default VisibilityEditor
