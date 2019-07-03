import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';

moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '170vh',
        justifyContent: 'top',
        flexDirection: 'column',


    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
        marginTop: '100px',
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
        lineHeight: 4.15,
    },


});
class editProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            address: false,
            picture: false,
            otherAddress: false


        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});

                if(typeof user.billing_address != 'undefined') {
                    this.setState({address: true})
                } else {
                    this.setState({address:false})
                }

                if(typeof user.picture !="undefined") {
                    this.setState({picture: true})
                } else {
                    this.setState({picture: false})
                }
                if(typeof user.service_address === "undefined") {
                    this.setState({otherAddress:false})
                } else {
                    this.setState({otherAddress: true})
                }



            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => {
        const state = this.state.user;
        state[e.target.name] = e.target.value;
        this.setState({user:state});
    };

    onSubmit = e => {
        e.preventDefault();
        const {email, phone, job} = this.state.user;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(url+'myAlfred/api/users/profile/editProfile',{email,phone,job})
            .then(res => {
                alert("Profil modifié avec succès");
                Router.push({pathname: '/profile'})
            })
            .catch(err => console.log(err))
    };


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {address} = this.state;
        const {otherAddress} = this.state;
        const {picture} = this.state;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Editer le profil</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>

                                <Grid item>
                                    <TextField
                                        id="filled-name"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={this.onChange}
                                        helperText={"Votre email"}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={this.onChange}
                                        helperText={"Votre numéro de téléphone"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="job"
                                        value={user.job}
                                        onChange={this.onChange}
                                        helperText={"Votre métier"}
                                    />
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                            {address ?
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Link href={"/editAddress"}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                            Modifier mon adresse
                                        </Button>
                                    </Link>
                                </Grid> : ''
                            }
                            {picture ?
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Link href={"/editPicture"}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                            Modifier ma photo de profil
                                        </Button>
                                    </Link>
                                </Grid> : ''
                            }
                            {otherAddress ?
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Link href={"/editOtherAddress"}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                            Modifier mon adresse secondaire
                                        </Button>
                                    </Link>
                                </Grid> : ''
                            }
                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Link href={"/editPassword"}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier mon mot de passe
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(editProfile);
