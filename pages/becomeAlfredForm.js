import React, {useEffect, useState} from 'react';
import Form from '../components/WizardForm/Form';
import Layout from "../hoc/Layout/Layout";
import Router from 'next/router';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const url = config.apiUrl;

const becomeAlfredForm = () => {
    const [alfred, setAlfred] = useState(false);
    useEffect(() => {
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token');
        if (token === null) {
            Router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios
                .get(url+'myAlfred/api/users/current')
                .then(res => {
                    let user = res.data;
                    setAlfred(user.is_alfred);


                })
                .catch(err =>
                    console.log(err)
                );


        }

    });



        return (
            <Layout>
                {alfred ?
                    <Grid container style={{marginTop: 70}}>Vous êtes déjà Alfred</Grid> :<Form/> }

            </Layout>
        )




};




export default becomeAlfredForm;
