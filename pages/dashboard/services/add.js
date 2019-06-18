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

const { config } = require('../../../config/config');
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
            picture: '',
            category: '',
            tags: [],
            equipments: [],
            description: '',
            all_category: [],
            all_tags: [],
            all_equipments: []
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+"myAlfred/api/admin/category/all")
            .then((response) => {
                let category = response.data;
                this.setState({all_category: category})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/equipment/all")
            .then((response) => {
                let equipments = response.data;
                this.setState({all_equipments: equipments})
            }).catch((error) => {
            console.log(error)
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = e => {
        this.setState({tags: e.target.value})


    };

    handleChange2 = e => {
        this.setState({equipments: e.target.value})


    };

    onSubmit = e => {
        e.preventDefault();

        const newService = {
            label: this.state.label,
            picture: this.state.picture,
            category: this.state.category,
            tags: this.state.tags,
            equipments: this.state.equipments,
            description: this.state.description

        };
        axios
            .post(url+'myAlfred/api/admin/service/all', newService)
            .then(res => {
                alert('Service ajouté');
                Router.push({pathname:'/dashboard/services/all'})
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
        const {all_tags} = this.state;
        const {all_equipments} = this.state;

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter un service</Typography>
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
                                        <InputLabel htmlFor="select-multiple-chip">Tags</InputLabel>
                                        <Select
                                            multiple
                                            value={this.state.tags}
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
                                            {all_tags.map(name => (
                                                <MenuItem key={name._id} value={name._id} >
                                                    {name.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-multiple-chip">Equipements</InputLabel>
                                        <Select
                                            multiple
                                            value={this.state.equipments}
                                            onChange={this.handleChange2}
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
                                            {all_equipments.map(name => (
                                                <MenuItem key={name._id} value={name._id} >
                                                    {name.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Id de l'image unsplash"
                                        placeholder="Id de l'image unsplash"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="picture"
                                        value={this.state.picture}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Description"
                                        placeholder="Description"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
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
