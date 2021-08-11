import React from 'react'
import ColorPicker from './ColorPicker'
import HtmlEditor from './HtmlEditor'
import Visibility from './Visibility'
import IntegerEditor from './IntegerEditor'
import MenuEditor from './MenuEditor'


const TITLES={
  'background-color': 'Couleur de fond',
  'color': 'Couleur du texte',
  'border-color': 'Couleur de bordure',
  'border-radius': 'Rayon du coin',
  'display': 'Afficher',
  'contents': 'Texte',
}

const ATTRIBUTES={
  'component': [['color', 'color'], ['background-color', 'color'], ['display', 'visibility'], ['contents', 'text']],
  'button': [['color', 'color'], ['background-color', 'color'], ['border-radius', 'integer'], ['border-color', 'color'], ['display', 'visibility'], ['contents', 'text']],
  'menuitem': [['display', 'visibility']],
}

class UIParameter extends React.Component {

  render = () => {
    const {value, onChange}=this.props

    if (value.type=='menu') {
      return <MenuEditor menu={value} onChange={onChange} />
    }
    const attributes=ATTRIBUTES[value.type]

    console.log(attributes)
    return (
      <div style={{width: '80%'}}>
        <div>{value.label}</div>
        {
          attributes.map(att => {
            const [att_name, att_type] = att
            const pAtt=value.attributes.find(a => a.name==att_name) || {value: ''}
            switch (att_type) {
              case 'color': return <ColorPicker title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
              case 'text': return <HtmlEditor title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
              case 'visibility': return <Visibility title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
              case 'integer': return <IntegerEditor title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
              default: return null
            }
          })
        }
      </div>
    )
  }
}

export default UIParameter
