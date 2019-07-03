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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

const {config} = require('../../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '300vh',
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
            description: '',
            all_tags: [],
            tags: []
        };
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+"myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
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
    onChangeFile(e){
        this.setState({picture:e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('picture',this.state.picture);
        formData.append('label',this.state.label);
        formData.append('tags',this.state.tags);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .post(url+'myAlfred/api/admin/category/all', formData)
            .then(res => {
                alert('Catégorie ajouté');
                Router.push({pathname:'/dashboard/category/all'})
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
        const {all_tags} = this.state;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter une catégorie</Typography>
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
                                    <input type="file" name="picture" onChange= {this.onChangeFile} accept="image/*" />
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
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Description"
                                        placeholder="Description"
                                        multiline
                                        rows="4"
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
