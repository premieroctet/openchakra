import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from 'next/link';
import Select2 from 'react-select';
import FormControl from "@material-ui/core/FormControl";
import Edit from "@material-ui/icons/Edit";
import Select from 'react-select';
import InputRange from "react-input-range";
import {ErrorMessage, Field} from "formik";
import MenuItem from "@material-ui/core/MenuItem";


const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '170vh',
        justifyContent: 'top',
        flexDirection: 'column',
        marginTop: 150,

    },

});

class addService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: '',
            all_service: [],
            all_category: [],
            all_equipments: [],
            category: '',
            equipments: [],
            city: '',
            perimeter: '',
            minimum_basket: '',
            deadline_before_booking: '',
            options: [],
            label:'',
            unity: '',
            price: '',
            option_extra: '',
            description: '',
            level: '',
            category_selected: false,
            service_selected: false,
            selectedOption: null,
            current_service: '',
            address: '',
            cities: [],
            city_check: false,
            code: '',
            delay_name: '',
            delay_value: '',





        };
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleCityClick = this.handleCityClick.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/category/all')
            .then(res => {
                let category = res.data;
                this.setState({all_category:category});



            })
            .catch(err =>
                console.log(err)
            );

        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({address: user.billing_address});

                const code = this.state.address.zip_code;
                const newCode = code.substring(0,2);
                this.setState({code: newCode});

                axios.get(`https://geo.api.gouv.fr/communes?codeDepartement=${newCode}&fields=nom&format=json&geometry=centre`)
                    .then(response => {
                        const data2 = response.data;
                        this.setState({cities: data2, check: true});


                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => console.log(err));




    }

    handleChangeCategory= category => {
        this.setState({ category });

        axios.get(url+'myAlfred/api/service/all/'+category.value)
            .then(res => {
                let service = res.data;
                this.setState({all_service: service, category_selected: true})

            })

    };

    handleChangeService= service => {
        this.setState({ service });
        this.setState({service_selected: true});

        axios.get(url+'myAlfred/api/service/'+service.value)
            .then(res => {
                let service = res.data;
                this.setState({current_service: service, all_equipments: service.equipments});

            })


    };

    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });

    };

    handleCityClick =() => {
        this.setState({city_check: true})
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };
    onChange2 = city => {
        this.setState({ city });

    };



    render() {
        const { classes } = this.props;
        const {all_category} = this.state;
        const {category_selected} = this.state;
        const {service_selected} = this.state;
        const {all_service} = this.state;
        const {all_equipments} = this.state;
        const {address} = this.state;

        const {cities} = this.state;
        const {city_check} = this.state;
        const {city} =  this.state;
        const optionsCities = cities.map(citie => ({
            label: citie.nom,
            value: citie.nom
        }));

        const optionsCategory = all_category.map(tag => ({
            label: tag.label,
            value: tag._id
        }));

        const optionsService = all_service.map(service => ({
            label: service.label,
            value: service._id
        }));

        const options = all_equipments.map(equipment => ({
            label: equipment.label,
            value: equipment._id
        }));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Grid item style={{ width: '100%',marginTop:20 }}>
                        <Typography style={{ fontSize: 20 }}>Catégorie</Typography>
                        <FormControl className={classes.formControl} style={{ width: '100%' }}>
                            <Select2
                                value={this.state.category}
                                onChange={this.handleChangeCategory}
                                options={optionsCategory}


                            />
                        </FormControl>

                        {category_selected ?

                            <React.Fragment><Typography style={{ fontSize: 20 }}>Service</Typography>
                            <FormControl className={classes.formControl} style={{ width: '100%' }}>
                            <Select2
                            value={this.state.service}
                            onChange={this.handleChangeService}
                            options={optionsService}


                            />
                            </FormControl></React.Fragment>

                            : null}

                        {service_selected ?
                            <React.Fragment>
                                <Typography style={{ fontSize: 20 }}>Equipements</Typography>
                                <FormControl className={classes.formControl} style={{width: '100%'}}>

                                    <Select2
                                        value={this.state.selectedOption}
                                        onChange={this.handleChangeSelect}
                                        options={options}
                                        isMulti
                                        isSearchable
                                        closeMenuOnSelect={false}

                                    />
                                </FormControl>
                                <p>Ville : {address.city}</p><Edit onClick={() => this.handleCityClick()}/>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Panier minimum"
                                        placeholder="Panier minimum"
                                        margin="normal"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="minimum_basket"
                                        value={this.state.minimum_basket}
                                        onChange={this.onChange}
                                        helperText="Votre panier minimum"
                                    />
                                </Grid>
                                <Grid item>
                                    <InputRange
                                        maxValue={100}
                                        minValue={0}
                                        value={this.state.perimeter}
                                        onChange={value =>this.setState({perimeter: value})}
                                        name={"perimeter"}
                                        step={10}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        style={{ width: '60%' }}
                                        type="text"
                                        name="delay_value"
                                        value={this.state.delay_value}
                                        onChange={this.onChange}
                                    />

                                    <TextField

                                        style={{width: '40%'}}
                                        select
                                        name={'delay_name'}
                                        onChange={this.onChange}
                                        margin="dense"
                                        variant="outlined"
                                        value={this.state.delay_name}
                                        label="Jours / semaines / mois"
                                    >
                                        <MenuItem value="jours">Jour(s)</MenuItem>
                                        <MenuItem value="semaines">semaine(s)</MenuItem>
                                        <MenuItem value="mois">mois</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Description"
                                        placeholder="Description"
                                        margin="normal"
                                        variant="outlined"
                                        multiline
                                        rows={6}
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                {city_check ?

                                    <React.Fragment>
                                        <Grid item>
                                            <TextField
                                                id="standard-with-placeholder"
                                                label="Code département"
                                                placeholder="Code département"
                                                margin="normal"
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="code"
                                                value={this.state.code}
                                                onChange={this.onChange}
                                                helperText="Choisissez la ville où le service sera pratiqué. Pour cela, entrez les deux premiers numéros du département de la ville (ex : pour Rouen, 76)"
                                            />
                                        </Grid>
                                        <Grid item style={{ display: 'flex', justifyContent: 'start'}}>
                                            <Button type="button" color="primary" onClick={() => this.onSubmit()}>
                                                Valider
                                            </Button>
                                        </Grid>
                                            <Grid item>
                                                <Select
                                                    styles={{menu: (styles) => Object.assign(styles, {zIndex: 1000})}}
                                                    value={city}
                                                    onChange={this.onChange2}
                                                    options={optionsCities}
                                                    helperText="Choisissez maintenant votre ville en la recherchant dans le menu"
                                                />
                                            </Grid>

                                    </React.Fragment>
                                    : null}
                            </React.Fragment>

                            : null}
                    </Grid>
                </Grid>

            </Layout>
        );
    };
}

export default withStyles(styles)(addService);
