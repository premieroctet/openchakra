import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import cookie from 'react-cookies';

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
});

class add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            errors: {},

        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newBilling = {
            label: this.state.label,


        };
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios
            .post('/myAlfred/api/admin/job/all', newBilling)
            .then(res => {
                alert('Métier ajouté');
                Router.push({pathname:'/dashboard/job/all'})
            })
            .catch(err => {
                    console.error(err);
                    this.setState({errors: err.response.data});
                if(err.response.status === 401 || err.response.status === 403) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
                }
            );


    };

    render() {
        const { classes } = this.props;
        const {errors} = this.state;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter un métier</Typography>
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
