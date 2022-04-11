import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import axios from 'axios'

import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import CustomButton from '../../components/CustomButton/CustomButton'
const lodash=require('lodash')
const {setAxiosAuthentication}=require('../../utils/authentication')
const {TEXT_FILTER} = require('../../server/utils/filesystem')

class DataImport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      comments: null,
      result: null,
    }
    this.fileRef = React.createRef()
  }

  onFileChange = event => {
    this.setState({errors: null, comments: null})
    const file=event.target.files[0]
    if (!TEXT_FILTER.filter(file.name)) {
      this.setState({errors: TEXT_FILTER.message})
      this.fileRef.current.value=''
    }
    this.setState({selectedFile: event.target.files[0]})
  }


  onImportClick = () => {
    const {importURL}=this.props
    this.setState({comments: null, errors: null})
    const data = new FormData()
    data.append('buffer', this.state.selectedFile)
    setAxiosAuthentication()
    axios.post(importURL, data)
      .then(response => {
        this.setState({result: response.data})
      })
      .catch(err => {
        this.setState({...err.response.data})
      })
    // Clear input file to avoid ERR_UPLOAD_FILE_CHANGED
    this.fileRef.current.value=''
    this.setState({selectedFile: null})
  }


  render() {
    const {comments, errors, selectedFile, created, updated} = this.state
    const {title, subTitle}=this.props

    return (
      <Card>
        <Grid item style={{display: 'flex', justifyContent: 'center'}}>
          <Typography style={{fontSize: 30}}>{title}</Typography>
        </Grid>
        <Grid item style={{display: 'flex', justifyContent: 'center'}}>{subTitle}</Grid>
        <Grid item style={{display: 'flex', justifyContent: 'center'}}>
          <input ref={this.fileRef} type="file" name="file" id="file" onChange={this.onFileChange} accept='.csv,.xlsx'/>
        </Grid>
        {(!!created || !!updated) && `${created} ajouts, ${updated} mises à jour`}
        { (!lodash.isEmpty(comments) || !lodash.isEmpty(errors)) &&
          <Grid item style={{display: 'flex', justifyContent: 'center'}}>
            {comments && comments.join(',')}
            <em style={{color: 'red'}}>{errors && (errors.join ? errors.join(',') : errors)}</em>
          </Grid>
        }
        <Grid item style={{display: 'flex', justifyContent: 'center'}}>
          <CustomButton disabled={!selectedFile} onClick={this.onImportClick}>Importer</CustomButton>
        </Grid>
      </Card>
    )
  }
}

module.exports=withTranslation('custom', {withRef: true})(DataImport)
