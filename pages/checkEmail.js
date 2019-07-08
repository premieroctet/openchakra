import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";

const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        fontFamily: 'helveticaNeue',
        width: 800,
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
    banner: {
        marginBottom: 25,
        backgroundColor: '#00abed',
        height: 80,

    },
    newContainer: {
        padding: 20,
    },
    title: {
        fontFamily: 'helveticaNeue',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 22,
        letterSpacing: 1,
    },
});

class checkEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const email = this.state.email;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put(url+'myAlfred/api/users/email/check', email)
            .then(res => {
                alert('Email envoyé');

            })
            .catch(err =>
                console.log(err)
            );


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Consultez vos e-mails</h2>

                        </div>
                        <div className={classes.newContainer}>
                            <Typography style={{fontFamily: 'helveticaNeue'}}>Cliquez sur le lien dans l’e-mail que nous venons de vous envoyer.</Typography>
                            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                <img src='../static/mail.svg' style={{width: 100}}/>
                            </Grid>
                            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                <form onSubmit={this.onSubmit}>
                                    <Grid item>
                                        <TextField
                                            id="standard-with-placeholder"
                                            label="Votre email"
                                            placeholder="Votre email"
                                            margin="normal"
                                            style={{ width: '100%' }}
                                            type="email"
                                            name="email"
                                            variant="outlined"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                        <Typography>Vous n'avez pas reçu l'email ?</Typography>
                                    </Grid>
                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                            Me renvoyer l'e-mail
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                <Link href={'/'}><a style={{textDecoration: 'none', color: 'black'}}>Je le ferai plus tard</a></Link>
                            </Grid>
                        </div>

                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(checkEmail);
