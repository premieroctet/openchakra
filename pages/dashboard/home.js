import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";



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

class home extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Liste table base de données</Typography>
                            </Grid>
                            <Link href="/dashboard/category/all"><a>Catégorie</a></Link><br/>
                            <Link href="/dashboard/billing/all"><a>Méthode de facturation</a></Link><br/>
                            <Link href="/dashboard/calculating/all"><a>Méthode de calcul</a></Link><br/>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(home);
