import {withTranslation} from 'react-i18next'
import React from 'react'
import {SketchPicker} from 'react-color'
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
      open: false,
    }
  }

  onChangeComplete = color => {
    if (this.props.onChange) {
      this.props.onChange(color.hex)
    }
  }

  onColorToggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const {open}=this.state
    const {colors, value}=this.props

    return (
      <Grid container spacing={2}>
        <Grid item xl={1}>
          <Button variant={'contained'} style={{backgroundColor: value, height: 40, borderRadius: 20}} onClick={this.onColorToggle}/>
        </Grid>
        { open &&
          <Grid item xl={12} style={ popover }>
            <Grid style={ cover } onClick={this.onColorToggle}/>
            <SketchPicker
              color={value}
              onChangeComplete={this.onChangeComplete}
              presetColors={colors}
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

export default withTranslation('custom', {withRef: true})(ColorPicker)
