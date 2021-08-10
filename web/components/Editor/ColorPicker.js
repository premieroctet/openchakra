import React from 'react'
import {ChromePicker} from 'react-color'

class ColorPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      color: this.props.value,
    }
  }

  onChangeComplete = color => {
    if (this.props.onChange) {
      this.props.onChange(color.hex)
    }
    this.setState({color: color.hex})
  }

  render() {

    return (
      <>
        <h2>{this.props.title}</h2>
        <ChromePicker
          color={this.state.color}
          onChangeComplete={this.onChangeComplete}
        />
      </>
    )
  }

}

export default ColorPicker
