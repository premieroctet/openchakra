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
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications')

const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: '1.5rem 3rem',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}

class View extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      category: {particular_label: '', professional_label: ''},
      label: '',
      tags: [],
      description: '',
      all_tags: [],
      current_tags: [],
      selectedTags: null,
      particular_id: null,
      particular_file: null,
      particular_ext: null,
      professional_id: null,
      professional_file: null,
      professional_ext: null,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChangeTags = this.handleChangeTags.bind(this)
    this.onParticularImageChange=this.onParticularImageChange.bind(this)
    this.onProfessionalImageChange=this.onProfessionalImageChange.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    const id = this.getURLProps().id
    this.setState({
      particular_id: null,
      particular_file: null,
      particular_ext: null,
      professional_id: null,
      professional_file: null,
      professional_ext: null,
    })

    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/category/all/${id}`)
      .then(response => {
        let category = response.data
        this.setState({category: category, current_tags: category.tags})
        this.setState({
          selectedTags: this.state.current_tags.map(b => ({
            label: b.label,
            value: b._id,
          })),
        })

      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })

    axios.get('/myAlfred/api/admin/tags/all')
      .then(response => {
        let tags = response.data
        this.setState({all_tags: tags})
      })
      .catch(error => {
        console.error(error)
      })
  }

  onChange = e => {
    const state = this.state.category
    state[e.target.name] = e.target.value
    this.setState({category: state})
  }

  onChangeBool = event => {
    const {name, checked}=event.target
    const state = this.state.category
    state[name]=checked
    this.setState({category: state})
  }

  handleChangeTags = selectedTags => {
    this.setState({selectedTags})

  }

  onParticularImageChange = e => {
    this.setState({
      particular_id: e.target.files[0],
      particular_file: URL.createObjectURL(e.target.files[0]),
      particular_ext: e.target.files[0].name.split('.').pop(),
    })
  }

  onProfessionalImageChange = e => {
    this.setState({
      professional_id: e.target.files[0],
      professional_file: URL.createObjectURL(e.target.files[0]),
      professional_ext: e.target.files[0].name.split('.').pop(),
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const {description, particular_label, professional_label} = this.state.category
    const {category, particular_id, professional_id} = this.state

    if (!category.particular_label) {
      snackBarError('Il faut au moins un label particuliers')
      return
    }

    if (!category.particular_picture && !particular_id) {
      snackBarError('Il faut au moins un illustration particuliers')
      return
    }

    let arrayTags = []
    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {
        arrayTags.push(w.value)
      })
    }

    const tags = arrayTags
    const id = this.getURLProps().id
    const data={
      'particular_label': particular_label,
      'professional_label': professional_label,
      'description': description,
      'tags': tags,
    }

    axios.put(`/myAlfred/api/admin/category/all/${id || ''}`, data)
      .then(res => {
        const newCategory = res.data
        snackBarSuccess(`Catégorie ${id ? 'modifiée' : 'ajoutée' } avec succès`)
        if (particular_id || professional_id) {
          const formData = new FormData()
          if (particular_id) {
            formData.append('particular_picture', particular_id)
          }
          if (professional_id) {
            formData.append('professional_picture', professional_id)
          }
          axios.put(`/myAlfred/api/admin/category/editPicture/${newCategory._id}`, formData)
            .then(() => {
              snackBarSuccess('Illustrations mises à jour')
              Router.push(`/dashboard/category/view?id=${newCategory._id}`)
            })
            .catch(err => {
              snackBarError(err.response.data)
              Router.push(`/dashboard/category/view?id=${newCategory._id}`)
            })
        }
        else {
          Router.push(`/dashboard/category/view?id=${newCategory._id}`)
        }
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  }

  handleClick() {
    const id = this.getURLProps().id
    axios.delete(`/myAlfred/api/admin/category/all/${id}`)
      .then(() => {
        snackBarSuccess('Categorie supprimée avec succès')
        Router.push({pathname: '/dashboard/category/all'})
      })
      .catch(err => {
        console.error(err)
        snackBarError(err)
      })
  }

  render() {
    const {classes} = this.props
    const {category} = this.state

    return (
      <DashboardLayout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{category.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <Typography style={{fontSize: 20}}>Label particuliers</Typography>
                  <TextField
                    id="particular_label"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="particular_label"
                    value={category.particular_label}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{fontSize: 20}}>Label pro</Typography>
                  <TextField
                    id="professional_label"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="professional_label"
                    value={category.professional_label}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Description</Typography>
                  <TextField
                    id="description"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    multiline
                    rows="1"
                    name="description"
                    value={category.description}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid style= {{display: 'flex', flexDirection: 'vertical'}}>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Typography style={{fontSize: 20}}>Illustration particulier</Typography>
                    <DocumentEditor
                      key={'particular'}
                      ext={this.state.ext}
                      ext_upload={this.state.particular_ext}
                      db_document={category.particular_picture}
                      uploaded_file={this.state.particular_file}
                      onChange={this.onParticularImageChange}
                      title={'Illu. particulier'}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Typography style={{fontSize: 20}}>Illustration professionel</Typography>
                    <DocumentEditor
                      key={'professional'}
                      ext={this.state.ext}
                      ext_upload={this.state.professional_ext}
                      db_document={category.professional_picture}
                      uploaded_file={this.state.professional_file}
                      onChange={this.onProfessionalImageChange}
                      title={'Illu. pro'}
                    />
                  </Grid>
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
