import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import Link from "next/link";

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]:{
            marginBottom: 200
        }
    },
    card: {
        fontFamily: 'Helvetica',
        width: 600,
        marginTop: '100px',
        [theme.breakpoints.down('xs')]:{
            width:'90%'
        }
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
        fontFamily: 'Helvetica',
        color: 'white',
        letterSpacing: 1,
    },
    responsiveButton:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column',
            justifyContent: 'center',
        }
    },
    responsiveSecondaryButton:{
        [theme.breakpoints.down('xs')]:{
           marginTop: '2%'
        }
    },
    mainContainer:{
        [theme.breakpoints.down('xs')]:{
            display: 'flex',
            justifyContent: 'center'
        }
    }
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
                    <Grid item className={classes.mainContainer}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Inscription terminée</h2>
                        </div>
                        <div className={classes.newContainer}>
                            <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20, height: 100 /*safari*/}}>
                                <img src='../static/happy_castor.svg' style={{width: 100}} alt={'success'}/>
                            </Grid>
                            <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10, textAlign: 'justify'}}>
                                <p>Inscription réussie ! Vous pouvez maintenant proposer ou rechercher vos services sur My Alfred</p>
                            </Grid>
                            <Grid item className={classes.responsiveButton}>
                                <Grid item style={{marginRight:'1%' }}>
                                    <Link href={'/#register_done'}>
                                        <a style={{textDecoration:'none'}}>
                                            <Button variant={"contained"} color={"primary"} style={{color:"white"}}>Commencez à explorer</Button>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item className={classes.responsiveSecondaryButton}>
                                    <Link href={'/creaShop/creaShop'}>
                                        <a style={{textDecoration:'none'}}>
                                            <Button variant={"contained"} color={"secondary"} style={{color:"white"}}>Proposer mes services</Button>
                                        </a>
                                    </Link>
                                </Grid>
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
