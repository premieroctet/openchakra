import {withTranslation} from 'react-i18next'
import React from 'react'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'
import Grid from '@material-ui/core/Grid'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    this.options={
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
    }
  }

  onChange = html => {
    if (this.props.onChange) {
      this.props.onChange(html)
    }
  }

  render() {

    return (
      <Grid>
        <span>{this.props.title}</span>
        <SunEditor
          setOptions={this.options}
          onChange={this.onChange}
          defaultValue={this.props.value}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(HtmlEditor)
