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

  addCard() {
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
      });
  }

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
    const {classes} = this.props;
    const {cards, deletedial} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>compte - Mode de paiement - My Alfred </title>
          <meta property="description"
                content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !"/>
        </Helmet>
        <Layout>
          <Grid container className={classes.bigContainer}>
            <Grid style={{zIndex: 0}}>
              <ResponsiveDrawer ref={this.child} isActiveIndex={1} itemsDrawers={'account'}/>
            </Grid>
            <Grid>
              <Grid>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={this.callDrawer}
                  className={classes.menuButton}
                >
                  <MenuIcon/>
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={9} className={classes.containerLeft}>
              <Grid container>
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
                                  onClick={() => this.setState({deletedial: true, Idtempo: e.Id})} type="submit"
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
              <Grid container style={{
                position: 'relative',
                margin: '70px 0px',
                maxWidth: '100%',
                width: '400px',
                boxShadow: '0px 0px 6px lightgray',
                borderRadius: '10px',
              }}>
                <Grid item style={{margin: 'auto', marginTop: '-25px'}}>
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
                <Grid item xs={12} style={{margin: '15px'}}>
                  <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={'outlined'}
                                label="Numéro de carte" name={'card_number'} onChange={this.onChange}
                                value={this.state.card_number} style={{margin: 'auto', width: '94%'}}
                                format="#### #### #### ####" placeholder="Votre carte de crédit"/>
                </Grid>
                <Grid container>
                  <Grid item xs={7} style={{margin: '15px'}}>
                    <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={'outlined'}
                                  label="Date d'expiration" name={'expiration_date'} onChange={this.onChange}
                                  value={this.state.expiration_date} style={{margin: 'auto', width: '90%'}}
                                  format="##/##" placeholder="MM/YY"/>
                  </Grid>
                  <Grid item xs={3} style={{margin: '15px'}}>
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
                <Grid item xs={12} style={{textAlign: 'center', margin: '15px'}}>
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
        </Layout>
        {/* <Footer/>*/}
      </Fragment>
    );
  };
}


export default withStyles(styles)(paymentMethod);
