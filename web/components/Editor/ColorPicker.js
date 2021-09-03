import {withTranslation} from 'react-i18next'
import React from 'react'
import {ChromePicker} from 'react-color'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const popover = {
  position: 'absolute',
  zIndex: '2',
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
}

class ColorPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      color: this.props.value || '',
      open: false,
    }
  }

  onChangeComplete = color => {
    if (this.props.onChange) {
      this.props.onChange(color.hex)
    }
    this.setState({color: color.hex})
  }

  onColorToggle = () => {
    this.setState({open: !this.state.open})
  }
  render() {

    const {color, open}=this.state
    return (
      <Grid style={{display: 'flex'}}>
        <Button variant={'contained'} style={{backgroundColor: color, borderRadius: '40px'}} onClick={this.onColorToggle}></Button>
        { open &&
          <div style={ popover }>
            <div style={ cover } onClick={this.onColorToggle}/>
            <ChromePicker
              color={this.state.color}
              onChangeComplete={this.onChangeComplete}
            />
          </div>
        }
        <span>{this.props.title}</span>
      </Grid>
    )
  }

}

export default ColorPicker
