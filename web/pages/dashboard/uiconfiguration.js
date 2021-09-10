import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Layout from '../../hoc/Layout/Layout'
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
const {setAxiosAuthentication} = require('../../utils/authentication')
import axios from 'axios'
import _ from 'lodash'
import UIParameter from '../../components/Editor/UIParameter'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
const {snackBarSuccess, snackBarError}=require('../../utils/notifications')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

class UIConfiguration extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      parameters: [],
      page: null,
      saving: false,
    }
  }

  getTitle = () => {
    return 'Paramétrage UI'
  }

  saveImages = () => {
    // get attributes to save
    const FORM_CONFIG = {headers: {'content-type': 'multipart/form-data'}}
    const promises=[]
    this.state.parameters.forEach(p => {
      p.attributes.forEach(att => {
        if (att.value.arrayBuffer) {
          const formData = new FormData()
          formData.append('picture', att.value)
          const promise=axios.put(
            `/myAlfred/api/admin/uiConfiguration/${p._id}/${att.name}/picture`,
            formData,
            FORM_CONFIG,
          )
          promises.push(promise)
        }
      })
    })
    return Promise.all(promises)
  }

  onSubmit = () => {
    this.setState({saving: true})
    setAxiosAuthentication()
    const allPromises=this.state.parameters.map(p => axios.put(`/myAlfred/api/admin/uiConfiguration/${p._id}`, p))
    Promise.all(allPromises)
      .then(() => {
        console.log('Saved')
        // Sauvegarde images
        return this.saveImages()
      })
      .then(() => {
        return axios.post('/myAlfred/api/admin/uiConfiguration/generate')
      })
      .then(() => {
        snackBarSuccess('Configuration enregistrée')
        this.setState({saving: false})
      })
      .catch(err => {
        this.setState({saving: false})
        console.error(err)
        snackBarError(`Erreur à l'enregistrement:${err}`)
      })
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/uiConfiguration')
      .then(response => {
        let parameters=response.data
        this.setState({parameters: parameters})
        if (parameters.length>0) {
          this.setState({page: parameters[0].page})
        }
      })
  }

  onChangePage = page => {
    this.setState({page: page})
  }

  onChange = parameter_id => att_name => value => {
    const {parameters}=this.state
    const p=parameters.find(p => p._id ==parameter_id)
    let attr = p.attributes.find(a => a.name==att_name)
    if (attr) {
      attr.value=value
    }
    else {
      p.attributes.push({name: att_name, value: value})
    }

    this.setState({parameters: parameters})
  }

  render = () => {
    const {classes}=this.props
    const {parameters, page, saving}=this.state
    const groupedParameters= _.groupBy(parameters, 'page')
    const pageParameters=_.groupBy(groupedParameters[page], 'component')
    const selectedTab = Object.keys(groupedParameters).findIndex(p => p==page)

    const saveTitle=saving ? 'Génération en cours...': 'Enregistrer & générer'

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid item style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography style={{fontSize: 30}}>{this.getTitle()}</Typography>
            <Button variant='outlined' onClick={this.onSubmit} disabled={saving}>{saveTitle}</Button>
          </Grid>
          <Paper style={{width: '100%'}}>
            <Tabs value={selectedTab==-1 ? false:selectedTab}>
              {
                Object.keys(groupedParameters).map(page =>
                  <Tab key={page} label={page} onClick={() => this.onChangePage(page)} />,
                )
              }
            </Tabs>
            {
              pageParameters && Object.keys(pageParameters).map(component_name => (
                <Accordion defaultExpanded={false} TransitionProps={{unmountOnExit: true}} key={component_name}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>{component_name}</h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                      { pageParameters[component_name].map(parameter => (
                        <UIParameter key={parameter._id} title={parameter.label} parameter={parameter} onChange={this.onChange(parameter._id)}/>
                      ))
                      }
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Paper>
        </Grid>
      </Layout>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(UIConfiguration))
