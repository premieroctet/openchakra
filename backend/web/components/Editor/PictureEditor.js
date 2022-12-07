import moment from 'moment'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import DocumentEditor from '../DocumentEditor/DocumentEditor'

class PictureEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      uploaded: null,
    }
  }

  onChange = ev => {
    this.setState({uploaded: ev.target.files[0]})
    if (this.props.onChange) {
      this.props.onChange(ev.target.files[0])
    }
  }

  render() {
    let {value, title}=this.props
    let {uploaded}=this.state

    if (typeof value=='object') {
      uploaded = value
      value = null
    }
    return (
      <Grid style={{display: 'flex'}}>
        <h2>{title}</h2>
        <DocumentEditor
          title={this.props.id}
          db_document={value || null}
          uploaded_file={uploaded && URL.createObjectURL(uploaded)}
          onChange={this.onChange}
          display_title={false}
        />
      </Grid>
    )
  }

}

export default withTranslation(null, {withRef: true})(PictureEditor)
