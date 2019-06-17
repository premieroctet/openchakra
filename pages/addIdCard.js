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

class addIdCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recto: '',
            verso: ''
        };
    }

    onChange = e => {
        this.setState({recto:e.target.files[0]});
    };

    onChange2 = e => {
        this.setState({verso:e.target.files[0]});
    };

    onSubmit = e => {
        e.preventDefault();


        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('myCardR',this.state.recto);
        formData.append('myCardV',this.state.verso);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url+"myAlfred/api/users/profile/idCard",formData,config)
            .then((response) => {
                alert("Carte d'identité ajouté");
                Router.push({pathname:'/profile'})
            }).catch((error) => {
            console.log(error)
        });


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter votre carte d'identité</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <label>
                                    Recto
                                <Grid item>
                                    <input type="file" name="myCardR" onChange={this.onChange} accept=".pdf" />
                                </Grid>
                                </label>
                                <label>
                                    Verso
                                <Grid item>
                                    <input type="file" name="myCardV" onChange={this.onChange2} accept=".pdf" />
                                </Grid>
                                </label>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Ajouter
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(addIdCard);
