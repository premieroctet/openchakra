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
import MenuItem from "@material-ui/core/MenuItem";
import Select from 'react-select';

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

class testCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            cities: [],
            check: false,
            city: null,


        };
        this.onChange2 = this.onChange2.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };

    onChange2 = city => {
        this.setState({ city });
        console.log(city);
    };

    onSubmit = e => {
        e.preventDefault();

        const code = this.state.code;

        axios.get(`https://geo.api.gouv.fr/communes?codeDepartement=${code}&fields=nom&format=json&geometry=centre`)
            .then(res => {
                const data = res.data;
                this.setState({cities: data, check: true});


            })
            .catch(err => {
                console.log(err);
            })


    };

    render()  {
        const { classes } = this.props;
        const {cities} = this.state;
        const {check} = this.state;
        const {city} =  this.state;
        const options = cities.map(citie => ({
            label: citie.nom,
            value: citie.nom
        }));


        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ville</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Code département"
                                        placeholder="Code département"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                {check ?
                                    <Grid item>
                                        <Select
                                            value={city}
                                            onChange={this.onChange2}
                                            options={options}
                                        />
                                    </Grid>
                                    : ''}

                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
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



export default withStyles(styles)(testCity);
