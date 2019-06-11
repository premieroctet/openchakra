import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";


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

class addPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newPhone = {
            phone: this.state.phone,

        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put('http://localhost:5000/myAlfred/api/users/profile/phone', newPhone)
            .then(res => {
                alert('Téléphone ajouté');
                Router.push({pathname:'/profile'})
            })
            .catch(err =>
                console.log(err)
            );


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter un numéro de téléphone</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Numéro de téléphone"
                                        placeholder="Numéro de téléphone"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="phone"
                                        value={this.state.address}
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

export default withStyles(styles)(addPhone);
