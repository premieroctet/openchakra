import React, {Fragment} from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
import styles from '../../static/css/pages/paymentPreference/paymentPreference';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {Helmet} from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import {formatIban} from '../../utils/text';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SecurityIcon from "@material-ui/icons/Security";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";


moment.locale('fr');

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
            Router.push({pathname: '/'});
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

  handleCloseModalAddRib = () =>{
    this.setState({clickAdd: false})
  };

  modalAddRib = (errors, classes) =>{
    return(
      <Dialog
        open={this.state.clickAdd}
        onClose={() => this.handleCloseModalAddRib()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseModalAddRib}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems : 'center'}}>
            <Grid>
              <h4>Ajouter un RIB</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajouter un RIB en toute sécurité</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{margin: '15px'}}>
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
            <Grid style={{margin: '15px'}}>
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
            <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
              <Button
                onClick={this.onSubmit}
                variant="contained"
                classes={{root: classes.buttonSave}}
              >
                Enregistrer le RIB
              </Button>
            </Grid>
            <Grid style={{display: 'flex', alignItems: 'center'}}>
              <Grid>
                <Grid>
                  <SecurityIcon style={{color: 'rgba(39,37,37,35%)'}}/>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>Toutes les données de paiement sur My Alfred sont cryptées.</Typography>
                </Grid>
                <Grid>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>Elles sont gérées par mangopay notre partenaire de confiance.</Typography>
                </Grid>
              </Grid>
            </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  modalDeleteRib = (id) =>{
    return(
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
          <Button onClick={() => this.deleteAccount(id)} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  content = () => {
    return(
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Relevé d’identité bancaire</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Vous pouvez faire le choix d’ajouter un RIB pour vos versements.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3>RIB enregistrés</h3>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Choisissez le versement directement sur votre compte bancaire.</Typography>
          </Grid>
        </Grid>
        {this.state.haveAccount ?
          <Grid container style={{marginTop: '10vh', display: 'flex', alignItems: 'center'}}>
            <Grid item xl={7} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid item xl={2} style={{display: 'flex'}}>
                <AccountBalanceIcon/>
              </Grid>
              <Grid item xl={6} style={{display: 'flex', flexDirection:'column'}}>
                <Grid>
                  <Grid>
                    <Typography>{this.state.accounts[0].OwnerName}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>{formatIban(this.state.accounts[0].IBAN)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={5} style={{display: 'flex', justifyContent: 'center'}}>
              <IconButton aria-label="delete" onClick={()=>this.handleClick2()}>
                <DeleteForeverIcon/>
              </IconButton>
            </Grid>
          </Grid>
          :
          null
        }
        <Grid style={{marginTop: '10vh'}}>
          <Grid style={{display :'flex', alignItems: 'center'}}>
            <Grid>
              <IconButton aria-label="add" onClick={this.handleClick}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography>Ajouter un rib</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12vh'}}>
          <Grid style={{marginRight: '2vh'}}>
            <Grid>
              <SecurityIcon style={{color: 'rgba(39,37,37,35%)'}}/>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Typography style={{color:'rgba(39,37,37,35%)'}}>Toutes les données de paiement sur My Alfred sont cryptées.</Typography>
            </Grid>
            <Grid>
              <Typography style={{color:'rgba(39,37,37,35%)'}}>Elles sont gérées par mangopay notre partenaire de confiance.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    )
  };

  render() {
    const {classes, index} = this.props;
    const {accounts, clickAdd, clickDelete, haveAccount, errors} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>compte - Préférences de versement - My Alfred </title>
          <meta property="description"
                content="My Alfred, des services entre particuliers et auto-entrepreneurs rémunérés ! Choisissez vos méthodes de versement de vos rémunérations pour chacun des services réalisés. Versement 72h après la prestation."/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount index={index}>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
          {clickAdd ? this.modalAddRib(errors,classes) : null}
          {clickDelete ? this.modalDeleteRib(accounts[0].Id) : null}
      </Fragment>
    );
  }
}


export default withStyles(styles)(paymentPreference);
