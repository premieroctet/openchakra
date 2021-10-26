import {withTranslation} from 'react-i18next'
import React from 'react'
import dynamic from 'next/dynamic'
// TODO : fix loading SunEditor dist css
// import 'suneditor/dist/css/suneditor.min.css'
import 'suneditor/src/assets/css/suneditor.css'
import Grid from '@material-ui/core/Grid'
import '../../static/css/components/Editors/HtmlEditor.css'

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
        ['font', 'fontSize', 'formatBlock'],
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
      // Remove surrounding DIVs
      html=html.replace(/^<div>(.*)<\/div>$/, "$1")
      this.props.onChange(html)
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
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(HtmlEditor)
