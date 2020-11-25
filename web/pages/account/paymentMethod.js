import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Cards from 'react-credit-cards';
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from '../../components/utils';
import '../../static/creditcards.css';
import {Helmet} from 'react-helmet';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../../static/css/pages/paymentMethod/paymentMethod';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import PaymentCard from "../../components/Payement/PaymentCard/PaymentCard";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import SecurityIcon from '@material-ui/icons/Security';
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


class paymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      user: {},
      cards: [],
      card_number: '',
      expiration_date: '',
      issuer: '',
      focused: '',
      name: '',
      csv: '',
      goodside: false,
      deletedial: false,
      Idtempo: '',
      addCreditCard: false
    };
    this.callDrawer = this.callDrawer.bind(this);
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
        this.setState({
          user: res.data,
          userName: this.state.user.name + ' ' + this.state.user.firstname,
          name: this.state.userName
        });
      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );

    axios.get('/myAlfred/api/payment/cards')
      .then(response => {
        let cards = response.data;
        this.setState({cards: cards});
      });
  }

  refreshCards = () => {
    axios.get('/myAlfred/api/payment/cards')
      .then(response => {
        let cards = response.data;
        this.setState({cards: cards});
      });
  };

  handleCloseDial = () => {
    this.setState({deletedial: false});
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleCallback = ({issuer}, isValid) => {
    if (isValid) {
      this.setState({issuer});
    }
  };

  handleInputChange = ({target}) => {
    if (target.name === 'card_number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiration_date') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'csv') {
      target.value = formatCVC(target.value);
    }

    this.setState({[target.name]: target.value});
  };

  addCard = () => {
    const card_number = this.state.card_number.replace(/\s/g, '');
    const expiration_date = this.state.expiration_date.split('/');
    const finaldate = expiration_date[0] + expiration_date[1];
    const csv = this.state.csv;

    const obj = {
      card_number: card_number,
      expiration_date: finaldate,
      csv: csv,
    };

    axios.post('/myAlfred/api/payment/createCard', obj)
      .then(() => {
        axios.get('/myAlfred/api/payment/cards')
          .then(response => {
            let cards = response.data;
            this.setState({cards: cards});
          });
      }).catch(err => console.error(err));
  };

  deleteCard = (id) => {
    const obj = {id_card: id};
    axios.put('/myAlfred/api/payment/cards', obj)
      .then(() => {
        axios.get('/myAlfred/api/payment/cards')
          .then(response => {
            let cards = response.data;
            this.setState({cards: cards});
          });
      });
  };

  handleCloseCreditCard = () =>{
    this.setState({addCreditCard: false});
  };

  callAddCreditCard = () =>{
    this.setState({addCreditCard: true});

  };

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  callDialogDeletedCard = (e) =>{
    this.setState({deletedial: true, Idtempo: e})
  };

  modalAddCreditCard = (classes) =>{
    return(
      <Dialog
        open={this.state.addCreditCard}
        onClose={() => this.handleCloseCreditCard()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseCreditCard}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems : 'center'}}>
            <Grid>
              <h4>Enregistrer une carte</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajouter une carte en toute sécurité</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                customInput={TextField}
                variant={'outlined'}
                label="Numéro de carte"
                name={'card_number'}
                onChange={this.onChange}
                value={this.state.card_number}
                format="#### #### #### ####"
                placeholder="Votre carte de crédit"
                style={{width:'100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                customInput={TextField}
                variant={'outlined'}
                label="Date d'expiration"
                name={'expiration_date'}
                onChange={this.onChange}
                value={this.state.expiration_date}
                format="##/##"
                placeholder="MM/YY"
                style={{width:'100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <TextField
                label="CVV"
                variant="outlined"
                value={this.state.csv}
                onChange={this.onChange}
                name={'csv'}
                type="number"
                pattern="\d{3,4}"
                style={{width:'100%'}}
              />
            </Grid>
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={(e) => {
                this.addCard(e);
                this.refreshCards(e);
                }}
              variant="contained"
              classes={{root: classes.buttonSave}}
            >
              Enregistrer la carte
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
                <Typography style={{color:'rgba(39,37,37,35%)'}}>Toutes les données de paeiment sur My Alfred sont cryptées.</Typography>
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

  modalDeleteCreditCard = () => {
    return(
      <Dialog
        open={this.state.deletedial}
        onClose={() => this.handleCloseDial()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title">{'Voulez-vous vraiment supprimer votre carte bancaire ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si vous supprimez votre carte bancaire vous ne pourrez plus l'utiliser par la suite avec ce compte.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseDial()} color="primary">
            Annuler
          </Button>
          <Button onClick={(e) => {
            this.deleteCard(this.state.Idtempo);
            this.refreshCards(e);
            this.handleCloseDial(e);
          }} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  content = (classes) => {
    return(
      <Grid style={{display: 'flex', flexDirection: 'column'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Mode de paiement</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>N'hésitez pas à enregistrer un mode de paiement pour aller plus vite lors de vos réservations.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3>Cartes enregistrées</h3>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Payez encore plus rapidement sans communiquer vos informations financières.</Typography>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <PaymentCard cards={this.state.cards} userName={this.state.userName} editable={true} deleteCard={this.callDialogDeletedCard}/>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid style={{display :'flex', alignItems: 'center'}}>
            <Grid>
              <IconButton aria-label="add" onClick={this.callAddCreditCard}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography>Enregistrer une carte bancaire</Typography>
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
              <Typography style={{color:'rgba(39,37,37,35%)'}}>Toutes les données de paeiment sur My Alfred sont cryptées.</Typography>
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
    const {cards, deletedial, userName, addCreditCard} = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>compte - Mode de paiement - My Alfred </title>
          <meta property="description"
                content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !"/>
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
        {addCreditCard ? this.modalAddCreditCard(classes) : null}
        {deletedial ? this.modalDeleteCreditCard(classes) : null}
      </React.Fragment>
    );
  };
}


export default withStyles(styles)(paymentMethod);
