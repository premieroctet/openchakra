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
            super_alfred: false,
            alfred: {},
            active: false,
            is_alfred: false

        };

        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { alfred_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.alfred_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/users/alfred/${id}`)
            .then(response => {

                    let alfred = response.data;
                    this.setState({alfred: alfred, super_alfred: alfred.super_alfred, active: alfred.active, is_alfred: alfred.is_alfred});


            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
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

        const data = {is_alfred:this.state.is_alfred, active: this.state.active, super_alfred:this.state.super_alfred};
        const id = this.props.alfred_id;
        axios.put(`/myAlfred/api/admin/users/alfred/${id}`,data)
            .then(res => {
                    alert('Utilisateur modifié avec succès');
                    Router.push({pathname: '/dashboard/alfred/all'})

            })
            .catch(err => {
                console.error(err);
            })


    };

    handleClick() {
        const id = this.props.alfred_id;
        axios.delete(`/myAlfred/api/admin/users/alfred/${id}`)
            .then(res => {

                    alert('Utilisateur supprimé avec succès');
                    Router.push({pathname: '/dashboard/alfred/all'})

            })
            .catch(err => {
                console.error(err);

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
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.is_alfred}
                                                onChange={this.handleInputChange}
                                                value={this.state.is_alfred}
                                                color="primary"
                                                name={"is_alfred"}
                                            />
                                        }
                                        label="Alfred ?"
                                    />

                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.active}
                                                onChange={this.handleInputChange}
                                                value={this.state.active}
                                                color="primary"
                                                name={"active"}
                                            />
                                        }
                                        label="Actif ?"
                                    />

                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.super_alfred}
                                                onChange={this.handleInputChange}
                                                value={this.state.super_alfred}
                                                color="primary"
                                                name={"super_alfred"}
                                            />
                                        }
                                        label="Super Alfred ?"
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
