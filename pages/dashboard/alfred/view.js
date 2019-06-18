import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const url = "https://myalfred.hausdivision.com/";
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
            super_alfred: '',
            alfred: {},
            active: false,
            super_alfred_now: null,
            is_active_now: null,
            is_alfred: ''

        };

        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { alfred_id: id }

    }
    componentDidMount() {
        const id = this.props.alfred_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${url}myAlfred/api/admin/users/alfred/${id}`)
            .then(response => {

                    let alfred = response.data;
                    this.setState({alfred: alfred, super_alfred_now: user.super_alfred, is_active_now: alfred.active});


            })
            .catch(err => {
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const { super_alfred, active, is_alfred } = this.state.alfred;
        const id = this.props.alfred_id;
        axios.put(`${url}myAlfred/api/admin/users/alfred/${id}`,{super_alfred,active,is_alfred})
            .then(res => {
                    alert('Utilisateur modifié avec succès');
                    Router.push({pathname: '/dashboard/alfred/all'})

            })
            .catch(err => {
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };

    handleClick() {
        const id = this.props.alfred_id;
        axios.delete(`${url}myAlfred/api/admin/users/alfred/${id}`)
            .then(res => {

                    alert('Utilisateur supprimé avec succès');
                    Router.push({pathname: '/dashboard/alfred/all'})

            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };


    render()  {
        const { classes } = this.props;
        const {alfred} = this.state;




        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{alfred.name} {alfred.firstname}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <label>
                                        Alfred ?:
                                        <input
                                            name="is_alfred"
                                            type="checkbox"
                                            checked={this.state.is_alfred}
                                            onChange={this.handleInputChange} />
                                    </label>

                                </Grid>
                                <Grid item>
                                    <label>
                                        Actif ?:
                                        <input
                                            name="active"
                                            type="checkbox"
                                            checked={this.state.active}
                                            onChange={this.handleInputChange} />
                                    </label>

                                </Grid>
                                <Grid item>
                                    <label>
                                        Super Alfred ?:
                                        <input
                                            name="super_alfred"
                                            type="checkbox"
                                            checked={this.state.super_alfred}
                                            onChange={this.handleInputChange} />
                                    </label>

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
