import React from 'react'
import ColorPicker from './ColorPicker'
import HtmlEditor from './HtmlEditor'
import Visibility from './Visibility'
import IntegerEditor from './IntegerEditor'
import GroupEditor from './GroupEditor'
import PictureEditor from './PictureEditor'


const TITLES={
  'background-color': 'Couleur de fond',
  'color': 'Couleur du texte',
  'border-color': 'Couleur de bordure',
  'border-radius': 'Rayon de bordure',
  'display': 'Afficher',
  'contents': 'Texte',
  'content': 'Image',
}

const ATTRIBUTES={
  'component': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['contents', 'text']],
  'button': [['color', 'color'], ['background-color', 'color'], ['border-radius', 'integer'], ['border-color', 'color'], ['display', 'visibility'], ['contents', 'text']],
  'menuitem': [['display', 'visibility']],
  'logo': [['background-color', 'color'], ['content', 'picture']],
  'search': [['background-color', 'color'], ['content', 'picture']],
}

const getTitle = att_name => {
  if (att_name.includes('.')) {
    att_name=att_name.split('.')[1]
  }
  return TITLES[att_name]
}

class UIParameter extends React.Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    const {parameter, onChange}=this.props

    if (parameter.type=='group') {
      return <GroupEditor group={parameter} onChange={onChange} />
    }
    const attributes=ATTRIBUTES[parameter.type]

    return (
      <div style={{width: '80%'}}>
        <h2>{parameter.label}</h2>
        {
          attributes.map(att => {
            let [att_name, att_type] = att
            if (this.props.prefix) {
              att_name=`${this.props.prefix}.${att_name}`
            }
            const pAtt=parameter.attributes.find(a => a.name==att_name) || {value: ''}
            switch (att_type) {
              case 'color': return <ColorPicker title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} />
              case 'text': return <HtmlEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} />
              case 'visibility': return <Visibility title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} />
              case 'integer': return <IntegerEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} />
              case 'picture': return <PictureEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} />
              default: return null
            }
          })
        }
      </div>
    )
  }
}

export default UIParameter
