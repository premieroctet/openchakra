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

class editStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_particular: false,
            is_professional: false,
            self_employed: false,
            individual_company: false,
            name: '',
            creation_date: '',
            siret: '',
            naf_ape: '',
            vat_number: '',
            shop: {},
            company: {}


        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop, is_particular: shop.is_particular, is_professional: shop.is_professional,
                    self_employed: shop.self_employed, individual_company: shop.individual_company, company: shop.company});

                this.setState({name: this.state.company.name, creation_date: this.state.company.creation_date, siret: this.state.company.siret,
                naf_ape: this.state.company.naf_ape, vat_number: this.state.company.vat_number});


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

    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newStatus = {
            is_particular: this.state.is_particular,
            is_professional: this.state.is_professional,
            self_employed: this.state.self_employed,
            individual_company: this.state.individual_company,
            name: this.state.name,
            creation_date: this.state.creation_date,
            siret: this.state.siret,
            naf_ape: this.state.naf_ape,
            vat_number: this.state.vat_number,

        };
        axios
            .put(url+'myAlfred/api/shop/editStatus', newStatus)
            .then(res => {
                alert('Statut modifié');
                Router.push('/dashboardAlfred/home')
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
                                <Typography style={{ fontSize: 30 }}>Modifier mon statut</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.is_particular}
                                                onChange={this.onChange}
                                                value={this.state.is_particular}
                                                name="is_particular"
                                                color="primary"
                                            />
                                        }
                                        label="Je suis un particulier"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.is_professional}
                                                onChange={this.onChange}
                                                value={this.state.is_professional}
                                                name="is_professional"
                                                color="primary"
                                            />
                                        }
                                        label="Je suis un professionnel"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.self_employed}
                                                onChange={this.onChange}
                                                value={this.state.self_employed}
                                                name="self_employed"
                                                color="primary"
                                            />
                                        }
                                        label="Je suis auto-entrepreneur"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.individual_company}
                                                onChange={this.onChange}
                                                value={this.state.individual_company}
                                                name="individual_company"
                                                color="primary"
                                            />
                                        }
                                        label="Micro entreprise"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange2}
                                        helperText={"Nom de la société"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="date"
                                        label="Date de création"
                                        type="date"
                                        name="creation_date"
                                        value={this.state.creation_date}
                                        onChange={this.onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="siret"
                                        value={this.state.siret}
                                        onChange={this.onChange2}
                                        helperText={"Siret"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="naf_ape"
                                        value={this.state.naf_ape}
                                        onChange={this.onChange2}
                                        helperText={"Naf ape"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="vat_number"
                                        value={this.state.vat_number}
                                        onChange={this.onChange2}
                                        helperText={"Numéro de tva"}
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

export default withStyles(styles)(editStatus);
