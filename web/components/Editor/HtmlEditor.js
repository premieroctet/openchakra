const {TextField} = require('@material-ui/core')
import {withTranslation} from 'react-i18next'
import React from 'react'
import dynamic from 'next/dynamic'
// TODO : fix loading SunEditor dist css
// import 'suneditor/dist/css/suneditor.min.css'
import 'suneditor/src/assets/css/suneditor.css'
import Grid from '@material-ui/core/Grid'
import '../../static/css/components/Editors/HtmlEditor.module.css'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    this.options={
      defaultTag: 'div',
      colorList: [this.props.colors],
      buttonList: [
        ['undo', 'redo'],
        ['fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['removeFormat'], '/',
        ['fontColor', 'hiliteColor'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'table'],
        ['link'],
        ['fullScreen'],
      ],
      fontSize: Array(32).fill(0).map((i, index) => (index+4)*2),
    }
  }

  onChange = html => {
    if (this.props.onChange) {
      // Replace absolute https://my-alfred.io:3122/ => /
      html=html.replace(/https:\/\/my-alfred.io:3122\//g, '/')
      // Remove surrounding DIVs
      html=html.replace(/^<div>(.*)<\/div>$/, '$1')
      this.props.onChange(html)
    }
  }

  render() {
    return (
      <Grid>
        <span>{this.props.title}</span>
        <SunEditor
          key={this.props.value}
          lang='fr'
          setOptions={this.options}
          onChange={this.onChange}
          defaultValue={this.props.value}
        />
        <TextField style={{width: '100%'}}
          multiline
          variant={'outlined'}
          value={this.props.value}
          onChange={ev => this.onChange(ev.target.value)}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(HtmlEditor)
