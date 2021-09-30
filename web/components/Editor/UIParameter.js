import {is_production} from '../../config/config'
import {withTranslation} from 'react-i18next'
import React from 'react'
import ColorPicker from './ColorPicker'
import HtmlEditor from './HtmlEditor'
import Visibility from './Visibility'
import IntegerEditor from './IntegerEditor'
import GroupEditor from './GroupEditor'
import PictureEditor from './PictureEditor'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextEditor from './TextEditor'

const RESET_BUTTON_ENABLED=false

const ATT_TYPES={
  'color': 'color',
  'display': 'visibility',
  'background-color': 'color',
  'background-image': 'picture',
  'border': 'color',
  'content': 'richtext',
  'font': 'richtext',
  'text': 'text',
}
const TITLES={
  'background-color': 'Couleur de fond',
  'color': 'Couleur du texte',
  'border-color': 'Couleur de bordure',
  'border-radius': 'Rayon de bordure',
  'display': 'Afficher',
  'content': '',
  'magnify-background-color': 'Couleur de loupe',
  'info-color': "Couleur du texte d'information",
  'example-color': "Couleur du texte d'exemple",
  'input-color': 'Couleur de saisie',
}

const ATTRIBUTES_TYPES={
  'component': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['content', 'text']],
  'button': [['display', 'visibility'], ['color', 'color'], ['background-color', 'color'], ['border-color', 'color'], ['border-radius', 'integer']],
  'menuitem': [['display', 'visibility']],
  'logo': [['background-color', 'color'], ['content', 'picture']],
  'searchbar': [['background-color', 'color'], ['magnify-background-color', 'color'], ['info-color', 'color'], ['example-color', 'color'], ['input-color', 'color']],
}

const getTitle = att_name => {
  let key=att_name
  if (key.includes('.')) {
    key=key.split('.')[1]
  }
  return TITLES[key]
}

class UIParameter extends React.Component {

  constructor(props) {
    super(props)
  }

  onResetClicked = type => {
    this.props.onChange(type)(null)
  }

  render = () => {
    const {parameter, title, onChange}=this.props

    if (parameter.type=='group') {
      return <div><GroupEditor group={parameter} onChange={onChange} /></div>
    }
    const attributes=ATTRIBUTES_TYPES[parameter.type] || [[parameter.type, ATT_TYPES[parameter.type]]]

    return (
      <Grid container spacing={2} style={{display: 'flex', flexDirection: 'column'}}>
        <Grid item xl={12} style={{display: 'flex'}}>
          { RESET_BUTTON_ENABLED && <Button onClick={() => this.onResetClicked(parameter.type)}>Reset</Button> }
          <h3 style={{color: 'black'}}>{title}</h3>
          {!(is_production()) && <h4>({parameter.type_label})</h4>}
        </Grid>
        <Grid>
        {
          attributes.map(att => {
            let [att_name, att_type] = att

            if (att_name.endsWith('_placeholder')) {
              att_type='text'
            }
            if (this.props.prefix) {
              att_name=`${this.props.prefix}.${att_name}`
            }
            let pAtt=parameter.attributes.find(a => a.name==att_name)
            pAtt = pAtt || {value: ''}
            const props={key: att_name, title: getTitle(att_name), value: pAtt.value, onChange: onChange(att_name), colors: this.props.colors}

            switch (att_type) {
              case 'color': return <Grid key={props} item xl={12}><ColorPicker {...props} /></Grid>
              case 'richtext': return <Grid item xl={12}><HtmlEditor {...props} /></Grid>
              case 'text': return <Grid item xl={12}><TextEditor {...props} /></Grid>
              case 'visibility': return <Grid item xl={12}><Visibility {...props} name={title}/></Grid>
              case 'integer': return <Grid item xl={12}><IntegerEditor {...props} /></Grid>
              case 'picture': return <Grid item xl={12}><PictureEditor {...props} /></Grid>
              default: return null
            }
          })
        }
        </Grid>

      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(UIParameter)
