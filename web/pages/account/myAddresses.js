import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AlgoliaPlaces from 'algolia-places-react';
import {toast} from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/myAddresses/myAddresses';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

moment.locale('fr');


class myAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      address: '',
      city: '',
      country: '',
      zip_code: '',
      currentAddress: '',
      currentCity: '',
      currentZip_code: '',
      currentCountry: '',
      currentLat: '',
      currentLng: '',
      label_address: '',
      new_address: '',
      new_city: '',
      new_zip_code: '',
      note: '',
      phone: '',
      lat: '',
      lng: '',
      service_address: [],
      clickAdd: false,
      clickEdit: false,
      open: false,
      address_selected: {},
      edit_label: '',
      edit_address: '',
      edit_city: '',
      edit_zip_code: '',
      edit_note: '',
      edit_phone: '',
      edit_lat: '',
      edit_lng: '',
      id_address: '',
    };
    this.onChangeAlgolia = this.onChangeAlgolia.bind(this);
    this.onChangeAlgolia2 = this.onChangeAlgolia2.bind(this);

  }

  static getInitialProps({query: {indexAccount}}) {
    return {index: indexAccount};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
        if (typeof user.billing_address != 'undefined') {
          this.setState({
            address: true,
            currentAddress: user.billing_address.address,
            currentCity: user.billing_address.city,
            currentZip_code: user.billing_address.zip_code,
            currentCountry: user.billing_address.country,
            currentLat: user.billing_address.gps.lat,
            currentLng: user.billing_address.gps.lng,
          });
        } else {
          this.setState({address: false});
        }
        this.setState({service_address: user.service_address});
      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );
  }

  handleClickOpen = (id) => {
    this.setState({id_address: id, open: true});
  }

  handleClose = () => {
    this.setState({id_address: '', open: false});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onChangeAlgolia({query, rawAnswer, suggestion, suggestionIndex}) {
    this.setState({
      new_city: suggestion.city, new_address: suggestion.name, new_zip_code: suggestion.postcode,
      lat: suggestion.latlng.lat, lng: suggestion.latlng.lng,
    });
  }

  onChangeAlgolia2({query, rawAnswer, suggestion, suggestionIndex}) {
    this.setState({
      edit_city: suggestion.city, edit_address: suggestion.name, edit_zip_code: suggestion.postcode,
      edit_lat: suggestion.latlng.lat, edit_lng: suggestion.latlng.lng,
    });
  }

  onChangeAlgolia3({suggestion}) {
    this.setState({
      currentCity: suggestion.city, currentAddress: suggestion.name, currentZip_code: suggestion.postcode,
      currentLat: suggestion.latlng.lat, currentLng: suggestion.latlng.lng, currentCountry: suggestion.country,
    });
  }

  handleClick = (id) => {
    this.setState({clickAdd: false, clickEdit: true});
    axios.get('/myAlfred/api/users/profile/address/' + id)
      .then(res => {
        let result = res.data;
        this.setState({
          address_selected: result,
          edit_label: result.label,
          edit_address: result.address,
          edit_zip_code: result.zip_code,
          edit_city: result.city,
          edit_lat: result.lat,
          edit_lng: result.lng,
        });
      })
      .catch();
  };

  onSubmit = e => {
    e.preventDefault();
    const address = {
      address: this.state.currentAddress,
      city: this.state.currentCity,
      zip_code: this.state.currentZip_code,
      country: this.state.currentCountry,
      lat: this.state.currentLat,
      lng: this.state.currentLng,
    };
    axios
      .put('/myAlfred/api/users/profile/billingAddress', address)
      .then(res => {
        toast.info('Adresse principale modifiée');
        Router.push({pathname: '/account/myAddresses'});
      })
      .catch();
  };

  onSubmit2 = e => {
    e.preventDefault();
    const newAddress = {
      address: this.state.new_address,
      city: this.state.new_city,
      zip_code: this.state.new_zip_code,
      lat: this.state.lat,
      lng: this.state.lng,
      label: this.state.label_address,
    };
    axios.put('/myAlfred/api/users/profile/serviceAddress', newAddress)
      .then(() => {
        toast.info('Adresse ajoutée');
        this.setState({clickAdd: false});
        this.componentDidMount();
      })
      .catch();

  };

  onSubmit3 = (e, id) => {
    e.preventDefault();
    const editAddress = {
      address: this.state.edit_address,
      city: this.state.edit_city,
      zip_code: this.state.edit_zip_code,
      lat: this.state.edit_lat,
      lng: this.state.edit_lng,
      label: this.state.edit_label,
    };

    axios.put('/myAlfred/api/users/profile/address/' + id, editAddress)
      .then(() => {
        toast.info('Adresse modifiée avec succès');
        this.setState({clickEdit: false});
        this.componentDidMount();

      })
      .catch();
  };

  deleteAddress = (id) => {
    axios.delete('/myAlfred/api/users/profile/address/' + id)
      .then(() => {
        toast.error('Adresse supprimée');
        this.setState({clickEdit: false, open: false, id_address: ''});
        this.componentDidMount();
      })
      .catch();
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
          <Button onClick={() => this.deleteAddress(this.state.id_address)} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const {classes, index} = this.props;
    const {clickAdd, clickEdit, service_address, address_selected} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title> Profil - Mes adresses de prestation - My Alfred </title>
          <meta property="description"
                content="Renseignez vos adresses de prestation et recherchez des Alfred là où vous le souhaitez ! Des services entre particuliers dans toute la France. Réservez dès maintenant votre Alfred mécanicien, plombier, électricien, coiffeur, coach sportif…"/>
        </Helmet>
        <LayoutAccount index={index}>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <Grid>
                <h2>Mes adresses</h2>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ici, vous pouvez gérer vos adresses.</Typography>
              </Grid>
            </Grid>
            <Grid>
              <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
            </Grid>
            <Grid>
              <Grid>
                <h3>Mon adresse principale</h3>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Grid>
                <Grid>
                  <Grid>
                    <Grid>
                      <AlgoliaPlaces
                        placeholder='Recherchez votre adresse'
                        options={{
                          appId: 'plKATRG826CP',
                          apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                          language: 'fr',
                          countries: ['fr'],
                          type: 'address',
                        }}
                        onChange={(suggestion) => this.onChangeAlgolia3(suggestion)}
                      />
                    </Grid>
                    <form onSubmit={this.onSubmit}>
                      <Grid>
                        <Grid>
                          <TextField
                            inputProps={{
                              readOnly: true,
                              style: {cursor: 'default'},
                            }}
                            style={{width: '100%'}}
                            value={this.state.currentAddress}
                            name={'currentAddress'}
                            onChange={this.onChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={'Adresse'}
                            label={'Rue'}
                          />
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item xl={6}>
                            <TextField
                              inputProps={{
                                readOnly: true,
                                style: {cursor: 'default'},
                              }}
                              className={classes.textField}
                              style={{width: '100%'}}
                              value={this.state.currentZip_code}
                              name={'currentZip_code'}
                              onChange={this.onChange}
                              margin="normal"
                              variant="outlined"
                              placeholder={'Code postal'}
                              label={'Code postal'}
                            />
                          </Grid>
                          <Grid item xl={6}>
                            <TextField
                              inputProps={{
                                readOnly: true,
                                style: {cursor: 'default'},
                              }}
                              id="outlined-name"
                              style={{width: '100%'}}
                              value={this.state.currentCity}
                              name={'currentCity'}
                              onChange={this.onChange}
                              margin="normal"
                              variant="outlined"
                              placeholder={'Ville'}
                              label={'Ville'}
                            />
                          </Grid>
                        </Grid>
                        <Grid>
                          <TextField
                            inputProps={{
                              readOnly: true,
                              style: {cursor: 'default'},
                            }}
                            id="outlined-select-currency"
                            style={{width: '100%'}}
                            value={this.state.currentCountry}
                            onChange={this.onChange}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu,
                              },
                            }}
                            margin="normal"
                            variant="outlined"
                            name={'currentCountry'}
                            label={'Pays'}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: '5vh'}}>
                        <Button size={'large'} type={'submit'} variant="contained" className={classes.buttonSave}>
                          Valider
                        </Button>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
                <Grid>
                  <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
                </Grid>
                <Grid>
                  <Grid>
                    <h3>Mon carnet d’adresse</h3>
                  </Grid>
                  <Grid>
                    <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajoutez plusieurs adresses et gagnez du temps.</Typography>
                  </Grid>
                </Grid>
                <Grid container style={{marginTop: '5vh'}}>
                  {service_address.map((e, index) => (
                    <Grid key={index} style={{width: '100%'}}>
                      <Grid>
                        <Grid container style={{display: 'flex', alignItems: 'center' }}>
                          <Grid item xl={3}>
                            <h4>{e.label}</h4>
                          </Grid>
                          <Grid item xl={2} style={{display : 'flex'}}>
                            <Grid>
                              <IconButton aria-label="update" onClick={() => this.handleClick(e._id)}>
                                <EditIcon/>
                              </IconButton>
                            </Grid>
                            <Grid>
                              <IconButton aria-label="delete" onClick={() => this.handleClickOpen(address_selected._id)}>
                                <DeleteForeverIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Typography style={{color: 'rgba(39,37,37,35%)'}}>{e.address}</Typography>
                        <Typography style={{color: 'rgba(39,37,37,35%)'}}>{e.zip_code} {e.city}</Typography>
                        <Typography style={{color: 'rgba(39,37,37,35%)'}}>France</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid container style={{marginTop: 20}}>
                  <Button
                    size={'large'}
                    type={'submit'}
                    variant="contained"
                    className={classes.buttonSave}
                    onClick={() => this.setState({clickAdd: !clickAdd, clickEdit: false})}
                  >
                    Ajouter une adresse
                  </Button>
                </Grid>
                {clickAdd ?
                  <form onSubmit={this.onSubmit2}>
                    <Grid>
                      <Grid>
                        <TextField
                          id="standard-name"
                          style={{marginTop: 30, width: '100%'}}
                          value={this.state.label_address}
                          onChange={this.onChange}
                          margin="normal"
                          name={'label_address'}
                          placeholder={'Ecrire ici'}
                          variant={'outlined'}
                          label={'Nom de l\'adresse'}
                        />
                      </Grid>
                      <Grid>
                        <Grid style={{marginTop: 20}}>
                          <AlgoliaPlaces
                            placeholder='Recherchez votre adresse'
                            options={{
                              appId: 'plKATRG826CP',
                              apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                              language: 'fr',
                              countries: ['fr'],
                              type: 'address',
                            }}
                            onChange={(suggestion) => this.onChangeAlgolia(suggestion)}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: 20}}>
                        <TextField
                          style={{marginTop: 15, width: '100%'}}
                          value={this.state.new_address}
                          onChange={this.onChange}
                          inputProps={{
                            readOnly: true,
                            style: {cursor: 'default'},
                          }}
                          margin="normal"
                          name={'new_address'}
                          variant={'outlined'}
                          label={'Rue'}
                        />
                      </Grid>
                      <Grid>
                        <Grid style={{marginTop: 20}}>
                          <TextField
                            style={{marginTop: 15, width: '100%'}}
                            value={this.state.new_zip_code}
                            onChange={this.onChange}
                            inputProps={{
                              readOnly: true,
                              style: {cursor: 'default'},
                            }}
                            margin="normal"
                            name={'new_zip_code'}
                            variant={'outlined'}
                            label={'Code postal'}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: 20}}>
                        <TextField
                          style={{marginTop: 15, width: '100%'}}
                          value={this.state.new_city}
                          onChange={this.onChange}
                          inputProps={{
                            readOnly: true,
                            style: {cursor: 'default'},
                          }}
                          margin="normal"
                          name={'new_city'}
                          variant={'outlined'}
                          label={'Ville'}
                        />
                      </Grid>
                    </Grid>
                    <Button size={'large'} type={'submit'} variant="contained" className={classes.buttonSave}>
                      Enregistrer
                    </Button>
                  </form>
                  : null}
                {clickEdit ?
                  <form onSubmit={(event) => this.onSubmit3(event, address_selected._id)}>
                    <Grid>
                      <Grid>
                        <TextField
                          id="standard-name"
                          style={{marginTop: 30, width: '100%'}}
                          value={this.state.edit_label}
                          onChange={this.onChange}
                          margin="normal"
                          name={'edit_label'}
                          placeholder={'Ecrire ici'}
                          variant={'outlined'}
                          label={'Nom de l\'adresse'}
                        />
                      </Grid>
                      <Grid >
                        <Grid style={{marginTop: 20}}>
                          <AlgoliaPlaces
                            placeholder='Recherchez votre adresse'
                            options={{
                              appId: 'plKATRG826CP',
                              apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                              language: 'fr',
                              countries: ['fr'],
                              type: 'address',

                            }}
                            onChange={(suggestion) => this.onChangeAlgolia2(suggestion)}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: 20}}>
                        <TextField
                          style={{marginTop: 15, width: '100%'}}
                          value={this.state.edit_address}
                          onChange={this.onChange}
                          margin="normal"
                          name={'edit_address'}
                          placeholder={'Ecrire ici'}
                          variant={'outlined'}
                          label={'Rue'}
                        />
                      </Grid>
                      <Grid>
                        <Grid style={{marginTop: 20}}>
                          <TextField
                            style={{marginTop: 15, width: '100%'}}
                            value={this.state.edit_zip_code}
                            onChange={this.onChange}
                            margin="normal"
                            name={'edit_zip_code'}
                            placeholder={'Ecrire ici'}
                            variant={'outlined'}
                            label={'Code postal'}
                          />
                        </Grid>
                      </Grid>
                      <Grid style={{marginTop: 20}}>
                        <TextField
                          style={{marginTop: 15, width: '100%'}}
                          value={this.state.edit_city}
                          onChange={this.onChange}
                          margin="normal"
                          name={'edit_city'}
                          placeholder={'Ecrire ici'}
                          variant={'outlined'}
                          label={'Ville'}
                        />
                      </Grid>
                    </Grid>
                    <Button size={'large'} type={'submit'} variant="contained" className={classes.buttonSave}>
                      Enregistrer
                    </Button>
                  </form>
                  : null}
              </Grid>
            </Grid>
          </Grid>
          {this.state.open ? this.modalDeleteAddress() : null}
        </LayoutAccount>
      </Fragment>
    );
  };
}

export default withStyles(styles)(myAddresses);
