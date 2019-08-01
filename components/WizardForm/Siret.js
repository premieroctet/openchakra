import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Router from "next/router";
import {ErrorMessage, Field} from "formik";
import Button from "@material-ui/core/Button";

const moment = require('moment');
moment.locale('fr');

const { config } = require('../../config/config');
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

class siret extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            siret: '',
            nafape: '',
            creationDate: '',
            denomination: '',
            nature_juridique: '',


        };

        this.onChange = this.onChange.bind(this);


    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.formikCtx.setFieldValue(`createShop.siret`, siret)

    };




    onSubmit = e => {


        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                this.setState({denomination: data.etablissement.l1_normalisee, nafape: data.etablissement.activite_principale, nature_juridique: data.etablissement.libelle_nature_juridique_entreprise});
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = day+'/'+month+'/'+year;
                //const finalDate = moment(result).format('YYYY-MM-DD');
                this.setState({creationDate: result});

                this.props.formikCtx.setFieldValue(`createShop.siret`, code);
                this.props.formikCtx.setFieldValue(`createShop.denomination`, this.state.denomination);
                this.props.formikCtx.setFieldValue(`createShop.creationDate`, this.state.creationDate);
                this.props.formikCtx.setFieldValue(`createShop.nafape`, this.state.nafape);
                this.props.formikCtx.setFieldValue(`createShop.nature_juridique`, this.state.nature_juridique);

                console.log(this.props.formikCtx);
            })
            .catch(err => {
                console.log(err);
            })


    };

    render()  {
        const { classes } = this.props;



        return (
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Field name="createShop.siret" render={({field}) => {
                        return (
                            <TextField
                                {...field}
                                id="filled-with-placeholder"
                                label="Siret"
                                placeholder="Siret"
                                margin="normal"
                                variant="outlined"
                                type="text"
                                name={'siret'}
                                value={this.state.siret}
                                onChange={this.onChange}
                            />
                        )
                    }} />
                    <ErrorMessage name={`createShop.siret`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                    <Button type="button" variant='contained' color="secondary" style={{marginTop: 25, marginLeft: 15,color: 'white'}} onClick={() => this.onSubmit()}>
                        Valider
                    </Button>
                </Grid>


                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <Field name="createShop.siret" render={({form,field}) => {
                            return (
                                <Typography>Siret : {form.values.createShop.siret}</Typography>
                            )
                        }} />
                        <ErrorMessage name={`createShop.creationDate`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                    </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Field name="createShop.creationDate" render={({form,field}) => {
                        return (
                            <Typography>Date de création : {form.values.createShop.creationDate}</Typography>
                        )
                    }} />
                    <ErrorMessage name={`createShop.creationDate`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Field name="createShop.denomination" render={({form, field}) => {
                        return (
                            <Typography>Dénomination : {form.values.createShop.denomination}</Typography>
                        )
                    }} />
                    <ErrorMessage name={`createShop.denomination`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Field name="createShop.nafape" render={({form,field}) => {
                        return (
                            <Typography>Code NAF/APE : {form.values.createShop.nafape}</Typography>
                        )
                    }} />
                    <ErrorMessage name={`createShop.nafape`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Field name="createShop.nature_juridique" render={({form,field}) => {
                        return (
                            <Typography>Statut juridique : {form.values.createShop.nature_juridique}</Typography>
                        )
                    }} />
                    <ErrorMessage name={`createShop.nature_juridique`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                </Grid>
            </Grid>
        );
    };
}



export default withStyles(styles)(siret);
