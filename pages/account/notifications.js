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
                this.setState({messages_email: user.notifications_message.email,
                                    messages_push: user.notifications_message.push,
                                    messages_sms: user.notifications_message.sms});
                this.setState({rappel_email: user.notifications_rappel.email,
                                     rappel_push: user.notifications_rappel.push,
                                     rappel_sms: user.notifications_rappel.sms});

                this.setState({promotions_email: user.notifications_promotions.email,
                    promotions_push: user.notifications_promotions.push,
                    promotions_sms: user.notifications_promotions.sms,
                    promotions_phone: user.notifications_promotions.phone});

                this.setState({community_email: user.notifications_community.email,
                    community_push: user.notifications_community.push,
                    community_sms: user.notifications_community.sms});

                this.setState({assistance_email: user.notifications_assistance.email,
                    assistance_push: user.notifications_assistance.push,
                    assistance_sms: user.notifications_assistance.sms});



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

    onSubmit = () => {
        const data = {
          messages_email: this.state.messages_email,
          messages_push: this.state.messages_push,
          messages_sms: this.state.messages_sms,
          rappel_sms: this.state.rappel_sms,
          rappel_email: this.state.rappel_email,
          rappel_push: this.state.rappel_push,
          promotions_email: this.state.promotions_email,
          promotions_push: this.state.promotions_push,
          promotions_sms: this.state.promotions_sms,
          promotions_phone: this.state.promotions_phone,
          community_email: this.state.community_email,
          community_push: this.state.community_push,
          community_sms: this.state.community_sms,
          assistance_push: this.state.assistance_push,
          assistance_sms: this.state.assistance_sms,
        };

        axios.put(url+'myAlfred/api/users/account/notifications',data)
            .then(() => {
                alert('Compte mis à jour');
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        const {classes} = this.props;
        const {user} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>
                         
                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call-2.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call-2.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 4}}/>
                                            <a s style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}}className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}}className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                                
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/applications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Applications connectées
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/applications'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Parrainage
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <Grid container>
                                <Grid container>
                                    <h1 style={{color: 'dimgray',fontWeight: '100'}}>Notifications</h1>
                                </Grid>
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
                    <div style={{backgroundColor: 'lightgray',display:'flex',justifyContent:'flex-end',width:'100%',bottom:0,
                        alignItems:"center",height:60}}>
                        <Button size={'medium'} type={'button'} onClick={this.onSubmit} variant="contained" color="secondary"
                                style={{color: 'white',maxHeight:40,marginRight:20}}>
                            Enregistrer
                        </Button>
                    </div>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(notifications);
