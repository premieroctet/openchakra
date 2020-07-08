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
import Select2 from 'react-select';
import cookie from 'react-cookies'

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
            tags: [],
            selectedTags: null,
            errors: {},
        };
        this.onChangeFile = this.onChangeFile.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios.get("/myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error);

        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };



    handleChangeTags = selectedTags => {
        this.setState({ selectedTags });

    };
    onChangeFile(e){
        this.setState({picture:e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault();
        let arrayTags = [];
        if(this.state.selectedTags != null){
            this.state.selectedTags.forEach(w => {

                arrayTags.push(w.value);

            });
        }

        const formData = new FormData();
        formData.append('picture',this.state.picture);
        formData.append('label',this.state.label);
        formData.append('tags',JSON.stringify(arrayTags));
        formData.append('description',this.state.description);

        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios
            .post('/myAlfred/api/admin/category/all', formData)
            .then(res => {
                alert('Catégorie ajouté');
                Router.push({pathname:'/dashboard/category/all'})
            })
            .catch(err => {
                console.error(err);
                this.setState({errors: err.response.data});
                if(err.response.status === 401 || err.response.status === 403 ) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
                }
            );


    };

    render() {
        const { classes } = this.props;
        const {all_tags} = this.state;
        const {errors} = this.state;

        const optionsTags = all_tags.map(tag => ({
            label: tag.label,
            value: tag._id
        }));


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
                                        error={errors.label}
                                    />
                                    <em>{errors.label}</em>
                                </Grid>
                                <Grid item>
                                    <label>Image</label>
                                    <input type="file" name="picture" onChange= {this.onChangeFile} accept="image/*" />
                                    <em>{errors.picture}</em>
                                </Grid>
                                <Grid item style={{ width: '100%',marginTop:20 }}>
                                    <Typography style={{ fontSize: 20 }}>Tags</Typography>
                                    <FormControl className={classes.formControl} style={{ width: '100%' }}>
                                        <Select2
                                            value={this.state.selectedTags}
                                            onChange={this.handleChangeTags}
                                            options={optionsTags}
                                            isMulti
                                            isSearchable
                                            closeMenuOnSelect={false}

                                        />
                                    </FormControl>
                                    <em>{errors.tags}</em>
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
                                        error={errors.description}
                                    />
                                    <em>{errors.description}</em>
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
