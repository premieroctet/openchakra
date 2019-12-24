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
        flexDirection: 'column',

    },
    card: {
        fontFamily: 'helveticaNeue',
        maxWidth: 800,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    newContainer: {
        padding: 20,
    },
    title: {
        fontFamily: 'helveticaNeue',
        color: 'white',
        letterSpacing: 1,
    },
});

class checkEmail extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Grid item xs={10}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Inscription terminée</h2>

                        </div>
                        <div className={classes.newContainer}>
                            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                <img src='../static/success-signup.svg' style={{width: 100}} alt={'success'}/>
                            </Grid>
                            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>

                            </Grid>
                            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                <p>Vous pouvez maintenant proposer ou rechercher vos services sur My Alfred</p>
                            </Grid>
                            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                <Link href={'/'}>
                                    <a style={{textDecoration:'none'}}>
                                        <Button variant={"contained"} color={"primary"} style={{color:"white"}}>Commencez à explorer</Button>
                                    </a>
                                </Link>
                            </Grid>
                        </div>

                    </Card>
                    </Grid>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(checkEmail);
