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
    const {value, title}=this.props
    const {uploaded}=this.state

    return (
      <Grid style={{display: 'flex'}}>
        <h2>{title}</h2>
        <DocumentEditor
          title={moment().unix()}
          db_document={value || null}
          uploaded_file={uploaded && URL.createObjectURL(uploaded)}
          onChange={this.onChange}
        />
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(PictureEditor)
