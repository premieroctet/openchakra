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


        };
        this.onChange2 = this.onChange2.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.onChange4 = this.onChange4.bind(this);

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.formikCtx.setFieldValue(`createShop.siret`, siret)

    };

    onChange2 = creationDate => {
        this.setState({ creationDate });
        this.props.formikCtx.setFieldValue(`createShop.creationDate`, creationDate)

    };

    onChange3 = denomination => {
        this.setState({ denomination });
        this.props.formikCtx.setFieldValue(`createShop.denomination`, denomination)

    };

    onChange4 = nafape => {
        this.setState({ nafape });
        this.props.formikCtx.setFieldValue(`createShop.nafape`, nafape)

    };


    onSubmit = e => {
        

        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                this.setState({denomination: data.etablissement.l1_normalisee, nafape: data.etablissement.activite_principale});
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = year+'-'+month+'-'+day;
                const finalDate = moment(result).format('YYYY-MM-DD');
                this.setState({creationDate: finalDate});



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
                                variant="filled"
                                type="text"
                                name={'siret'}
                                value={this.state.siret}
                                onChange={this.onChange}
                            />
                        )
                    }} />
                    <ErrorMessage name={`createShop.siret`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                    <Button type="button" color="primary" onClick={() => this.onSubmit()}>
                        Valider
                    </Button>
                </Grid>



                <Grid item xs={12} md={6}>
                    <Field name="createShop.creationDate" render={({field}) => {
                        return (
                            <TextField
                                {...field}
                                id="date"
                                label="Date de création"
                                type="date"
                                value={this.state.creationDate}
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{ marginTop: 14.5 }}
                                onChange={this.onChange2}

                            />
                        )
                    }} />
                    <ErrorMessage name={`createShop.creationDate`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field name="createShop.denomination" render={({field}) => {
                        return (
                            <TextField
                                {...field}
                                id="filled-with-placeholder"
                                label="Dénomination"
                                placeholder="Dénomination"
                                margin="normal"
                                variant="filled"
                                type="text"
                                value={this.state.denomination}
                                onChange={this.onChange3}
                            />
                        )
                    }} />
                    <ErrorMessage name={`createShop.denomination`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field name="createShop.nafape" render={({field}) => {
                        return (
                            <TextField
                                {...field}
                                id="filled-with-placeholder"
                                label="Code NAF/APE"
                                placeholder="Code NAF/APE"
                                margin="normal"
                                variant="filled"
                                type="text"
                                value={this.state.nafape}
                                onChange={this.onChange4}

                            />
                        )
                    }} />
                    <ErrorMessage name={`createShop.nafape`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                </Grid>
            </Grid>
        );
    };
}



export default withStyles(styles)(siret);
