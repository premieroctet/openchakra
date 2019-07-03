import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';




import Layout from '../../hoc/Layout/Layout';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const { config } = require('../../config/config');
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

class editParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking_request: false,
            my_alfred_conditions: false,
            profile_picture: false,
            identity_card: false,
            recommandations: false,
            flexible_cancel: false,
            moderate_cancel: false,
            strict_cancel: false,
            shop: {},


        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop, booking_request: shop.booking_request, my_alfred_conditions: shop.my_alfred_conditions,
                profile_picture: shop.profile_picture, identity_card: shop.identity_card, recommandations: shop.recommandations,
                flexible_cancel: shop.flexible_cancel, moderate_cancel: shop.moderate_cancel, strict_cancel: shop.strict_cancel});


            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = event => {

            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });

    };

    onSubmit = e => {
        e.preventDefault();

        const newParameters = {
            booking_request: this.state.booking_request,
            my_alfred_conditions: this.state.my_alfred_conditions,
            profile_picture: this.state.profile_picture,
            identity_card: this.state.profile_picture,
            recommandations: this.state.recommandations,
            flexible_cancel: this.state.flexible_cancel,
            moderate_cancel: this.state.moderate_cancel,
            strict_cancel: this.state.strict_cancel

        };
        axios
            .put(url+'myAlfred/api/shop/editParameters', newParameters)
            .then(res => {
                alert('Paramètres modifiés');
                Router.push({pathname:'/dashboardAlfred/home'})
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
                                <Typography style={{ fontSize: 30 }}>Modifier mes paramètres</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.booking_request}
                                                onChange={this.onChange}
                                                value={this.state.booking_request}
                                                color="primary"
                                                name={"booking_request"}
                                            />
                                        }
                                        label="Demande de réservation 24H avant"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.my_alfred_conditions}
                                                onChange={this.onChange}
                                                value={this.state.my_alfred_conditions}
                                                color="primary"
                                                name={"my_alfred_conditions"}
                                            />
                                        }
                                        label="Conditions myAlfred acceptées"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.profile_picture}
                                                onChange={this.onChange}
                                                value={this.state.profile_picture}
                                                name="profile_picture"
                                                color="primary"
                                            />
                                        }
                                        label="Seulement avec une photo de profil"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.identity_card}
                                                onChange={this.onChange}
                                                value={this.state.identity_card}
                                                name="identity_card"
                                                color="primary"
                                            />
                                        }
                                        label="Seulement avec une carte d'identité vérifiée"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.recommandations}
                                                onChange={this.onChange}
                                                value={this.state.recommandations}
                                                name="recommandations"
                                                color="primary"
                                            />
                                        }
                                        label="Recommandations"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.flexible_cancel}
                                                onChange={this.onChange}
                                                value={this.state.flexible_cancel}
                                                name="flexible_cancel"
                                                color="primary"
                                            />
                                        }
                                        label="Annulation flexible"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.moderate_cancel}
                                                onChange={this.onChange}
                                                value={this.state.moderate_cancel}
                                                name="moderate_cancel"
                                                color="primary"
                                            />
                                        }
                                        label="Annulation modérée"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.strict_cancel}
                                                onChange={this.onChange}
                                                value={this.state.strict_cancel}
                                                name="strict_cancel"
                                                color="primary"
                                            />
                                        }
                                        label="Annulation strict"
                                    />
                                </Grid>


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

export default withStyles(styles)(editParameters);
