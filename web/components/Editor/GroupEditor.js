import React from 'react'
import ColorPicker from './ColorPicker'
import UIParameter from './UIParameter'

class GroupEditor extends React.Component {

  onChange = att_name => value => {
    if (this.props.onChange) {
      this.props.onChange(att_name)(value)
    }
  }

  render() {
    const {group}=this.props

    const colorValue = (group.attributes.find(a => a.name=='color') || {value: ''}).value
    const bkValue = (group.attributes.find(a => a.name=='background-color')|| {value: ''}).value
    return (
      <>
        <ColorPicker title={'Couleur du texte'} value={colorValue} onChange={this.onChange('color')} />
        <ColorPicker title={'Couleur du fond'} value={bkValue} onChange={this.onChange('background-color')} />
        <h3>{`Afficher les ${group.componentType=='menuitem' ? 'menus' : 'boutons'}`}</h3>
        <ul style={{listStyleType: 'none'}}>
          {
            group.components.map(m => {
              let pseudoParam={
                label: m.label,
                id: `${group.className}_${m.id}`,
                type: group.componentType,
                attributes: group.attributes,
              }
              return (
                <UIParameter title={m.label} prefix={m.id} parameter={pseudoParam} onChange={this.onChange}/>
              )
            },
            )
          }
        </ul>
      </>
    )
  }

}

export default GroupEditor
