import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
import styles from './paymentPreference/paymentPreferenceStyle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {Helmet} from 'react-helmet';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {formatIban} from '../../utils/text';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";


moment.locale('fr');


class paymentPreference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      clickAdd: false,
      clickDelete: false,
      accounts: [],
      haveAccount: false,
      bic: '',
      iban: '',
      errors: {},
    };
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
        this.setState({user: res.data});

      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );
    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data;
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts});
        }
      });
  }

  handleClick = () => {
    this.setState({clickAdd: !this.state.clickAdd});
  };

  handleClick2 = () => {
    this.setState({clickDelete: !this.state.clickDelete});
  };

  handleClose() {
    this.setState({clickDelete: false});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      bic: this.state.bic,
      iban: this.state.iban,
    };

    this.setState({errors: {}});
    axios.post('/myAlfred/api/payment/bankAccount', data)
      .then(res => {
        toast.info('RIB ajouté');

        this.setState({clickAdd: false});
        axios.get('/myAlfred/api/payment/activeAccount')
          .then(response => {
            let accounts = response.data;
            if (accounts.length) {
              this.setState({haveAccount: true, accounts: accounts});
            }
          });

      })
      .catch(err => {
        toast.error('Erreur à l\'ajout du RIB');
        try {
          this.setState({errors: err.response.data.errors});
        } catch (err) {
          console.error(err);
        }
      });
  };

  deleteAccount(id) {
    const data = {
      id_account: id,
    };
    axios.put('/myAlfred/api/payment/account', data)
      .then(() => {
        toast.error('Compte bancaire supprimé');
        this.refresh();
      })
      .catch(() => {
        toast.error('Un erreur est survenue');
      });

  }

  refresh() {
    this.setState({clickDelete: false, haveAccount: false});
    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data;
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts});
        }
      });
  }

  render() {
    const {classes, index} = this.props;
    const {accounts, clickAdd, clickDelete, haveAccount, errors} = this.state;

    console.log(JSON.stringify(errors, null, 2));
    return (
      <Fragment>
        <Helmet>
          <title>compte - Préférences de versement - My Alfred </title>
          <meta property="description"
                content="My Alfred, des services entre particuliers et auto-entrepreneurs rémunérés ! Choisissez vos méthodes de versement de vos rémunérations pour chacun des services réalisés. Versement 72h après la prestation."/>
        </Helmet>
        <LayoutAccount index={index}>
          <Grid container className={classes.bigContainer}>
            <Grid item xs={9} className={classes.containerLeft}>
              <Grid container>
                <h1 style={{color: 'dimgray', fontWeight: '100'}}>Préférence de versement</h1>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <h2 style={{color: 'dimgray', fontWeight: '100'}}>RIB</h2>
                </Grid>
                <Grid item className={classes.containerBank}>
                  <p>Compte bancaire (par défaut)</p>
                  {haveAccount ?
                    <p>{accounts[0].OwnerName}, {formatIban(accounts[0].IBAN)}</p>
                    :
                    <p>Aucun rib</p>
                  }
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  {haveAccount ?
                    <h2 className={classes.h2Style} onClick={() => this.handleClick2()}>Supprimer le RIB</h2>
                    :
                    <h2 className={classes.h2Style} onClick={this.handleClick}>Ajouter un RIB</h2>
                  }
                </Grid>
                {clickAdd ?
                  <Grid container>
                    <Grid item style={{marginBottom: '25%'}}>
                      <form onSubmit={this.onSubmit}>
                        <Grid item>
                          <TextField
                            id="outlined-name"
                            style={{width: '100%'}}
                            value={this.state.iban}
                            name={'iban'}
                            onChange={this.onChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={'IBAN'}
                            label={'IBAN'}
                            error={errors.iban}
                            helperText={errors.iban}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            style={{width: '100%'}}
                            value={this.state.bic}
                            name={'bic'}
                            onChange={this.onChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={'Code SWIFT / BIC'}
                            label={'Code SWIFT / BIC'}
                            error={errors.bic}
                            helperText={errors.bic}
                          />
                        </Grid>
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                          <Button size={'large'} type={'submit'} variant="contained" color="primary"
                                  style={{color: 'white', marginTop: 15}}>
                            Ajouter le rib
                          </Button>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                  : null}
                {clickDelete ?
                  <Dialog
                    open={this.state.clickDelete}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{'Voulez-vous vraiment supprimer votre RIB ?'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Si vous supprimez votre RIB vous ne pourrez plus l'utiliser par la suite avec ce compte.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.handleClose()} color="primary">
                        Annuler
                      </Button>
                      <Button onClick={() => this.deleteAccount(accounts[0].Id)} color="secondary" autoFocus>
                        Supprimer
                      </Button>
                    </DialogActions>
                  </Dialog>
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </LayoutAccount>
      </Fragment>
    );
  }


}


export default withStyles(styles)(paymentPreference);
