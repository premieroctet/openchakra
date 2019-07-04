import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';


import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

const {config} = require('../../../config/config');
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
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
            category: {},
            label: '',
            tags: [],
            description: '',
            all_tags: [],
            current_tags: [],

        };

        this.handleClick = this.handleClick.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { category_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.category_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${url}myAlfred/api/admin/category/all/${id}`)
            .then(response => {
               let category = response.data;
                this.setState({category: category,current_tags: category.tags,});

            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            });

        axios.get(url+"myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error)
        });

    }

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value });
        const state = this.state.category;
        state[e.target.name] = e.target.value;
        this.setState({category:state});
    };

    handleChange = e => {
        this.setState({tags: e.target.value})


    };

    onSubmit = e => {
        e.preventDefault();
        const tags = this.state.tags;
        const { label, description } = this.state.category;
        const id = this.props.category_id;
        axios.put(`${url}myAlfred/api/admin/category/all/${id}`,{label,tags,description})
            .then(res => {

                alert('Categorie modifié avec succès');
                Router.push({pathname:'/dashboard/category/all'})
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };

    handleClick() {
        const id = this.props.category_id;
        axios.delete(`${url}myAlfred/api/admin/category/all/${id}`)
            .then(res => {

                alert('Categorie supprimée avec succès');
                Router.push({pathname:'/dashboard/category/all'})
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };


    render()  {
        const { classes } = this.props;
        const {category} = this.state;
        const {all_tags} = this.state;
        const {current_tags} = this.state;


        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{category.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={category.label}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Tags</Typography>
                                    {current_tags.map(e => (
                                        <p>{e.label}</p>
                                    ))}
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
                                    <Typography style={{ fontSize: 20 }}>Description</Typography>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        multiline
                                        rows="4"
                                        name="description"
                                        value={category.description}
                                        onChange={this.onChange}

                                    />
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
                            <Link href={`editPicture?id=${this.props.category_id}`}>
                                <Button type="button" variant="contained" color="primary" style={{ width: '100%' }}>
                                    Modifier la photo
                                </Button>
                            </Link>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(view);
