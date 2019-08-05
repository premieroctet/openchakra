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
import Link from 'next/link';


const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',
        marginTop: 150,

    },

});

class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: {},
            serviceUser: [],



        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop});



            })
            .catch(err =>
                console.log(err)
            );

        axios
            .get(url+'myAlfred/api/serviceUser/currentAlfred')
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser});
                /*serviceUser.forEach(e => {
                    console.log(e.perimeter);
                })*/


            })
            .catch(err =>
                console.log(err)
            );
    }



    render() {
        const { classes } = this.props;
        const {serviceUser} = this.state;

        const data = serviceUser.map(e => (
            <div key={e}><a href={"detailsService?id="+e._id}> {e.service.label}</a></div>
            ));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    {data}
                </Grid>
                <Grid container>
                    <Link href={'/dashboardAlfred/addService'}>
                    <Button type="button" variant="contained" color="primary" style={{ width: '100%',color:'white' }}>
                        Ajouter un service
                    </Button>
                    </Link>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(services);
