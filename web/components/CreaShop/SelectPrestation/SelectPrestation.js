const {setAxiosAuthentication}=require('../../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch'
import {Divider, Typography} from '@material-ui/core'
import axios from 'axios'
import styles from '../../../static/css/components/SelectPrestation/SelectPrestation'
import {CUSTOM_PRESTATIONS_FLTR, generate_id, GID_LEN, COMPANY_PRIVATE_FLTR} from '../../../utils/consts'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {SHOP} from '../../../utils/i18n'
import _ from 'lodash'
const {getLoggedUserId}=require('../../../utils/context')

// TODO fix prestaitons personnalisées qui disparaissent lors du clic sur "Précédent"
class SelectPrestation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      grouped: [],
      prestations: this.props.prestations || {},
      service: null,
      service_name: '',
      all_billlings: [],
      isCustomPresta: false,
    }
    this.prestationSelected = this.prestationSelected.bind(this)
    this.addCustomPrestation = this.addCustomPrestation.bind(this)
    this.removeCustomPrestation = this.removeCustomPrestation.bind(this)
  }

  componentDidMount() {

    // Get current alfred id
    const alfred_id = getLoggedUserId()
    const part = this.props.particular_access
    const pro = this.props.professional_access
    let billings = null
    setAxiosAuthentication()
    axios.get('/myAlfred/api/billing/all')
      .then(res => {
        billings = res.data
        this.setState({all_billings: billings})
      })
    axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(res => {
        let service = res.data
        this.setState({service_name: service.label})
      })
      .catch(error => console.error(error))
    axios.get(`/myAlfred/api/prestation/${this.props.service}`)
      .then(res => {
        let prestations = res.data
        // Filter paarticular/professional
        prestations=prestations.filter(p => (p.particular_access && part)||(p.professional_access && pro))
        // Remove private belonging to other Alfreds
        prestations = prestations.filter(p => !p.private_alfred || p.private_alfred == alfred_id)
        let private_prestations = prestations.filter(p => Boolean(p.private_alfred))
        let companyPrestations = prestations.filter(p => Boolean(p.private_company))
        let public_prestations = prestations.filter(p => !p.private_alfred && !p.private_company)
        let grouped = _.mapValues(_.groupBy(public_prestations, 'filter_presentation.label'),
          clist => clist.map(el => _.omit(el, 'filter_presentation.label')))
        let presta_templates = private_prestations.map(p => {
          return {...p, billing: billings}
        })
        grouped = {[ CUSTOM_PRESTATIONS_FLTR ]: presta_templates, ...grouped}
        grouped = {[ COMPANY_PRIVATE_FLTR ]: companyPrestations, ...grouped}
        this.setState({grouped: grouped})
      }).catch(error => {
        console.error(error)
      })
  }

  addCustomPrestation() {
    let grouped = this.state.grouped
    let custom_presta = {
      _id: generate_id(),
      label: '',
      service: this.state.service,
      billing: this.state.all_billings,
      description: '',
      price: null,
      private_alfred: getLoggedUserId(),
      particular_access: this.props.particular_access,
      professional_access: this.props.professional_access,
      isCustomPresta: true,
    }
    grouped[ CUSTOM_PRESTATIONS_FLTR ].push(custom_presta)
    this.setState({grouped: grouped})
  }

  removeCustomPrestation(presta_id) {
    this.prestationSelected(presta_id, false)
    let grouped = this.state.grouped
    grouped[ CUSTOM_PRESTATIONS_FLTR ] = grouped[ CUSTOM_PRESTATIONS_FLTR ].filter(p => p._id !== presta_id)
    this.setState({grouped: grouped})
  }

  prestationSelected(prestaId, checked, price, billing, label) {
    let sel = this.state.prestations
    if (checked) {
      sel[ prestaId ] = {_id: prestaId, label: label, price: price, billing: billing}
      if (prestaId.toString().length==GID_LEN) {
        sel[ prestaId ].private_alfred=getLoggedUserId()
      }
    } else {
      delete sel[ prestaId ]
    }
    this.setState({prestations: sel})
    this.props.onChange(sel)
  }

  render() {
    // FIX : le billing par défaut n'ets pas sélectionné
    const {classes} = this.props

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
          <h2 className={classes.policySizeTitle}>{SHOP.parameter.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 style={{color: '#696767'}}>{SHOP.parameter.subtitle}</h3>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={() => this.addCustomPrestation()}
                className={classes.margin}
              >
                <AddIcon className={classes.extendedIcon}/>
                <Typography style={{textTransform: 'initial', color: 'white'}}>{SHOP.parameter.presta_perso}</Typography>
              </Fab>
            </Grid>
            {Object.keys(this.state.grouped).map((fltr, i) => {
              let prestas = this.state.grouped[ CUSTOM_PRESTATIONS_FLTR ]
              return (
                <Grid key={i} className={classes.maxWidth}>
                  {
                    fltr === COMPANY_PRIVATE_FLTR ? null : <Grid className={classes.marginThirty}>
                      <Typography style={{color: '#696767'}}>{(['Aucun', 'undefined'].includes(fltr) ||!fltr) ? 'Prestations standard' : fltr === 'Prestations personnalisées' && this.state.grouped[ 'Prestations personnalisées' ].length === 0 ? '' : fltr}</Typography>
                    </Grid>
                  }
                  <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                    {prestas ? prestas.map(p => {
                      let isEditable = p._id.length === GID_LEN
                      let presta = this.state.prestations[ p._id ]
                      return (
                        <Grid key={p._id} item xl={6} lg={6} md={12} sm={12} xs={12}>
                          <ButtonSwitch
                            isOption={true}
                            isPrice={true}
                            width={'100%'}
                            label={p.label}
                            id={p._id}
                            checked={p.isCustomPresta ? true : presta != null}
                            billings={p.billing}
                            onChange={this.prestationSelected}
                            isEditable={isEditable}
                            price={presta ? presta.price : null}
                            billing={presta ? presta.billing : null}
                          />
                          {
                            p.description ? <Grid style={{marginTop: 40}}>
                              <Typography><em><pre>{p.description}</pre></em></Typography>
                            </Grid> : null
                          }
                          <hr style={{color: 'rgb(255, 249, 249, 0.6)', borderRadius: 10}}/>
                        </Grid>
                      )
                    }) : null}
                  </Grid>
                </Grid>
              )
            })
            }
          </Grid>
        </Grid>
        {
          this.state.grouped[ COMPANY_PRIVATE_FLTR ] ? <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Divider/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3 style={{color: '#696767'}}>{SHOP.parameter.titleIsPro}</h3>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Typography>{SHOP.parameter.descriptionIsPro}</Typography>
            </Grid>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2} style={{width: '100%', margin: 0}}>
              {this.state.grouped[ COMPANY_PRIVATE_FLTR ].map(res => {
                let isEditable = res._id.length === GID_LEN
                let presta = this.state.prestations[ res._id ]
                return(
                  <Grid key={res._id} item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ButtonSwitch
                      isOption={true}
                      isPrice={true}
                      width={'100%'}
                      label={res.label}
                      id={res._id}
                      checked={res.isCustomPresta}
                      billings={res.billing}
                      onChange={this.prestationSelected}
                      isEditable={isEditable}
                      price={presta ? presta.price : null}
                      billing={presta ? presta.billing : null}
                    />
                    {
                      res.description ? <Typography>Infos : {res.description}</Typography> : null
                    }
                  </Grid>
                )
              })}
            </Grid>
          </Grid> : null
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(SelectPrestation)
