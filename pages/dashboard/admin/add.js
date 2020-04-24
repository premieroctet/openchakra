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
import FormHelperText from "@material-ui/core/FormHelperText";

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
    datenaissance: {
        marginTop: 20
    }
});

class add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            email: '',
            password: '',
            birtday: '',
            phone: '',
            password2: '',
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

        const newAdmin = {
            firstname: this.state.firstname,
            name: this.state.name,
            birthday: this.state.birthday,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            password2: this.state.password2


        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .post('/myAlfred/api/admin/users/admin', newAdmin)
            .then(res => {
                alert('Administrateur ajouté');
                Router.push({pathname:'/dashboard/admin/all'})


            })
            .catch(err => {
                    console.log(err);
                    this.setState({errors: err.response.data});
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
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
                                <Typography style={{ fontSize: 30 }}>Ajouter un admin</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Nom"
                                        placeholder="Nom"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <em>{errors.name}</em>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Prénom"
                                        placeholder="Prénom"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.onChange}
                                        error={errors.firstname}

                                    />
                                    <em>{errors.firstname}</em>
                                </Grid>
                                <Grid item className={classes.datenaissance}>
                                    <TextField
                                        id="date"
                                        label="Date de naissance"
                                        type="date"
                                        name="birthday"
                                        className={classes.textField}
                                        value={this.state.birthday}
                                        onChange={this.onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <FormHelperText>Date de naissance</FormHelperText>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Téléphone"
                                        placeholder="Téléphone"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.onChange}
                                        error={errors.phone}

                                    />
                                    <em>{errors.phone}</em>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}

                                    />
                                    <em>{errors.email}</em>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Mot de passe"
                                        placeholder="Mot de passe (8 charactères min)"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}

                                    />
                                    <em>{errors.password}</em>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Répéter mot de passe"
                                        placeholder="Mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        error={errors.password2}

                                    />
                                    <em>{errors.password2}</em>
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
