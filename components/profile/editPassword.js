import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import axios from "axios";

const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
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

class editPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            password: '',
            newPassword: ''


        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});


            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {password: this.state.password, newPassword: this.state.newPassword};
        axios
            .put(url+'myAlfred/api/users/profile/editPassword', data)
            .then(res => {
                alert('Mot de passe modifié');
                Router.push({pathname:'/profile'})
            })
            .catch(err =>
                console.log(err)
            );


    };

    render() {
        const { classes } = this.props;



        return (
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 15 }}>Modifier mon mot de passe</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        label={"Mot de passe actuel"}
                                        placeholder={"Mot de passe actuel"}
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        label={"Nouveau mot de passe"}
                                        placeholder={"Nouveau mot de passe"}
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.onChange}
                                    />
                                </Grid>

                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>


        );
    };
}

export default withStyles(styles)(editPassword);
