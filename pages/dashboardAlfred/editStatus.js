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
            siret: '',
            nafape: '',
            creationDate: '',
            denomination: '',
            status: '',
            shop: {},
            company: {},
            check: false,


        };
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChecked2 = this.handleChecked2.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop, is_particular: shop.is_particular, is_professional: shop.is_professional,
                     company: shop.company});

                this.setState({denomination: this.state.company.name, creationDate: this.state.company.creation_date, siret: this.state.company.siret,
                nafape: this.state.company.naf_ape, status: this.state.company.status});

                if(this.state.is_professional === true) {
                    this.setState({check: true})
                }


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

    handleChecked () {
        this.setState({check: !this.state.check});
        this.setState({is_particular: false})
    }

    handleChecked2 () {
        this.setState({check: !this.state.check});
        this.setState({is_professional: false});
        this.setState({denomination: ''});
        this.setState({siret: ''});
        this.setState({nafape: ''});
        this.setState({creationDate: ''});
        this.setState({status: ''});
    }

    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newStatus = {
            is_particular: this.state.is_particular,
            is_professional: this.state.is_professional,
            status: this.state.status,
            name: this.state.denomination,
            creation_date: this.state.creationDate,
            siret: this.state.siret,
            naf_ape: this.state.nafape,


        };
        axios
            .put(url+'myAlfred/api/shop/editStatus', newStatus)
            .then(res => {
                alert('Statut modifié');
                Router.push('/dashboardAlfred/editShop')
            })
            .catch(err =>
                console.log(err)
            );


    };

    onSubmit2 = e => {
        e.preventDefault();
        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                this.setState({denomination: data.etablissement.l1_normalisee, nafape: data.etablissement.activite_principale,
                status: data.etablissement.libelle_nature_juridique_entreprise});
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = day+'/'+month+'/'+year;
                //const finalDate = moment(result).format('YYYY-MM-DD');
                this.setState({creationDate: result});

                this.setState({siret: code});




            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        const { classes } = this.props;
        const {check} = this.state;



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
                                                onChange={(e)=>{this.onChange(e);this.handleChecked2()}}
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
                                                onChange={(e)=>{this.onChange(e);this.handleChecked()}}
                                                value={this.state.is_professional}
                                                name="is_professional"
                                                color="primary"
                                            />
                                        }
                                        label="Je suis un professionnel"
                                    />
                                </Grid>
                                {check ?
                                    <React.Fragment>

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
                                        <Button type="button" onClick={this.onSubmit2} variant="contained" color="primary" style={{ width: '100%',color:'white' }}>
                                            Valider
                                        </Button>

                                </Grid>
                                <Grid item>
                                    <p>Dénomination : {this.state.denomination}</p>
                                </Grid>
                                <Grid item>
                                    <p>Date de création : {this.state.creationDate}</p>
                                </Grid>

                                <Grid item>
                                    <p>NAF/APE : {this.state.nafape}</p>
                                </Grid>
                                        <Grid item>
                                            <p>Statut juridique : {this.state.status}</p>
                                        </Grid>

                                    </React.Fragment> : null }

                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color:'white' }}>
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
