import {withTranslation} from 'react-i18next'
import React from 'react'
import ColorPicker from './ColorPicker'
import HtmlEditor from './HtmlEditor'
import Visibility from './Visibility'
import IntegerEditor from './IntegerEditor'
import GroupEditor from './GroupEditor'
import PictureEditor from './PictureEditor'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const ATT_TYPES={
  'color': 'color',
  'display': 'visibility',
  'background-color': 'color',
  'background-image': 'picture',
  'border': 'color',
  'content': 'text',
  'font': 'text',

}
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
  'input-color': 'Couleur de saisie',
}

const ATTRIBUTES_TYPES={
  'component': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['content', 'text']],
  'button': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['border-color', 'color'], ['border-radius', 'integer'], ['content', 'text']],
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
    const {parameter, title, onChange}=this.props

    if (parameter.type=='group') {
      return <div><GroupEditor group={parameter} onChange={onChange} /></div>
    }
    const attributes=ATTRIBUTES_TYPES[parameter.type] || [[parameter.type, ATT_TYPES[parameter.type]]]

    return (
      <Grid container spacing={2}>
        <Grid item xl={12}>
          <h3 style={{color: 'black'}}>{title}</h3>
        </Grid>

        {
          attributes.map(att => {
            let [att_name, att_type] = att
            if (this.props.prefix) {
              att_name=`${this.props.prefix}.${att_name}`
            }
            let pAtt=parameter.attributes.find(a => a.name==att_name)
            console.log(`AttName:${att_name}`)
            pAtt = pAtt || {value: ''}
            switch (att_type) {
              case 'color': return <Grid item xl={12}><ColorPicker title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} /></Grid>
              case 'text': return <Grid item xl={12}><HtmlEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} /></Grid>
              case 'visibility': return <Grid item xl={12}><Visibility title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} name={title}/></Grid>
              case 'integer': return <Grid item xl={12}><IntegerEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} /></Grid>
              case 'picture': return <Grid item xl={12}><PictureEditor title={getTitle(att_name)} value={pAtt.value} onChange={onChange(att_name)} /></Grid>
              default: return null
            }
          })
        }
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(UIParameter)
