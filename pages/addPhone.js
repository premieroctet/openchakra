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
        backgroundColor: '#2FBCD3',
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

class addPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newPhone = {
            phone: this.state.phone,

        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put(url+'myAlfred/api/users/profile/phone', newPhone)
            .then(res => {
                alert('Téléphone ajouté');
                if(localStorage.getItem('path') === '/signup') {
                    Router.push({pathname: '/checkEmail'})
                } else {
                    Router.push({pathname:'/profile'})
                }
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
                            <h2 className={classes.title}>Confirmez votre numéro de téléphone</h2>

                        </div>
                            <div className={classes.newContainer}>
                                <Typography style={{fontFamily: 'helveticaNeue'}}>De cette façon, vos Alfred ou vos clients pourront vous contacter si besoin.</Typography>
                                <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                    <img src='../static/smartphone.svg' style={{width: 100}}/>
                                </Grid>
                                <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                    <form onSubmit={this.onSubmit}>
                                        <Grid item>
                                            <TextField
                                                id="standard-with-placeholder"
                                                label="Numéro de téléphone"
                                                placeholder="Numéro de téléphone"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="phone"
                                                variant="outlined"
                                                value={this.state.address}
                                                onChange={this.onChange}
                                            />
                                        </Grid>
                                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                            <Button type="submit" variant="contained" color="primary" style={{ width: '100%', color: 'white' }}>
                                                Je confirme mon numéro
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

export default withStyles(styles)(addPhone);
