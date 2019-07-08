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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
            picture: null,
            category: '',
            tags: [],
            equipments: [],
            description: '',
            majoration: '',
            isChecked: false,
            all_category: [],
            all_tags: [],
            all_equipments: [],
            errors: {},
        };
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
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

    onChangeFile(e){
        this.setState({picture:e.target.files[0]})
    }

    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
    }


    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('label',this.state.label);
        formData.append('picture',this.state.picture);
        formData.append('category',this.state.category);
        formData.append('tags',this.state.tags);
        formData.append('equipments',this.state.equipments);
        formData.append('description',this.state.description);
        formData.append('majoration',this.state.majoration);

        axios
            .post(url+'myAlfred/api/admin/service/all', formData)
            .then(res => {
                alert('Service ajouté');
                Router.push({pathname:'/dashboard/services/all'})
            })
            .catch(err => {
                    console.log(err);
                    this.setState({errors: err.response.data});
                if(err.response.status === 401 || err.response.status === 403 ) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
                }
            );


    };

    render() {
        const { classes } = this.props;
        const {all_category} = this.state;
        const {all_tags} = this.state;
        const {all_equipments} = this.state;
        const {errors} = this.state;

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));
        const {isChecked} = this.state;


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
                                        error={errors.label}
                                    />
                                    <em>{errors.label}</em>
                                </Grid>
                                <Grid item style={{width: '100%'}}>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                                    <em>{errors.category}</em>
                                </Grid>
                                <Grid item style={{width: '100%'}}>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                                    <em>{errors.tags}</em>
                                </Grid>
                                <Grid item style={{width: '100%'}}>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                                    <em>{errors.equipments}</em>
                                </Grid>
                                <Grid item>
                                    <input type="file" name="picture" onChange= {this.onChangeFile} accept="image/*" />
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
                                        error={errors.description}
                                    />
                                    <em>{errors.description}</em>
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isChecked}
                                                onChange={this.handleChecked}
                                                value={this.state.isChecked}
                                                color="primary"
                                                name={"isChecked"}
                                            />
                                        }
                                        label="Majoration ?"
                                    />

                                </Grid>
                                {isChecked ?
                                    <Grid item>
                                        <TextField
                                            id="standard-with-placeholder"
                                            label="Majoration"
                                            placeholder="Majoration"
                                            margin="normal"
                                            style={{ width: '100%' }}
                                            type="text"
                                            name="majoration"
                                            value={this.state.majoration}
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    : ''}
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
