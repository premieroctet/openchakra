import CustomButton from '../../../components/CustomButton/CustomButton'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import BasePage from '../../basePage'
import DocumentEditor from '../../../components/DocumentEditor/DocumentEditor'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
const {snackBarSuccess}=require('../../../utils/notifications')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    height: '170vh',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    width: '90%',
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
})

class View extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      logo: null,
      errors: {},
    }

    this.onLabelChange = this.onLabelChange.bind(this)
    this.onLogoChange = this.onLogoChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  isEdition = () => {
    return Boolean(this.getURLProps().id)
  }

  componentDidMount() {
    const id=this.getURLProps().id
    localStorage.setItem('path', Router.pathname)
    if (!id) {
      return
    }
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/equipment/all/${id}`)
      .then(response => {
        let equipment = response.data
        this.setState({...equipment})
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.setState({errors: {}})
    const {label, logo}=this.state
    const formData = new FormData()
    formData.append('label', label)
    // Logo changed ?
    if (logo && logo.arrayBuffer) {
      formData.append('logo', logo)
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    setAxiosAuthentication()
    const id=this.getURLProps().id
    const action=this.isEdition() ?
      axios.put(`/myAlfred/api/admin/equipment/all/${id}`, formData, config)
      :
      axios.post('/myAlfred/api/admin/equipment/all', formData, config)
    action
      .then(response => {
        snackBarSuccess(`Equipment ${this.isEdition() ? 'modifié' : 'ajouté'}`)
        if (!this.isEdition()) {
          Router.push(`/dashboard/equipments/view?id=${response.data._id}`)
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({errors: error.response.data})
        if (error.response.status === 401 || error.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })
  }

  onLogoChange(e) {
    this.setState({logo: e.target.files[0]})
  }

  onLabelChange(e) {
    this.setState({label: e.target.value})
  }

  render() {
    const {classes} = this.props
    const {errors, logo, label} = this.state

    const title=`${this.isEdition() ? 'Modifier' : 'Ajouter'} un équipement`
    return (
      <DashboardLayout>
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{title}</Typography>
              </Grid>
              <form onSubmit={this.onFormSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    label="Label"
                    placeholder="Label"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={label}
                    onChange={this.onLabelChange}
                    error={errors.label}
                  />
                  <em>{errors.label}</em>
                </Grid>
                <Grid item>
                  <DocumentEditor
                    key={'particular'}
                    ext={this.state.ext}
                    ext_upload={this.state.particular_ext}
                    db_document={logo && `static/equipments/${logo}`}
                    uploaded_file={logo && logo.arrayBuffer ? URL.createObjectURL(logo) : null}
                    onChange={this.onLogoChange}
                    title={'Cliquez pour modifier'}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Enregistrer
                  </CustomButton>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(View))
