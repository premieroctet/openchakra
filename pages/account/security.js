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
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';


moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
        width: "100%",
        minHeight: 520,

    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    },
   hidelg: {
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
   },
    toggle: {
        [theme.breakpoints.down('sm')]: {
            marginLeft:'-75px',
            transition: 'margin-left 0.7s',
            '&:hover': {
                marginLeft:'0px',
                transition: 'margin-left 0.7s',
                boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
            }
        }
    },
    formContainer: {
        paddingLeft: 55,
    },
    picsContainer: {
        display:"flex",
        justifyContent:"center",
        width:'50%',
        height:'auto',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        },
        [theme.breakpoints.down('md')]: {
            display:'none'
        }
    },
    formClasse:{
        width:'100%',
    }
});

class security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            password: '',
            newPassword: '',
            newPassword2: '',
            check : false,
            checkbuttonvalidate : false,
            testpremier : false,
            last_login: [],
        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user, last_login: user.last_login});
            })
            .catch(err => {
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'});
                }
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value !== '') {
            this.setState({testpremier : true});

        } else {
            this.setState({testpremier: false})
        }
    };

    onChangeNewPassword = e => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")){
            this.setState({newPassword: e.target.value});
        }
    };

   onChangeNewPassword2 = e => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})") && this.state.newPassword === this.state.newPassword2){
            this.setState({newPassword2: e.target.value});
            this.setState({check: false});
            this.setState({checkbuttonvalidate : true});
        } else {
            this.setState({check: true});
            this.setState({checkbuttonvalidate : false});
        }
    };

    onClick1 = () => {
        if(this.state.newPassword === this.state.newPassword2){
            this.setState({check: false});
            this.setState({checkbuttonvalidate : true});
        } else {
            this.setState({check: true});
            this.setState({checkbuttonvalidate : false});
        }
    };


    onSubmit = e => {
        e.preventDefault();
        const data = {password: this.state.password, newPassword: this.state.newPassword};
        axios
            .put(url+'myAlfred/api/users/profile/editPassword', data)
            .then(() => {
                toast.info('Mot de passe modifié');
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch();
    };

    render() {
        const {classes} = this.props;
        const testpremier = this.state.testpremier ?  <Button type="submit" style={{color:"white"}} variant="contained" color="primary"> Valider</Button> :  <Button disabled style={{color:"white"}} type="submit" variant="contained" color="primary">Valider</Button>;
        const {last_login} = this.state;

        return (
            <Fragment>
		<Helmet>
        <title>Compte - Sécurité - My Alfred </title>
        <meta property="description" content="Modifiez votre mot de passe et gérer la sécurité de votre compte My Alfred. Des milliers de particuliers et auto-entrepreneurs proches de chez vous prêts à vous rendre service ! Paiement sécurisé. Inscription 100% gratuite !" />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                    <Grid className={classes.toggle}  item xs={3}>
                         <div className={classes.trigger}/>
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
                                            <a  style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginleft: 4}}/>
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
                                            <img src={'../static/locked-padlock-2.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock-2.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 4}}/>
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
                        <Grid item xs={9} className={classes.formContainer}>
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Securité</h1>
                            <Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'left' }}>
                                    <h2 style={{ fontWeight: '100' }}>Modifier mon mot de passe</h2>
                                </Grid>
                                <Grid item xs={7}>
                                <p>
                                Pour la sécurité de votre compte, votre mot de passe doit contenir 8 caractères minimum dont une majuscule, une minuscule et un chiffre
                                </p>
                                </Grid>
                                <Grid style={{display:"flex"}}>
                                    <form onSubmit={this.onSubmit} className={classes.formClasse}>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                margin="normal"
                                                style={{width:'100%'}}
                                                label={"Mot de passe actuel"}
                                                placeholder={"Mot de passe actuel"}
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                                variant={"outlined"}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="standard-with-placeholder"
                                                margin="normal"
                                                style={{width:'100%'}}
                                                label={"Nouveau mot de passe"}
                                                placeholder={"Nouveau mot de passe"}
                                                type="password"
                                                name="newPassword"
                                                value={this.state.newPassword}
                                                onChange={this.onChangeNewPassword}
                                                variant={"outlined"}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="standard-with-placeholder"
                                                margin="normal"
                                                label={"Répéter le mot de passe"}
                                                placeholder={"Répéter le mot de passe"}
                                                type="password"
                                                name="newPassword2"
                                                style={{width:'100%'}}
                                                value={this.state.newPassword2}
                                                onChange={this.onChangeNewPassword2}
                                                variant={"outlined"}
                                                onKeyUp={this.onClick1}
                                            />
                                        </Grid>
                                        {this.state.check ? <p style={{color : 'red'}}>Mot de passe invalide</p> : null}
                                        <Grid item style={{ display: 'flex', justifyContent: 'left', marginTop: 30 }}>
                                            {this.state.checkbuttonvalidate  ?
                                                testpremier
                                                :
                                                <Button disabled type="submit" variant="contained" style={{color: 'white'}} color="primary">
                                                    Valider
                                                </Button>
                                            }
                                        </Grid>
                                    </form>
                                    <Grid className={classes.picsContainer} item>
                                        <img style={{ width:"40%", height: "100%"}} alt={"Photo"} src={'../../static/mot-de-passe-picto.svg'}/>
                                    </Grid>
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'left' }}>
                                    <h2 style={{ fontWeight: '100' }}>Dernières connexions : </h2>
                                </Grid>
                                <Grid container>
                                <Grid item xs={12} md={6} style={{display: 'flex', border:'1px darkgray solid', padding: 25,marginBottom:20}}>
                                    <Grid container>
                                        {last_login.map((e,index)=>(
                                            <Grid key={index} item xs={12}>
                                                <p>{moment(e).format('LLLL')}</p>
                                                <hr />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}

            </Fragment>
        );
    };
}

export default withStyles(styles)(security);
