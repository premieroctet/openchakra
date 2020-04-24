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
            admin: {},
            active: ''


        };

        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { admin_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.admin_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/users/admin/${id}`)
            .then(response => {
                let admin = response.data;
                this.setState({admin: admin});

            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            })

    }

    onChange = e => {
        const state = this.state.admin;
        state[e.target.name] = e.target.value;
        this.setState({admin:state});
    };

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
        const {active} = this.state;
        const { name,firstname,email,phone } = this.state.admin;
        const id = this.props.admin_id;
        axios.put(`/myAlfred/api/admin/users/admin/${id}`,{name,firstname,email,phone,active})
            .then(res => {

                alert('Admin modifié avec succès');
                Router.push({pathname:'/dashboard/admin/all'})
            })
            .catch(err => {
                console.log(err);

            })


    };

    handleClick() {
        const id = this.props.admin_id;
        axios.delete(`/myAlfred/api/admin/users/admin/${id}`)
            .then(res => {

                alert('Admin supprimée avec succès');
                Router.push({pathname:'/dashboard/billing/all'})
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };


    render()  {
        const { classes } = this.props;
        const {admin} = this.state;


        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{admin.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="name"
                                        value={admin.name}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="firstname"
                                        value={admin.firstname}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="email"
                                        value={admin.email}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="phone"
                                        value={admin.phone}
                                        onChange={this.onChange}

                                    />
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
