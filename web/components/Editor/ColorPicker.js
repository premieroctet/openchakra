import React from 'react'
import {ChromePicker} from 'react-color'

class ColorPicker extends React.Component {

  onChangeComplete = color => {
    if (this.props.onChange) {
      this.props.onChange(color.hex)
    }
  }

  render() {

    return (
      <ChromePicker
        color={this.props.color}
        onChangeComplete={this.onChangeComplete}
      />
    )
  }

}

export default ColorPicker
