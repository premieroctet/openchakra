import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../../hoc/Layout/Layout';
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Chip from '@material-ui/core/Chip';

const url = "https://myalfred.hausdivision.com/";

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            price: '',
            category: '',
            service: '',
            billing: '',
            filter_presentation: '',
            search_filter: [],
            calculating: '',
            job: '',
            all_category: [],
            all_service: [],
            all_billing: [],
            all_calculating: [],
            all_job: [],
            all_search_filter: [],
            all_filter_presentation: []
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+"myAlfred/api/admin/category/all")
            .then((response) => {
                let category = response.data;
                this.setState({all_category: category})
            }).catch((error) => {
            console.log(error);

        });

        axios.get(url+"myAlfred/api/admin/service/all")
            .then((response) => {
                let service = response.data;
                this.setState({all_service: service})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/billing/all")
            .then((response) => {
                let billing = response.data;
                this.setState({all_billing: billing})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/calculating/all")
            .then((response) => {
                let calculating = response.data;
                this.setState({all_calculating: calculating})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/job/all")
            .then((response) => {
                let job = response.data;
                this.setState({all_job: job})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/searchFilter/all")
            .then((response) => {
                let search_filter = response.data;
                this.setState({all_search_filter: search_filter})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/filterPresentation/all")
            .then((response) => {
                let filter_presentation = response.data;
                this.setState({all_filter_presentation: filter_presentation})
            }).catch((error) => {
            console.log(error)
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = e => {
        this.setState({search_filter: e.target.value})


    };

    onSubmit = e => {
        e.preventDefault();

        const newPrestation = {
            label: this.state.label,
            price: this.state.price,
            category: this.state.category,
            service: this.state.service,
            billing: this.state.billing,
            calculating: this.state.calculating,
            job: this.state.job,
            search_filter: this.state.search_filter,
            filter_presentation: this.state.filter_presentation,

        };
        axios
            .post(url+'myAlfred/api/admin/prestation/all', newPrestation)
            .then(res => {
                alert('Prestation ajoutée');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                    console.log(err);
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            );


    };

    render() {
        const { classes } = this.props;
        const {all_category} = this.state;
        const {all_service} = this.state;
        const {all_billing} = this.state;
        const {all_calculating} = this.state;
        const {all_search_filter} = this.state;
        const {all_filter_presentation} = this.state;
        const {all_job} = this.state;

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));




        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter une prestation</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Label"
                                        placeholder="Label"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={this.state.label}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Prix moyen"
                                        placeholder="Prix moyen"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Catégorie
                                        </InputLabel>
                                        <Select
                                            input={<Input name="category" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {categories}
                                        </Select>
                                        <FormHelperText>Sélectionner une catégorie</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Service
                                        </InputLabel>
                                        <Select
                                            input={<Input name="service" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="service"
                                            value={this.state.service}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_service.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Sélectionner un service</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Méthode de facturation
                                        </InputLabel>
                                        <Select
                                            input={<Input name="billing" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="billing"
                                            value={this.state.billing}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_billing.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Sélectionner une méthode de facturation</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Méthode de calcul
                                        </InputLabel>
                                        <Select
                                            input={<Input name="calculating" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="calculating"
                                            value={this.state.calculating}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_calculating.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Sélectionner une méthode de calcul</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Filtre de présentation
                                        </InputLabel>
                                        <Select
                                            input={<Input name="filter_presentation" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="filter_presentation"
                                            value={this.state.filter_presentation}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_filter_presentation.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Sélectionner un filtre de présentation</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-multiple-chip">Filtres de recherche</InputLabel>
                                        <Select
                                            multiple
                                            value={this.state.search_filter}
                                            onChange={this.handleChange}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={selected => (
                                                <div className={classes.chips}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {all_search_filter.map(name => (
                                                <MenuItem key={name._id} value={name._id} >
                                                    {name.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Métier
                                        </InputLabel>
                                        <Select
                                            input={<Input name="job" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="job"
                                            value={this.state.job}
                                            onChange={this.onChange}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_job.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Sélectionner un metier</FormHelperText>
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

export default withStyles(styles)(add);
