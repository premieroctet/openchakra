import {withTranslation} from 'react-i18next'
import React from 'react'
import {ChromePicker} from 'react-color'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

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
      <Grid container spacing={2}>
        <Grid item xl={1}>
          <Button variant={'contained'} style={{backgroundColor: color, height: 40, borderRadius: 20}} onClick={this.onColorToggle}/>
        </Grid>
        { open &&
          <Grid item xl={12} style={ popover }>
            <Grid style={ cover } onClick={this.onColorToggle}/>
            <ChromePicker
              color={this.state.color}
              onChangeComplete={this.onChangeComplete}
            />
          </Grid>
        }
        <Grid item xl={11} style={{display: 'flex', alignItems: 'center'}}>
          <span>{this.props.title}</span>
        </Grid>
        <Grid item xl={12}>
          <Divider/>
        </Grid>
      </Grid>
    )
  }

}

export default withTranslation()(ColorPicker)
