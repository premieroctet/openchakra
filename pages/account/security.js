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
import styles from './security/securityStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {checkPass1, checkPass2} from '../../utils/passwords';

moment.locale('fr');


class security extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            user: {},
            password: '',
            newPassword: '',
            newPassword2: '',
            check : false,
            check1 : false,
            check2 : false,
            wrongPassword : false,
            last_login: [],
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
    };

    onChangePassword = e => {
        this.setState({ [e.target.name]: e.target.value, wrongPassword: false });
        if(e.target.value !== '') {
            this.setState({check : true});

        } else {
            this.setState({check: false})
        }
    };


    onClick1 = () => {
        this.setState({
            check1: checkPass1(this.state.newPassword).check,
            check2: checkPass2(this.state.newPassword,this.state.newPassword2).check
        });
    };


    onSubmit = e => {
        e.preventDefault();
        const data = {password: this.state.password, newPassword: this.state.newPassword};
        axios
            .put('/myAlfred/api/users/profile/editPassword', data)
            .then(() => {
                toast.info('Mot de passe modifié');
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch(err => {
                console.error(err)
                if (err.response.data.wrongPassword){
                    this.setState({wrongPassword: true})
                }
            });
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;
        const checkButtonValidate = this.state.check && this.state.check1 && this.state.check2;
        const {last_login} = this.state;

        return (
            <Fragment>
            <Helmet>
                <title>Compte - Sécurité - My Alfred </title>
                <meta property="description" content="Modifiez votre mot de passe et gérer la sécurité de votre compte My Alfred. Des milliers de particuliers et auto-entrepreneurs proches de chez vous prêts à vous rendre service ! Paiement sécurisé. Inscription 100% gratuite !" />
              </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={4} itemsDrawers={'account'}/>
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
                                                onChange={this.onChangePassword}
                                                variant={"outlined"}
                                                error={this.state.wrongPassword}
                                                helperText={this.state.wrongPassword?"Mot de passe erroné":""}
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
                                                onChange={this.onChange}
                                                variant={"outlined"}
                                                onKeyUp={this.onClick1}
                                                error={checkPass1(this.state.newPassword).error}
                                                helperText={checkPass1(this.state.newPassword).error}
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
                                                onChange={this.onChange}
                                                variant={"outlined"}
                                                onKeyUp={this.onClick1}
                                                error={checkPass2(this.state.newPassword,this.state.newPassword2).error}
                                                helperText={checkPass2(this.state.newPassword,this.state.newPassword2).error}
                                            />
                                        </Grid>
                                        <Grid item style={{ display: 'flex', justifyContent: 'left', marginTop: 30 }}>
                                            {checkButtonValidate  ?
                                                <Button type="submit" style={{color:"white"}} variant="contained" color="primary">
                                                    Valider
                                                </Button>
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
