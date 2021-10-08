import CustomButton from '../../components/CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import DashboardLayout from '../../hoc/Layout/DashboardLayout'
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
import TextField from '@material-ui/core/TextField'

const {snackBarSuccess, snackBarError}=require('../../utils/notifications')
import SaveIcon from '@material-ui/icons/Save'
import Fab from '@material-ui/core/Fab'

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
      filtered_parameters: [],
      current_page_name: null,
      saving: false,
      filter: '',
      // Modified parameters ids
      modified_parameters: {},
      // Known colors sorted by occurrences for HTML & Color editors
      used_colors: [],
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/uiConfiguration')
      .then(response => {
        let parameters=response.data
        this.setState({parameters: parameters, filtered_parameters: parameters})
        if (parameters.length>0) {
          this.setState({current_page_name: parameters[0].page}, () => this.sortColors())
        }
      })
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

  sortColors = () => {
    const {parameters}=this.state
    const colors=_.flatten(parameters.map(p => p.attributes.filter(att => att.value.startsWith && att.value.startsWith('#')).map(a => a.value)))
    const sorted=_.chain(colors).countBy().toPairs().sortBy(1).reverse().map(0).value()
    this.setState({used_colors: sorted})
  }

  onFilterChanged = ev => {
    const {name, value}=ev.target
    this.setState({[name]: value}, this.filterParameters)
  }

  filterParameters = () => {
    let params=this.state.parameters
    const re=new RegExp(this.state.filter, 'i')
    params=params.filter(p => p.page.match(re)||p.classname.match(re)||p.component.match(re)||p.label.match(re))
    this.setState({filtered_parameters: params})
  }

  onSubmit = () => {
    this.setState({saving: true})
    setAxiosAuthentication()
    const allPromises=Object.values(this.state.modified_parameters).map(p => axios.put(`/myAlfred/api/admin/uiConfiguration/${p._id}`, p))
    Promise.all(allPromises)
      .then(() => {
        return this.saveImages()
      })
      .then(() => {
        return axios.post('/myAlfred/api/admin/uiConfiguration/generate')
      })
      .then(() => {
        snackBarSuccess('Configuration enregistrée')
        this.setState({saving: false, modified_parameters: {}})
      })
      .catch(err => {
        this.setState({saving: false})
        console.error(err)
        snackBarError(`Erreur à l'enregistrement:${err}`)
      })
  }

  onChangePage = page_name => {
    this.setState({current_page_name: page_name})
  }

  /**
  Update paramètre/attribut.
  Si value===null (en cas de reset), suppression de l'attribut dans attributes
  */
  onChange = parameter_id => att_name => value => {
    const {parameters, modified_parameters}=this.state
    const p=parameters.find(p => p._id ==parameter_id)
    let attr = p.attributes.find(a => a.name==att_name)
    if (attr) {
      // Null : remove attribute
      if (value===null) {
        p.attributes=p.attributes.filter(a => a.name!=att_name)
      }
      attr.value=value
    }
    else if (value!==null) {
      p.attributes.push({name: att_name, value: value})
    }
    // TODO : dégueu
    if (p.type=='button' && value==null) {
      p.attributes=[]
    }
    modified_parameters[p._id]=p
    this.setState({parameters: parameters, modified_parameters: modified_parameters},
      () => { this.filterParameters(); this.sortColors() })
  }

  componentsAccordion = (parameters, prefix=[]) => {
    if (parameters.length==0) {
      return
    }
    const level=prefix.length
    const prefixName=prefix.join('/')
    const path = p => {
      const res=p.component.split('.')
      return res
    }
    // Paramètres dans le composant (path==prefix)
    const params=parameters.filter(p => _.isEqual(path(p), prefix))
    // Paramètres enfants du composant dans le composant (path.length>==prefix.length)
    const subParams=parameters.filter(p => path(p).length>level)
    // Sous-paramètres groupés par nom du niveau level
    const names=_.groupBy(subParams, p => path(p)[level])
    return (
      <Accordion defaultExpanded={false} TransitionProps={{unmountOnExit: true}} key={prefixName}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h2 style={{margin: '5px'}}>{prefixName || 'Composants'}</h2>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            { params.map(parameter => (
              <UIParameter
                key={parameter._id}
                title={parameter.label}
                parameter={parameter}
                onChange={this.onChange(parameter._id)}
                colors={this.state.used_colors} />
            ))
            }
            {Object.keys(names).map(n => this.componentsAccordion(names[n], [...prefix, n]))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }

  render = () => {
    const {classes}=this.props
    const {filtered_parameters, current_page_name, saving, filter, modified_parameters}=this.state

    const pages=_.uniqBy(filtered_parameters.map(p => p.page))

    const pageParameters=filtered_parameters.filter(p => p.page==current_page_name)
    const selectedTab = pages.findIndex(p => p==current_page_name)

    const saveTitle=saving ? 'Génération en cours...': 'Enregistrer & générer'
    const canSave = !saving && Object.keys(modified_parameters).length>0

    return (
      <DashboardLayout>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid item style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography style={{fontSize: 30}}>{this.getTitle()}</Typography>
            <CustomButton variant='outlined' onClick={this.onSubmit} disabled={!canSave}>{saveTitle}</CustomButton>
          </Grid>
          <Grid item style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <TextField name={'filter'} value={filter} onChange={this.onFilterChanged}/>
          </Grid>
          <Paper style={{width: '100%'}}>
            <Tabs value={selectedTab==-1 ? false:selectedTab} variant="scrollable">
              {
                pages.map(page =>
                  <Tab key={page} label={page} onClick={() => this.onChangePage(page)} />,
                )
              }
            </Tabs>
            {
              this.componentsAccordion(pageParameters)
            }
          </Paper>
        </Grid>
        <Grid style={{position: 'fixed', bottom: '10px', right: '100px'}}>
          <Fab color="primary" aria-label="CheckIcon" disabled={!canSave} onClick={this.onSubmit}>
            <SaveIcon />
          </Fab>
        </Grid>
      </DashboardLayout>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(UIConfiguration))
