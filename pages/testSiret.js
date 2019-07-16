import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import setAuthToken from '../utils/setAuthToken';

import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";

const moment = require('moment');
moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;
const styles = {
    loginContainer: {
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
    },
    menu: {
        width: 200,
    },
};

class testSiret extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            siret: '',
            naf_ape: '',
            date: '',
            name: '',


        };

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };


    onSubmit = e => {
        e.preventDefault();

        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                this.setState({name: data.etablissement.l1_normalisee, naf_ape: data.etablissement.activite_principale});
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = year+'-'+month+'-'+day;
                const finalDate = moment(result).format('YYYY-MM-DD');
                this.setState({date: finalDate});



            })
            .catch(err => {
                console.log(err);
            })


    };

    render()  {
        const { classes } = this.props;



        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Siret</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Siret"
                                        placeholder="Siret"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="siret"
                                        value={this.state.siret}
                                        onChange={this.onChange}

                                    />
                                </Grid>


                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="Dénomination"
                                    placeholder="Dénomination"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}

                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="Naf/ape"
                                    placeholder="Naf/ape"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="naf_ape"
                                    value={this.state.naf_ape}
                                    onChange={this.onChange}

                                />
                            </Grid>
                            <TextField
                                id="date"
                                label="Date de création"
                                type="date"
                                name='date'
                                value={this.state.date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.onChange}
                            />
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(testSiret);
