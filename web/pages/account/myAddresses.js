const {clearAuthenticationToken}=require('../../utils/authentication')
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AlgoliaPlaces from 'algolia-places-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/myAddresses/myAddresses';
import IconButton from '@material-ui/core/IconButton';
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
const {is_b2b_admin}=require('../../utils/context')

moment.locale('fr');


class myAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pro_mode: false,
      user: null,
      company_name : null,
      suggestion_current:null,
      new_label: '',
      edit_label: '',
      service_address: [],
      addNewMode: false,
      open: false,
      selected_address: null,
      delete_address_id: '',
    };
    this.onMainAddressChange = this.onMainAddressChange.bind(this)
    this.onSecondaryAddressChange = this.onSecondaryAddressChange.bind(this);
    this.onNewAddressChange = this.onNewAddressChange.bind(this);
  }

  setState=(st, cb) => {
    console.error(`Setting state:${Object.keys(st)}`)
    super.setState(st, cb)
  }

  loadData = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          user: user,
          billing_address: user.billing_address,
          service_address: user.service_address,
          new_label: '',
          edit_label: '',
          selected_address: null,
          delete_address_id: '',
        });
        this.address_get_url = '/myAlfred/api/users/profile/address/'
        this.main_address_put_url = '/myAlfred/api/users/profile/billingAddress'
        this.service_address_put_url = '/myAlfred/api/users/profile/serviceAddress'
        this.service_address_edit_url = '/myAlfred/api/users/profile/address/'
        this.service_address_delete_url = '/myAlfred/api/users/profile/address/'
        if (is_b2b_admin(user)) {
          axios.get('/myAlfred/api/companies/current')
            .then(res => {
              let company = res.data;
              this.setState({
                company_name: company.name,
                billing_address: company.billing_address,
                service_address: company.service_address,
                new_label: '',
                edit_label: '',
                selected_address: null,
                delete_address_id: '',
                pro_mode : true,
              });
              this.address_get_url = '/myAlfred/api/companies/profile/address/'
              this.main_address_put_url = '/myAlfred/api/companies/profile/billingAddress'
              this.service_address_put_url = '/myAlfred/api/companies/profile/serviceAddress'
              this.service_address_edit_url = '/myAlfred/api/companies/profile/address/'
              this.service_address_delete_url = '/myAlfred/api/companies/profile/address/'
                  })
        }
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    this.loadData()
  }

  onDeleteClick = (id) => {
    this.setState({delete_address_id: id, open: true});
  }

  handleClose = () => {
    this.setState({delete_address_id: '', open: false});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onNewAddressChange({query, rawAnswer, suggestion, suggestionIndex}) {
    this.setState({ suggestion_new: suggestion })
  }

  onSecondaryAddressChange({query, rawAnswer, suggestion, suggestionIndex}) {
    this.setState({ suggestion_edit: suggestion })
  }

  onMainAddressChange({suggestion}) {
    this.setState({ suggestion_current: suggestion })
  }

  onEditionClick = id => {
    axios.get(this.address_get_url + id)
      .then(res => {
        let result = res.data;
        this.setState({
          selected_address: result,
          edit_label: result.label,
          addNewMode: false,
        });
      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
      });
  };

  onSubmitMain = e => {
    e.preventDefault()
    const {suggestion_current}=this.state

    const address = {
      address: suggestion_current.name,
      city: suggestion_current.city,
      zip_code: suggestion_current.postcode,
      country: suggestion_current.country,
      gps: {
        lat: suggestion_current.latlng.lat,
        lng: suggestion_current.latlng.lng
      }
    };
    axios
      .put(this.main_address_put_url, address)
      .then(res => {
        snackBarSuccess('Adresse principale modifiée');
        this.loadData()
      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
      });
  };

  onSubmitNew = e => {
    e.preventDefault();
    const {suggestion_new}=this.state
    const newAddress = {
      address: suggestion_new.name,
      city: suggestion_new.city,
      zip_code: suggestion_new.postcode,
      country: suggestion_new.country,
      lat: suggestion_new.latlng.lat,
      lng: suggestion_new.latlng.lng,
      label: this.state.new_label,
    };
    axios.put(this.service_address_put_url, newAddress)
      .then(() => {
        snackBarSuccess('Adresse ajoutée');
        this.setState({addNewMode: false});
        this.loadData();
      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
      });
  };

  addressLabel = addr => {
    if (!addr) {
      return ''
    }
    return `${addr.address}, ${addr.zip_code} ${addr.city}, ${addr.country || 'France'}`
  }

  onSubmitSecondary = (e, id) => {
    e.preventDefault()
    const {suggestion_edit, selected_address}=this.state
    const editAddress = suggestion_edit ?
    {
      address: suggestion_edit.name,
      city: suggestion_edit.city,
      zip_code: suggestion_edit.postcode,
      lat: suggestion_edit.latlng.lat,
      lng: suggestion_edit.latlng.lng,
      label: this.state.edit_label,
    }
    :
    {
      address: selected_address.address,
      city: selected_address.city,
      zip_code: selected_address.zip_code,
      lat: selected_address.lat,
      lng: selected_address.lng,
      label: this.state.edit_label,
    };

    axios.put(this.service_address_edit_url + id, editAddress)
      .then(() => {
        snackBarSuccess('Adresse modifiée avec succès');
        this.setState({selected_address: null});
        this.loadData()

      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
      });
  };

  deleteAddress = (id) => {
    axios.delete(this.service_address_delete_url + id)
      .then(() => {
        snackBarSuccess('Adresse supprimée')
        this.setState({selected_address:null, open: false, delete_address_id: ''});
        this.loadData()
      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
      });
  };

  modalDeleteAddress = () =>{
    return(
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Supprimer cette adresse ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment supprimer cette adresse ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.deleteAddress(this.state.delete_address_id)} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  content = (classes) => {
    const {billing_address, selected_address, pro_mode, company_name}=this.state
    return(
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>{ pro_mode ? 'Mes sites' : 'Mes adresses'}</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ici, vous pouvez gérer {pro_mode ? `les sites de ${company_name}` : 'vos adresses'}.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3>{ pro_mode ? 'Mon siège social' : 'Mon adresse principale'}</h3>
          </Grid>
          { this.addressLabel(billing_address) }
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
              <AlgoliaPlaces
                placeholder='Modifiez votre adresse'
                options={{
                  appId: 'plKATRG826CP',
                  apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                  language: 'fr',
                  countries: ['fr'],
                  type: 'address',
                }}
                onChange={(suggestion) => this.onMainAddressChange(suggestion)}
              />
            </Grid>
            <Grid item xs={12} lg={12} xl={12} sm={12} md={12} style={{marginTop: '5vh'}}>
              <Button disabled={!this.state.suggestion_current} size={'large'} type={'submit'} variant="contained" className={classes.buttonSave} onClick={this.onSubmitMain}>
                Valider
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h3>{ pro_mode ? 'Autres sites' : "Mon carnet d'adresses"}</h3>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajoutez plusieurs adresses et gagnez du temps.</Typography>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: '5vh'}}>
            {this.state.service_address.map((e, index) => (
              <Grid key={index} style={{width: '100%'}}>
                <Grid>
                  <Grid container style={{display: 'flex', alignItems: 'center' }}>
                    <Grid item xl={3} xs={6}>
                      { selected_address && selected_address._id==e._id ?
                        <TextField
                          id="standard-name"
                          value={this.state.edit_label}
                          onChange={this.onChange}
                          name={'edit_label'}
                          placeholder={'Ecrire ici'}
                          variant={'outlined'}
                          label={'Nom de l\'adresse'}
                          className={classes.textField}
                        />
                        :
                        <h4>{e.label}</h4>
                      }
                    </Grid>
                    <Grid item xl={2} xs={6} className={classes.editContainer}>
                      <Grid>
                        <IconButton aria-label="update" onClick={() => this.onEditionClick(e._id)}>
                          <EditIcon/>
                        </IconButton>
                      </Grid>
                      <Grid>
                        <IconButton aria-label="delete" onClick={() => this.onDeleteClick(e._id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                  { this.addressLabel(e) }
                </Typography>
                { selected_address && selected_address._id==e._id ?
                  <AlgoliaPlaces
                    placeholder='Modifiez votre adresse'
                    options={{
                      appId: 'plKATRG826CP',
                      apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                      language: 'fr',
                      countries: ['fr'],
                      type: 'address',

                    }}
                    onChange={(suggestion) => this.onSecondaryAddressChange(suggestion)}
                  />
                  :
                  null
                }
                </Grid>
                { selected_address && selected_address._id==e._id ?
                  <Grid item xs={12}>
                    <Button variant="contained" className={classes.buttonSave}  onClick={(event) => this.onSubmitSecondary(event, this.state.selected_address._id)}>
                      Enregistrer
                    </Button>
                  </Grid>
                  :
                  null
                }
              </Grid>
            ))}
            </Grid>
            <Grid>
              <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
            </Grid>
          <Grid container style={{marginTop: '5vh', marginBottom: '2vh'}}>
            <Button
              size={'large'}
              type={'submit'}
              variant="contained"
              className={classes.buttonSave}
              onClick={() => this.setState({addNewMode: !this.state.addNewMode, selected_address: null})}
            >
              { pro_mode ? 'Ajouter un site' : 'Ajouter une adresse'}
            </Button>
          </Grid>
          {this.state.addNewMode ?
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="standard-name"
                  value={this.state.new_label}
                  onChange={this.onChange}
                  name={'new_label'}
                  placeholder={'Ecrire ici'}
                  variant={'outlined'}
                  label={ pro_mode ? 'Nom du site' : "Intitulé de l\'adresse"}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <AlgoliaPlaces
                  placeholder='Recherchez votre adresse'
                  options={{
                    appId: 'plKATRG826CP',
                    apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                    language: 'fr',
                    countries: ['fr'],
                    type: 'address',
                  }}
                  onChange={(suggestion) => this.onNewAddressChange(suggestion)}
                />
              </Grid>
              <Grid item xs={12} style={{marginBottom: '12vh'}}>
                <Button disabled={!(this.state.suggestion_new&&this.state.new_label)} variant="contained" className={classes.buttonSave} onClick={this.onSubmitNew}>
                  Ajouter
                </Button>
              </Grid>
            </Grid>
            : null}
          </Grid>
      </Grid>

    )
  };

  render() {
    const {classes} = this.props;
    
    return (
      <React.Fragment>
        <Helmet>
          <title> Profil - Mes adresses de prestation - My Alfred </title>
          <meta property="description"
                content="Renseignez vos adresses de prestation et recherchez des Alfred là où vous le souhaitez ! Des services entre particuliers dans toute la France. Réservez dès maintenant votre Alfred mécanicien, plombier, électricien, coiffeur, coach sportif…"/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
          {this.state.open ? this.modalDeleteAddress() : null}
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(myAddresses);
