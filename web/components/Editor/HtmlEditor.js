import {TextField} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import React from 'react'
import dynamic from 'next/dynamic'
import Grid from '@material-ui/core/Grid'
import 'suneditor/src/assets/css/suneditor.css'
import JSSoup from 'jssoup'
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
      const soup=new JSSoup(html)
      const tags=soup.findAll().filter(t => /div|p/.test(t.name))
      console.log(tags)
      // Replace all div and p tags with span to avoid styling
      tags.forEach(t => { t.name='span' })
      const noDivsPHtml=soup.toString()
      this.props.onChange(noDivsPHtml)
    }
  }

  render() {
    return (
      <Grid>
        <span>{this.props.title}</span>
        <SunEditor
          lang='fr'
          setOptions={this.options}
          onChange={this.onChange}
          defaultValue={this.props.value}
          value={this.props.value}
        />
        <TextField style={{width: '100%'}}
          multiline
          disabled
          variant={'outlined'}
          value={this.props.value}
          onChange={ev => this.onChange(ev.target.value)}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(HtmlEditor)
