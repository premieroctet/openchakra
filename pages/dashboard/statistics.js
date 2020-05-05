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
import HomeIcon from '@material-ui/icons/Home';


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

class statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getCounts=this.getCounts.bind(this);
    }

    getCounts() {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get("/myAlfred/api/admin/statistics")
            .then((response) => { this.setState(response.data)})
            .catch((error) => { console.log(error);
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
        setInterval(()=> this.getCounts(), 30000);
    }


    render() {
        const { classes } = this.props;
        const list =
                    <Grid rows={[1,2]}>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '0%' }} >
                            <Typography style={{ fontSize: 30 }}>Inscrits</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }} >
                            <Avatar className={classes.mediumAvatar}>{ this.state.users}</Avatar>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop:'5%' }} >
                            <Typography style={{ fontSize: 30 }}>Alfred</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }} >
                            <Avatar className={classes.mediumAvatar}>{ this.state.alfred}</Avatar>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop:'5%' }}>
                            <Typography style={{ fontSize: 30 }}>Services</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar className={classes.mediumAvatar}>{ this.state.services}</Avatar>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop:'5%' }}>
                            <Typography style={{ fontSize: 30 }}>Prestations</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar className={classes.mediumAvatar}>{ this.state.prestations}</Avatar>
                        </Grid>
                    </Grid>;
        const refused = <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography style={{ fontSize: 30 }}>Accès refusé</Typography>
        </Grid>;

        return (
            <Layout>
                <Grid container style={{marginTop: 70}}>
                    <Link href={'/dashboard/home'}>
                        <Typography  className="retour"><HomeIcon className="retour2"/> <span>Retour</span></Typography>
                    </Link>
                </Grid>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                            {this.state.is_admin ? list : refused}
                    </Card>
                </Grid>
            </Layout>

        );
    };
}

export default withStyles(styles)(statistics);
