import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
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

class editAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            country: '',
            zip_code: '',
            user: {},
            currentAddress: {}

        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user, currentAddress: user.billing_address,});
                this.setState({address: this.state.currentAddress.address, city: this.state.currentAddress.city,
                    zip_code: this.state.currentAddress.zip_code, country: this.state.currentAddress.country})

            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newAddress = {
            address: this.state.address.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
            city: this.state.city,
            zip_code: this.state.zip_code,
            country: this.state.country
        };
        axios
            .put(url+'myAlfred/api/users/profile/billingAddress', newAddress)
            .then(res => {
                alert('Adresse modifiée');
                Router.push({pathname:'/profile'})
            })
            .catch(err =>
                console.log(err)
            );


    };

    render() {
        const { classes } = this.props;



        return (


                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                        helperText={"Votre adresse"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        helperText={"Votre ville"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="zip_code"
                                        value={this.state.zip_code}
                                        onChange={this.onChange}
                                        helperText={"Votre code postal"}
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
                                            <MenuItem value={"France"}>France</MenuItem>
                                            <MenuItem value={"Maroc"}>Maroc</MenuItem>
                                        </Select>
                                        <FormHelperText>Votre pays</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>


        );
    };
}

export default withStyles(styles)(editAddress);
