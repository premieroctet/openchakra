import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
const {config} = require('../../config/config');
const url = config.apiUrl;


const jwt = require('jsonwebtoken');
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
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
  mediumAvatar: {
    width: 100,
    height: 100,
    marginTop: -10,
    fontSize: 50,
  },
  bigAvatar: {
    width: 200,
    height: 200,
    marginTop: -10,
    fontSize: 100,
  },

});

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users_count: 0,
            alfred_count: 0,
        }
        setInterval(()=> this.getCounts(), 5000);
        this.getCounts=this.getCounts.bind(this);
    }

    getCounts() {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+"myAlfred/api/admin/users/all")
            .then((response) => { this.setState({user_count: response.data.length}) })
            .catch((error) => { console.log(error);
            if(error.response.status === 401 || error.response.status === 403) {
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            }
        });

        axios.get(url+"myAlfred/api/admin/users/alfred")
            .then((response) => { this.setState({alfred_count: response.data.length}) })
            .catch((error) => {
             console.log(error);
             if(error.response.status === 401 || error.response.status === 403) {
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            }
          });

    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const auth = localStorage.getItem('token');
        if(auth === null) {
            Router.push('/login')
        } else {
            const token = localStorage.getItem('token').split(' ')[1];
            const decode = jwt.decode(token);
            this.setState({is_admin: decode.is_admin});
        }
        this.getCounts();
    }


    render() {
        const { classes } = this.props;
        const list =
                    <Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                            <Typography style={{ fontSize: 30 }}>Inscrits</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar className={classes.mediumAvatar}>{ this.state.user_count}</Avatar>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop:'20%' }}>
                            <Typography style={{ fontSize: 30 }}>Alfred</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar className={classes.bigAvatar}>{ this.state.alfred_count}</Avatar>
                        </Grid>
                    </Grid>;
        const refused = <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography style={{ fontSize: 30 }}>Accès refusé</Typography>
        </Grid>;

        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            {this.state.is_admin ? list : refused}

                        </Grid>
                    </Card>
                </Grid>
            </Layout>

        );
    };
}

export default withStyles(styles)(home);
