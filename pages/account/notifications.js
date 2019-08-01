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
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";






moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    sidebar: {
        border: '0.2px solid lightgrey',
        lineHeight:'4',
        paddingLeft:5,
        paddingRight:5,
        display:'flex'
    },
    item: {
        paddingLeft: 30
    }


});

class notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            messages_email: false,
            messages_push: false,
            messages_sms: false,
            rappel_email: false,
            rappel_push: false,
            rappel_sms: false,
            promotions_email: false,
            promotions_push: false,
            promotions_sms: false,
            promotions_phone: false,
            community_email: false,
            community_push: false,
            community_sms: false,
            assistance_email: true,
            assistance_push: false,
            assistance_sms: false,
        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});



            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked });
    };


    render() {
        const {classes} = this.props;
        const {user} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid item xs={3} style={{borderRight: '1px solid darkgray'}}>

                            <Grid container style={{justifyContent: 'center'}}>

                                <Grid item style={{marginTop: 30,width: 270.25}}>
                                    <Link href={'/account/notifications'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/smartphone-call-2.svg'} alt={'user'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/credit-card.svg'} alt={'sign'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/piggy-bank.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/transactions'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/security'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/locked-padlock.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/applications'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/network.svg'} alt={'speaker'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Applications connectées
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/parameters'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'speaker'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/account/sponsors'}>
                                        <div className={classes.sidebar}>
                                            <img src={'../static/trophy.svg'} alt={'speaker'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Parrainage
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <Grid container>
                                <Grid item xs={12}>
                                <h2 style={{fontWeight: '100',marginBotto:0}}>Messages</h2>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{marginTop:0}}>Recevez des messages de la part des Alfred et des utilisateurs y compris les demandes de réservations.

                                    </p>
                                </Grid>
                                <Grid container className={classes.item}>
                                <Grid item xs={2}>
                                    <p>Email</p>
                                </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.messages_email}
                                            onChange={this.handleChange('messages_email')}
                                            value={this.state.messages_email}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Notification push</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.messages_push}
                                            onChange={this.handleChange('messages_push')}
                                            value={this.state.messages_push}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>SMS</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.messages_sms}
                                            onChange={this.handleChange('messages_sms')}
                                            value={this.state.messages_sms}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <hr/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <h2 style={{fontWeight: '100',marginBotto:0}}>Rappel</h2>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{marginTop:0}}>
                                        Recevez des rappels de réservation, des demandes d’évaluation, des informations sur les tarifs et d’autres rappels relatifs à vos activités sur my-Alfred.


                                    </p>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Email</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.rappel_email}
                                            onChange={this.handleChange('rappel_email')}
                                            value={this.state.rappel_email}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Notification push</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.rappel_push}
                                            onChange={this.handleChange('rappel_push')}
                                            value={this.state.rappel_push}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>SMS</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.rappel_sms}
                                            onChange={this.handleChange('rappel_sms')}
                                            value={this.state.rappel_sms}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <hr/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <h2 style={{fontWeight: '100',marginBotto:0}}>Promotions & Astuces</h2>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{marginTop:0}}>
                                        Recevez des coupons, des informations promotionnelles, des enquêtes, et des informations de la part de My-Alfred
                                        et de ses partenaires.


                                    </p>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Email</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.promotions_email}
                                            onChange={this.handleChange('promotions_email')}
                                            value={this.state.promotions_email}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Notification push</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.promotions_push}
                                            onChange={this.handleChange('promotions_push')}
                                            value={this.state.promotions_push}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>SMS</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.promotions_sms}
                                            onChange={this.handleChange('promotions_sms')}
                                            value={this.state.promotions_sms}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Appel téléphonique</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.promotions_phone}
                                            onChange={this.handleChange('promotions_phone')}
                                            value={this.state.promotions_phone}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <hr/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <h2 style={{fontWeight: '100',marginBotto:0}}>Politique & communauté </h2>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{marginTop:0}}>
                                        Recevez des nouvelles sur les réglementations liées aux prestations de services


                                    </p>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Email</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.community_email}
                                            onChange={this.handleChange('community_email')}
                                            value={this.state.community_email}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Notification push</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.community_push}
                                            onChange={this.handleChange('community_push')}
                                            value={this.state.community_push}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>SMS</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.community_sms}
                                            onChange={this.handleChange('community_sms')}
                                            value={this.state.community_sms}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <hr/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <h2 style={{fontWeight: '100',marginBotto:0}}>Assistance du compte </h2>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{marginTop:0}}>

                                            Nous devrons peut-être vous envoyer des messages concernant votre compte. Vos réservations de services,
                                        des informations légales,
                                        des questions de sécurité et de confidentialité, et pour répondre à vos demandes adressées à notre assistance
                                        utilisateur.
                                        Pour votre sécurité, vous ne pouvez pas désactiver les notifications par email et nous pourrions vous
                                        contacter par téléphone ou d’autres moyens si besoin.



                                    </p>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Email</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.assistance_email}
                                            onChange={this.handleChange('assistance_email')}
                                            value={this.state.assistance_email}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>Notification push</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.assistance_push}
                                            onChange={this.handleChange('assistance_push')}
                                            value={this.state.assistance_push}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.item}>
                                    <Grid item xs={2}>
                                        <p>SMS</p>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Switch
                                            checked={this.state.assistance_sms}
                                            onChange={this.handleChange('assistance_sms')}
                                            value={this.state.assistance_sms}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <hr/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(notifications);
