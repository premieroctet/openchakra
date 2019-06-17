import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';




import Layout from '../hoc/Layout/Layout';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
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
    selectgenre: {
        marginTop: 20,
        marginBottom: -15,
    },
});

class addAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            country: '',
            zip_code: '',

        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newAddress = {
            address: this.state.address,
            city: this.state.city,
            zip_code: this.state.zip_code,
            country: this.state.country
        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put(url+'myAlfred/api/users/profile/billingAddress', newAddress)
            .then(res => {
                console.log('ok');
                Router.push({pathname:'/profile'})
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
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter une adresse</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Adresse"
                                        placeholder="Adresse"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Ville"
                                        placeholder="Ville"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Code postal"
                                        placeholder="Code postal"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="zip_code"
                                        value={this.state.zip_code}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item className={classes.selectgenre}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Pays
                                        </InputLabel>
                                        <Select
                                            input={<Input name="country" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="country"
                                            value={this.state.country}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            <MenuItem value={"1"}>France</MenuItem>
                                            <MenuItem value={"2"}>Maroc</MenuItem>
                                        </Select>
                                        <FormHelperText>Quel est votre pays ?</FormHelperText>
                                    </FormControl>
                                </Grid>

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

export default withStyles(styles)(addAddress);
