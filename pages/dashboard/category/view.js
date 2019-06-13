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
};

class view extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: {},
            label: '',
            picture: ''

        };

        this.handleClick = this.handleClick.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { category_id: id }

    }
    componentDidMount() {
        const id = this.props.category_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`http://localhost:5000/myAlfred/api/admin/category/all/${id}`)
            .then(response => {
               let category = response.data;
                this.setState({category: category});

            })
            .catch(err => {
                console.log(err)
            })

    }

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value });
        const state = this.state.category;
        state[e.target.name] = e.target.value;
        this.setState({category:state});
    };

    onSubmit = e => {
        e.preventDefault();

        /*const data = {
            label: this.state.label,
            picture: this.state.picture

        };*/
        const { label, picture } = this.state.category;
        const id = this.props.category_id;
        axios.put(`http://localhost:5000/myAlfred/api/admin/category/all/${id}`,{label,picture})
            .then(res => {

                alert('Categorie modifié avec succès');
                Router.push({pathname:'/dashboard/category/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };

    handleClick() {
        const id = this.props.category_id;
        axios.delete(`http://localhost:5000/myAlfred/api/admin/category/all/${id}`)
            .then(res => {

                alert('Categorie supprimée avec succès');
                Router.push({pathname:'/dashboard/category/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };


    render()  {
        const { classes } = this.props;
        const {category} = this.state;


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
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="picture"
                                        value={category.picture}
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
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(view);
