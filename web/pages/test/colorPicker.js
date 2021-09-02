import React from 'react'
import ColorPicker from '../../components/Editor/ColorPicker'

const ATTRIBUTES=['first', 'second', 'third']

class ColorPickerTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      open: false,
    }
  }

  onChangeComplete = attribute => color => {
    this.setState({[attribute]: color})
  }

  hidePicker= att => () => {
    const attName=`display${att}`
    this.setState({[attName]: false})
  }

  showPicker= att => () => {
    const attName=`display${att}`
    this.setState({[attName]: true})
  }

  render() {

    return (
      <>
        { ATTRIBUTES.map(att => {
          const colorAtt=att
          const displayAtt=`display${att}`
          return (
            <>
              <button onClick={this.showPicker(att)} style={{color: 'white', backgroundColor: this.state[colorAtt]}}>Pick Color</button>
              { this.state[displayAtt] &&
              <div style={ popover }>
                <div style={ cover } onClick={this.hidePicker(att)}/>
                <ColorPicker
                  color={this.state[colorAtt]}
                  onChange={this.onChangeComplete(att)}
                />
              </div>
              }
            </>
          )
        })}
        <div>
          <iframe style={{width: '600px', height: '400px'}} src='/'></iframe>
        </div>
      </>
    )
  }

}

export default ColorPickerTest
