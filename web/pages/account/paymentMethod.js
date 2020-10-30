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
import DialogTitle from '@material-ui/core/DialogTitle';
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
import styles from './paymentMethod/paymentMethodStyle';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";


moment.locale('fr');


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
        this.setState({user: res.data});
        this.setState({userName: this.state.user.name + ' ' + this.state.user.firstname});
        this.setState({name: this.state.userName});
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

  handleInputFocus = ({target}) => {
    this.setState({
      focused: target.name,
      goodside: true,
    });
    setTimeout(() => {
      if (this.state.goodside === true) {
        document.querySelector('.rccs__card').classList.add('rccs__card--flipped');
      } else {
        document.querySelector('.rccs__card').classList.remove('rccs__card--flipped');
      }
    }, 400);
  };

  handleBadSide = () => {
    this.setState({
      goodside: false,
    });
    setTimeout(() => {
      if (this.state.goodside === true) {
        document.querySelector('.rccs__card').classList.add('rccs__card--flipped');
      } else {
        document.querySelector('.rccs__card').classList.remove('rccs__card--flipped');
      }
    }, 400);
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
    console.log('bonjour')
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

  deleteCard(id) {
    const obj = {id_card: id};
    axios.put('/myAlfred/api/payment/cards', obj)
      .then(() => {
        axios.get('/myAlfred/api/payment/cards')
          .then(response => {
            let cards = response.data;
            this.setState({cards: cards});
          });
      });
  }

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  render() {
    const {classes, index} = this.props;
    const {cards, deletedial} = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>compte - Mode de paiement - My Alfred </title>
          <meta property="description"
                content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !"/>
        </Helmet>
        <LayoutAccount index={index}>
          <Grid>
            <Grid>
              <Grid>
                <h1 style={{color: 'dimgray', fontWeight: '100'}}>Mode de paiement</h1>
              </Grid>
              <Grid container>
                {cards.length ?
                  cards.map((e, index) => (
                    <React.Fragment key={index}>
                      {e.Active.toString() === 'true' ?
                        <Grid item style={{position: 'relative', margin: '20px'}}>
                          <Cards
                            expiry={e.ExpirationDate}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={e.Alias.replace(/X/g, '*')}
                            callback={this.handleCallback}
                            preview
                            cvc={'XXX'}
                          />
                          <button className={classes.buttondelt}
                                  onClick={() => this.setState({deletedial: true, Idtempo: e.Id})}
                                  variant="contained" style={{lineHeight: 1}} color="secondary">
                            x
                          </button>
                        </Grid>
                        : null}
                    </React.Fragment>
                  )) :
                  <p>Aucun mode de paiement enregistré</p>
                }
              </Grid>
              <Grid style={{
                position: 'relative',
                margin: '70px 0px',
                maxWidth: '100%',
                width: '400px',
                boxShadow: '0px 0px 6px lightgray',
                borderRadius: '10px',
              }}>
                <Grid style={{margin: 'auto', marginTop: '-25px'}}>
                  <div style={{margin: 'auto'}} id="PaymentForm">
                    <Cards
                      style={{}}
                      cvc={this.state.csv}
                      expiry={this.state.expiration_date}
                      focused={this.state.focus}
                      name={this.state.name}
                      number={this.state.card_number}
                      callback={this.handleCallback}

                    />
                  </div>
                </Grid>
                <Grid style={{margin: '15px'}}>
                  <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={'outlined'}
                                label="Numéro de carte" name={'card_number'} onChange={this.onChange}
                                value={this.state.card_number} style={{margin: 'auto', width: '94%'}}
                                format="#### #### #### ####" placeholder="Votre carte de crédit"/>
                </Grid>
                <Grid container>
                  <Grid style={{margin: '15px'}}>
                    <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={'outlined'}
                                  label="Date d'expiration" name={'expiration_date'} onChange={this.onChange}
                                  value={this.state.expiration_date} style={{margin: 'auto', width: '90%'}}
                                  format="##/##" placeholder="MM/YY"/>
                  </Grid>
                  <Grid style={{margin: '15px'}}>
                    <TextField
                      label="CVV"
                      style={{width: '85%'}}
                      variant="outlined"
                      value={this.state.csv}
                      onChange={this.onChange}
                      name={'csv'}
                      onClick={this.handleInputFocus}
                      type="number"
                      pattern="\d{3,4}"
                    />
                  </Grid>
                </Grid>
                <Grid style={{textAlign: 'center', margin: '15px'}}>
                  <Button onClick={(e) => {
                    this.addCard(e);
                    this.refreshCards(e);
                  }} type="submit" variant="contained" style={{color: 'white', margin: 'auto', width: '40%'}}
                          color="primary">
                    Ajouter
                  </Button>
                </Grid>


              </Grid>
            </Grid>
          </Grid>
          {deletedial ?
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
            : null}
        </LayoutAccount>
      </React.Fragment>
    );
  };
}


export default withStyles(styles)(paymentMethod);
