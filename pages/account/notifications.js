import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './notifications/notificationsStyle'

moment.locale('fr');

class notifications extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
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
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
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

        axios.put('/myAlfred/api/users/account/notifications',data)
            .then(() => {
                toast.info('Compte mis à jour');
            })
            .catch();
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <Helmet>
                    <title>compte - Notifications - My Alfred </title>
                    <meta property="description" content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. " />
                  </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={0}/>
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
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    <Grid item xs={9} className={classes.containerLeft}>
                        <Grid container>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Notifications</h1>
                            </Grid>
                            <Grid item xs={12}>
                            <h2 style={{fontWeight: '100',marginBotto:0}}>Messages</h2>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <p style={{marginTop:0}}>Recevez des messages de la part des Alfred et des utilisateurs y compris les demandes de réservations.

                                </p>
                            </Grid>
                            <Grid container className={classes.item}>
                            <Grid item xs={6} md={3}>
                                <p>Email</p>
                            </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.messages_email}
                                        onChange={this.handleChange('messages_email')}
                                        value={'messages_email'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Notification push</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.messages_push}
                                        onChange={this.handleChange('messages_push')}
                                        value={'messages_push'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>SMS</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.messages_sms}
                                        onChange={this.handleChange('messages_sms')}
                                        value={'messages_sms'}
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
                            <Grid item xs={12} md={6}>
                                <p style={{marginTop:0}}>
                                    Recevez des rappels de réservation, des demandes d’évaluation, des informations sur les tarifs et d’autres rappels relatifs à vos activités sur My-Alfred.
                                </p>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Email</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.rappel_email}
                                        onChange={this.handleChange('rappel_email')}
                                        value={'rappel_email'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Notification push</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.rappel_push}
                                        onChange={this.handleChange('rappel_push')}
                                        value={'rappel_push'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>SMS</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.rappel_sms}
                                        onChange={this.handleChange('rappel_sms')}
                                        value={'rappel_sms'}
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
                            <Grid item xs={12} md={6}>
                                <p style={{marginTop:0}}>
                                    Recevez des coupons, des informations promotionnelles, des enquêtes, et des informations de la part de My-Alfred
                                    et de ses partenaires.
                                </p>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Email</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.promotions_email}
                                        onChange={this.handleChange('promotions_email')}
                                        value={'promotions_email'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Notification push</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.promotions_push}
                                        onChange={this.handleChange('promotions_push')}
                                        value={'promotions_push'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>SMS</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.promotions_sms}
                                        onChange={this.handleChange('promotions_sms')}
                                        value={'promotions_sms'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Appel téléphonique</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.promotions_phone}
                                        onChange={this.handleChange('promotions_phone')}
                                        value={'promotions_phone'}
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
                            <Grid item xs={12} md={6}>
                                <p style={{marginTop:0}}>
                                    Recevez des nouvelles sur les réglementations liées aux prestations de services
                                </p>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Email</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.community_email}
                                        onChange={this.handleChange('community_email')}
                                        value={'community_email'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Notification push</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.community_push}
                                        onChange={this.handleChange('community_push')}
                                        value={'community_push'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>SMS</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.community_sms}
                                        onChange={this.handleChange('community_sms')}
                                        value={'community_sms'}
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
                            <Grid item xs={12} md={6}>
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
                                <Grid item xs={6} md={3}>
                                    <p>Email</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.assistance_email}
                                        onChange={this.handleChange('assistance_email')}
                                        value={'assistance_email'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>Notification push</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.assistance_push}
                                        onChange={this.handleChange('assistance_push')}
                                        value={'assistance_push'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.item}>
                                <Grid item xs={6} md={3}>
                                    <p>SMS</p>
                                </Grid>
                                <Grid item xs={6} md={9}>
                                    <Switch
                                        checked={this.state.assistance_sms}
                                        onChange={this.handleChange('assistance_sms')}
                                        value={'assistance_sms'}
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
                    <Grid container style={{marginBottom:20}}>
                        <Grid item xs={8}>
                            <div style={{
                                display:'flex',
                                justifyContent:'flex-end',
                                marginBottom: '-1.95%',
                                width:'100%',
                                bottom:0,
                                alignItems:"center",
                                height:60
                            }}>
                                <Button
                                  size={'medium'}
                                  type={'button'}
                                  onClick={this.onSubmit}
                                  variant="contained"
                                  color="secondary"
                                  style={{color: 'white',maxHeight:40,marginRight:40}}>
                                    Enregistrer
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={4}/>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}

            </Fragment>
        );
    };
}

export default withStyles(styles)(notifications);
