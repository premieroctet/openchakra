import { toast } from 'react-toastify';
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Router from "next/router";
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
            name: '',
            status: '',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };




    onSubmit = e => {


        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = day+'/'+month+'/'+year;
                //const finalDate = moment(result).format('YYYY-MM-DD');
                this.setState({
                  name: data.etablissement.l1_normalisee, 
                  nafape: data.etablissement.activite_principale, 
                  status: data.etablissement.libelle_nature_juridique_entreprise,
                  creationDate: result
                  },
                  () => this.props.onChange(this.state)
                );
            })
            .catch(err => {
                toast.error("Siret inconnu");
                this.setState({
                  name:'', nafape: '', 
                  status: '', 
                  creationDate:'', 
                  siret:'',
                  nafape: '',
                  }, () => this.props.onChange(this.state));
                console.log(err);
            })


    };

    render()  {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12} md={6}>
                            <TextField
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
                    <Button type="button" variant='contained' color="secondary" style={{marginTop: 25, marginLeft: 15,color: 'white'}} onClick={() => this.onSubmit()}>
                        Valider
                    </Button>
                </Grid>


                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                                <Typography>Siret : {this.state.siret}</Typography>
                    </Grid>
                <Grid item xs={12} sm={12} md={6}>
                            <Typography>Date de création : {this.state.creationDate}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                            <Typography>Dénomination : {this.state.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                            <Typography>Code NAF/APE : {this.state.nafape}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                            <Typography>Statut juridique : {this.state.status}</Typography>
                </Grid>
                </Grid>
            </Grid>
        );
    };
}



export default withStyles(styles)(siret);
