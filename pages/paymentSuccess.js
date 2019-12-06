import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Footer from '../hoc/Layout/Footer/Footer';
import {toast} from 'react-toastify';



const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,

    },

});

class paymentSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},

        };

    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        const amount = parseInt(localStorage.getItem('amount'));
        const fees = parseInt(localStorage.getItem('fees'));

        const data = {
            amount: amount,
            fees: fees
        };
        axios.post(url+'myAlfred/api/payment/transfer',data)
            .then(() => {
                toast.info('Paiement réussi')
            })
            .catch(() => {
                toast.error('Une erreur est survenue lors du paiement')
            })


    }




    render() {
        const {classes} = this.props;



        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid container style={{minHeight: '530px'}}>
                            <h2>Paiement réussi</h2>

                        </Grid>



                    </Grid>
                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(paymentSuccess);
