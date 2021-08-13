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
  'content': 'Contenu',
  'magnify-background-color': 'Couleur de loupe',
  'info-color': "Couleur du texte d'information",
  'example-color': "Couleur du texte d'exemple",
  'input-color': "Couleur de saisie",
}

const ATTRIBUTES={
  'component': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['content', 'text']],
  'button': [['color', 'color'], ['background-color', 'color'], ['border-radius', 'integer'], ['border-color', 'color'], ['display', 'visibility'], ['content', 'text']],
  'menuitem': [['display', 'visibility']],
  'logo': [['background-color', 'color'], ['content', 'picture']],
  'searchbar': [['background-color', 'color'], ['magnify-background-color', 'color'], ['info-color', 'color'], ['example-color', 'color'], ['input-color', 'color']],
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
      return <div><GroupEditor group={parameter} onChange={onChange} /></div>
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
            let pAtt=parameter.attributes.find(a => a.name==att_name)
            pAtt = pAtt || {value: ''}
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
