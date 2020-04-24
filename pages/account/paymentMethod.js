import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Footer from '../../hoc/Layout/Footer/Footer';
import NumberFormat from 'react-number-format';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Cards from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from '../../components/utils';
import '../../static/creditcards.css';
import {Helmet} from 'react-helmet';

moment.locale('fr');

const styles = theme => ({
     bigContainer: {
        marginTop: 70,
        flexGrow: 1,

    },
    buttondelt:{
        color: 'white',
        position : 'absolute',
        borderRadius: '50%',
        height: '20px',
        width: '20px',
        border: 'none',
        backgroundColor: '#F8727F' ,
        '&:hover':{
            backgroundColor: 'rgb(173, 79, 88)'
        },
        top: '-5px',
        right: '-5px',
        cursor: 'pointer'
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }

   ,hidelg: {
        [theme.breakpoints.up('md')]: {
            display:'none',
        }

    },
    trigger:{
    [theme.breakpoints.down('sm')]: {
    marginTop: -10,
    width: '100%',
    marginLeft:'0px',
    height:'30px',
    backgroundColor:'#2FBCD3',

    display:'block',
    transition: 'display 0.7s',
    borderRadius:'5px',
    '&:focus': {
    display:'none',
    transition: 'display 0.7s',

       }
     }

}

    ,toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
        transition: 'margin-left 0.7s',

        '&:hover': {
            marginLeft:'0px',
            transition: 'margin-left 0.7s',
            boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

             }
      }
    }

});

class paymentMethod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cards: [],
            card_number: '',
            expiration_date: '',
            issuer: '',
            focused: '',
            formData: null,
            name: '',
            csv: '',
            goodside: false,
            deletedial: false,
            Idtempo: ''
        }

    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data});
                this.setState({userName:  this.state.user.name + ' ' + this.state.user.firstname });
                this.setState({name: this.state.userName});
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get('/myAlfred/api/payment/cards')
            .then(response => {
                let cards = response.data;
                this.setState({cards:cards});
            })
    }

    refreshCards = () =>{
        axios.get('/myAlfred/api/payment/cards')
            .then(response => {
                let cards = response.data;
                this.setState({cards:cards});
            })
    }

    handleCloseDial = () => {
        this.setState({deletedial:false});
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };

      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
          goodside: true,
        });
        setTimeout(()=>{
            if (this.state.goodside === true){
                document.querySelector('.rccs__card').classList.add('rccs__card--flipped');
            } else {
                document.querySelector('.rccs__card').classList.remove('rccs__card--flipped');
            }
          }, 400)
      };

      handleBadSide = () =>{
        this.setState({
            goodside: false,
          });
          setTimeout(()=>{
            if (this.state.goodside === true){
                document.querySelector('.rccs__card').classList.add('rccs__card--flipped');
            } else {
                document.querySelector('.rccs__card').classList.remove('rccs__card--flipped');
            }
          }, 400)
      }

      handleInputChange = ({ target }) => {
        if (target.name === 'card_number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiration_date') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'csv') {
          target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
      };

    addCard() {
        const card_number = this.state.card_number.replace(/\s/g,'');
        const expiration_date = this.state.expiration_date.split("/");
        const finaldate = expiration_date[0]+expiration_date[1];
        const csv = this.state.csv;

        const obj = {
            card_number: card_number,
            expiration_date: finaldate,
            csv: csv
        };

        axios.post('/myAlfred/api/payment/createCard',obj)
            .then(() => {
                axios.get('/myAlfred/api/payment/cards')
                    .then(response => {
                        let cards = response.data;
                        this.setState({cards:cards});
                    })
            })
    }

    deleteCard(id) {
        const obj = {id_card:id};
        axios.put('/myAlfred/api/payment/cards',obj)
            .then(() => {
                axios.get('/myAlfred/api/payment/cards')
                    .then(response => {
                        let cards = response.data;
                        this.setState({cards:cards});
                    })
            })
    }



    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {cards} = this.state;
        const {deletedial} = this.state;


        return (
            <Fragment>
		<Helmet>
        <title>compte - Mode de paiement - My Alfred </title>
        <meta property="description" content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !" />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>

                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card-2.svg'} alt={'credit-card'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card-2.svg'} alt={'credit-card'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>



                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55, minHeight: '530px'}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Mode de paiement</h1>
                            </Grid>
                            <Grid container>
                                {cards.length ?

                                    cards.map((e,index) => (
                                        <React.Fragment key={index}>
                                            {e.Active.toString() == "true" ?
                                            <Grid item  style={{position: 'relative', margin: '20px'}}>
                                                <Cards
                                                    expiry={e.ExpirationDate}
                                                    focused={this.state.focus}
                                                    name={this.state.name}
                                                    number={e.Alias.replace(/X/g,'*')}
                                                    callback={this.handleCallback}
                                                    preview
                                                    cvc={'XXX'}
                                                    />
                                                <button className={classes.buttondelt} onClick={()=>this.setState({deletedial: true, Idtempo: e.Id})} type="submit" variant="contained" style={{lineHeight: 1}} color="secondary">
                                                    x
                                                </button>
                                            </Grid>: null}
                                        </React.Fragment>
                                    )) :

                                    <p>Aucun mode de paiement enregistré</p>

                                }
                            </Grid>

                            <Grid container style={{position: 'relative', margin: '70px 0px', maxWidth: '100%' , width: '400px', boxShadow: '0px 0px 6px lightgray', borderRadius: '10px', }}>

                                <Grid item style={{margin:'auto', marginTop: '-25px'}}>
                                    <div style={{margin: 'auto',}} id="PaymentForm">
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
                                <Grid item xs={12} style={{ margin: '15px'}}>
                                    <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={"outlined"} label="Numéro de carte" name={'card_number'} onChange={this.onChange} value={this.state.card_number}  style={{margin: 'auto', width:'94%'}} format="#### #### #### ####" placeholder="Votre carte de crédit"/>
                                </Grid>
                                <Grid container>
                                <Grid item xs={7} style={{ margin: '15px'}}>
                                    <NumberFormat onClick={this.handleBadSide} customInput={TextField} variant={"outlined"} label="Date d'expiration" name={'expiration_date'} onChange={this.onChange} value={this.state.expiration_date}  style={{margin: 'auto', width:'90%'}} format="##/##" placeholder="MM/YY" />
                                </Grid>
                                <Grid item xs={3} style={{ margin: '15px'}}>
                                    <TextField
                                            label="CVV"
                                            style={{ width:'85%'}}
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
                                    <Button onClick={(e)=>{this.addCard(e); this.refreshCards(e)}} type="submit" variant="contained" style={{color: 'white',margin: 'auto', width:'40%'}} color="primary">
                                        Ajouter
                                    </Button>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                    {deletedial ?
                        <Dialog
                            open={this.state.deletedial}
                            onClose={()=>this.handleCloseDial()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Voulez-vous vraiment supprimer votre carte bancaire ?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Si vous supprimez votre carte bancaire vous ne pourrez plus l'utiliser par la suite avec ce compte.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>this.handleCloseDial()} color="primary">
                                    Annuler
                                </Button>
                                <Button onClick={(e)=>{this.deleteCard(this.state.Idtempo); this.refreshCards(e); this.handleCloseDial(e)}} color="secondary" autoFocus>
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
