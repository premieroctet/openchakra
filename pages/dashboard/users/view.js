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
            user: {},
            active: false,


        };

        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { user_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.user_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/users/users/${id}`)
            .then(response => {
                let user = response.data;
                this.setState({user: user, active: user.active});

            })
            .catch(err => {
                console.log(err);
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

        const data = {active: this.state.active};
        const id = this.props.user_id;
        axios.put(`/myAlfred/api/admin/users/users/${id}`,data)
            .then(res => {
                alert('Utilisateur modifié avec succès');
                Router.push({pathname:'/dashboard/users/all'})
            })
            .catch(err => {
                console.log(err);
            })
    };

    handleClick() {
        const id = this.props.user_id;
        axios.delete(`/myAlfred/api/admin/users/users/${id}`)
            .then(res => {

                alert('Utilisateur supprimé avec succès');
                Router.push({pathname:'/dashboard/users/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };


    render()  {
        const { classes } = this.props;
        const {user} = this.state;




        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{user.name} {user.firstname}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
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
