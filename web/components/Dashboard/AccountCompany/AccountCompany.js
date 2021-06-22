import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '../../Box/Box'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/DashboardAccount/DashboardAccount'
import {TextField} from '@material-ui/core'
import axios from 'axios'
import {setAxiosAuthentication} from '../../../utils/authentication'
import {COMPANY_ACTIVITY, COMPANY_SIZE} from '../../../utils/consts'
import Typography from '@material-ui/core/Typography'
import HandleCB from '../../HandleCB/HandleCB'
import HandleRIB from '../../HandleRIB/HandleRIB'
const moment=require('moment')
moment.locale('fr')

class AccountCompany extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      company: {},
      activityArea: '',
      sizeCompany: '',
      companyName: '',
      siret: '',
      tva: '',
      billing_address: {},
      service_address: [],
      cards: [],
      accounts: [],
      haveAccount: false,

    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    this.load()
  }

  load = () => {
    axios.get('/myAlfred/api/companies/current').then(res => {
      const company = res.data
      this.setState({
        company: company,
        website: company.website,
        activityArea: company.activity,
        sizeCompany: company.size,
        billing_address: company.billing_address,
        companyName: company.name,
        description: company.description,
        siret: company.siret,
        tva: company.vat_number,
        service_address: company.service_address,
      })
    }).catch(err => console.error(err))

    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts})
        }
      }).catch(err => { console.error(err) })
  }

  handleChange = event => {
    let {name, value} = event.target
    if (name === 'siret') {
      if(value.match(/^[0-9]*$/)) {
        value = value.replace(/ /g, '')
        this.setState({[name]: value})
      }
    }
    else{
      this.setState({[name]: value})
    }
  };

  addressLabel = addr => {
    if (!addr) {
      return ''
    }
    return `${addr.address}, ${addr.zip_code} ${addr.city}, ${addr.country || 'France'}`
  }

  render() {
    const {classes} = this.props
    const{companyName, sizeCompany, siret, activityArea, tva, billing_address, service_address} = this.state

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%', margin: 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <h3>Mon Compte</h3>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{width: '100%', margin: 0}}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <h3>A propos de mon entreprise</h3>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField readonly variant={'outlined'} InputLabelProps={{shrink: true}} label={'Nom'} value={companyName} classes={{root: classes.textField}}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField variant={'outlined'} InputLabelProps={{shrink: true}} label={'siret'} value={siret} readonly classes={{root: classes.textField}}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.containerAlgolia}>
                <TextField readonly InputLabelProps={{shrink: true}} label={'adresse'} variant={'outlined'} classes={{root: classes.textField}} value={billing_address ? `${billing_address.address}, ${billing_address.zip_code}, ${billing_address.country}` : 'Adresse de facturation'}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField readonly InputLabelProps={{shrink: true}} classes={{root: classes.textField}} value={COMPANY_SIZE[sizeCompany]} label={'Secteur d\'activité'} variant={'outlined'}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField readonly InputLabelProps={{shrink: true}} classes={{root: classes.textField}} value={COMPANY_ACTIVITY[activityArea]} label={'Taille de l’entreprise'} variant={'outlined'}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField readonly variant={'outlined'} value={tva} InputLabelProps={{shrink: true}} label={'tva'} classes={{root: classes.textField}}/>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <h3>Mes sites</h3>
              </Grid>
              <Grid container spacing={2} style={{width: '100%', margin: 0}} item xl={12} lg={12} md={12} sm={12} xs={12}>
                {
                  service_address.length > 0 ?
                    service_address.map((e, index) => (
                      <Grid key={index} item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                          {this.addressLabel(e)}
                        </Typography>
                      </Grid>
                    )) :
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <a href={'/account/myAddresses'}>Aucun site enregistré rendez vous ici pour en ajouter</a>
                    </Grid>
                }
              </Grid>
              <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2} style={{margin: 0, width: '100%'}}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <HandleCB/>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: '5vh 0px'}}/>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <HandleRIB/>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AccountCompany)
