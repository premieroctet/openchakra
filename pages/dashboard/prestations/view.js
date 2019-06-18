import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";

const url = "https://myalfred.hausdivision.com/";
const styles = {
    loginContainer: {
        alignItems: 'center',
        height: '150vh',
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
};

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

class view extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prestation: {},
            current_service: '',
            current_search_filter: [],
            current_category: '',
            current_billing: '',
            current_filter_presentation: '',
            current_calculating: '',
            current_job: '',
            all_category: [],
            all_service: [],
            all_billing: [],
            all_calculating: [],
            all_job: [],
            all_search_filter: [],
            all_filter_presentation: [],
            category: '',
            service: '',
            billing: '',
            filter_presentation: '',
            search_filter: [],
            calculating: '',
            job: '',

        };

        this.handleClick = this.handleClick.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { prestation_id: id }

    }
    componentDidMount() {
        const id = this.props.prestation_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${url}myAlfred/api/admin/prestation/all/${id}`)
            .then(response => {
                let prestation = response.data;
                this.setState({prestation: prestation, current_service: prestation.service,
                    current_billing: prestation.billing, current_category: prestation.category, current_calculating:prestation.calculating,
                    current_job: prestation.job, current_filter_presentation: prestation.filter_presentation,
                    current_search_filter: prestation.search_filter});


            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            });

        axios.get(url+"myAlfred/api/admin/category/all")
            .then((response) => {
                let category = response.data;
                this.setState({all_category: category})
            }).catch((error) => {
            console.log(error)
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
        const state = this.state.prestation;
        state[e.target.name] = e.target.value;
        this.setState({prestation:state});
    };

    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = e => {
        this.setState({search_filter: e.target.value})


    };

    onSubmit = e => {
        e.preventDefault();
        const service = this.state.service;
        const category = this.state.category;
        const billing = this.state.billing;
        const calculating = this.state.calculating;
        const search_filter = this.state.search_filter;
        const job = this.state.job;
        const filter_presentation = this.state.filter_presentation;
        const { label,price } = this.state.prestation;
        const id = this.props.prestation_id;
        axios.put(`${url}myAlfred/api/admin/prestation/all/${id}`,{label,price,billing,category,service,search_filter,filter_presentation,
                                                                                calculating,job})
            .then(res => {

                alert('Prestation modifiée avec succès');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };

    handleClick() {
        const id = this.props.prestation_id;
        axios.delete(`${url}myAlfred/api/admin/prestation/all/${id}`)
            .then(res => {

                alert('Prestation supprimée avec succès');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };


    render()  {
        const { classes } = this.props;
        const {prestation} = this.state;
        const {current_service} = this.state;
        const {current_billing} = this.state;
        const {current_category} = this.state;
        const {current_calculating} = this.state;
        const {current_search_filter} = this.state;
        const {current_filter_presentation} = this.state;
        const {current_job} = this.state;
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
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{prestation.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={prestation.label}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Prix moyen</Typography>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="price"
                                        value={prestation.price}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_category.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Catégorie
                                        </InputLabel>
                                        <Select
                                            input={<Input name="category" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.onChange2}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {categories}
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_service.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Service
                                        </InputLabel>
                                        <Select
                                            input={<Input name="service" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="service"
                                            value={this.state.service}
                                            onChange={this.onChange2}
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
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_billing.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Méthode de facturation
                                        </InputLabel>
                                        <Select
                                            input={<Input name="billing" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="billing"
                                            value={this.state.billing}
                                            onChange={this.onChange2}
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
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_calculating.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Méthode de calcul
                                        </InputLabel>
                                        <Select
                                            input={<Input name="calculating" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="calculating"
                                            value={this.state.calculating}
                                            onChange={this.onChange2}
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
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_filter_presentation.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Filtre de présentation
                                        </InputLabel>
                                        <Select
                                            input={<Input name="filter_presentation" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="filter_presentation"
                                            value={this.state.filter_presentation}
                                            onChange={this.onChange2}
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
                                    </FormControl>
                                </Grid>

                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Filtres de recherche</Typography>
                                    {current_search_filter.map(e => (
                                        <p>{e.label}</p>
                                    ))}
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
                                    <Typography style={{ fontSize: 20 }}>{current_job.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Métier
                                        </InputLabel>
                                        <Select
                                            input={<Input name="job" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="job"
                                            value={this.state.job}
                                            onChange={this.onChange2}
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
                                    </FormControl>
                                </Grid>


                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
                                    </Button>
                                    <Button type="button" variant="contained" color="secondary" style={{ width: '100%' }} onClick={this.handleClick}>
                                        Supprimer
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



export default withStyles(styles)(view);
