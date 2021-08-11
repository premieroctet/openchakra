import React from 'react'
import Visibility from './Visibility'
import ColorPicker from './ColorPicker'
import Grid from '@material-ui/core/Grid'

class MenuEditor extends React.Component {

  onChange = html => {
    if (this.props.onChange) {
      this.props.onChange(html)
    }
  }

  render() {
    const {menu, onChange}=this.props
    console.log(JSON.stringify(`MenuEditor:${JSON.stringify(menu.attributes)}`))
    const colorAtt=menu.attributes.find(a => a.name=='color') || {value: ''}
    const bkColorAtt=menu.attributes.find(a => a.name=='background-color') || {value: ''}
    return (
      <>
        <h2>{menu.label}</h2>
        <ColorPicker title={'Couleur'} value={colorAtt.value} onChange={onChange('color')} />
        <ColorPicker title={'Couleur de fond'} value={bkColorAtt.value} onChange={onChange('background-color')} />
        {
          menu.menus.map(m => {
            const att_name = `${m.id}Menu.display`
            const value=menu.attributes.find(a => a.name==att_name) || {value: ''}
            console.log(`Menuitem edition:${att_name}:${JSON.value}`)
            return (
              <>
                <Grid style={{display: 'flex'}}>
                  <h3>{m.label}</h3>
                  <Visibility title={''} value={value.value} onChange={onChange(att_name)} />
                </Grid>
              </>
            )
          })
        }
      </>
    )
  }

}

export default MenuEditor
