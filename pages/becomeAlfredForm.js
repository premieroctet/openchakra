import React, {useEffect, useState} from 'react';
import Form from '../components/WizardForm/Form';
import Layout from "../hoc/Layout/Layout";
import Router from 'next/router';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {Helmet} from 'react-helmet';

const jwt = require('jsonwebtoken');

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
                .get('/myAlfred/api/users/current')
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
	<Helmet>
        <title>Devenez Alfred et proposez vos services sur My Alfred </title>
        <meta property="description" content="Rejoignez la communauté My Alfred pour proposer des services entre particuliers à proximité. Proposez vos services et bénéficiez d'une visibilité auprès de milliers d'utilisateurs à proximité ! Chaque Alfred dispose d'une boutique de services qui lui est propre, pourquoi pas vous ?" />
      </Helmet>
                {alfred ?
                    <Grid container style={{marginTop: 70}}>Vous êtes déjà Alfred</Grid> :<Form/> }

            </Layout>
        )




};




export default becomeAlfredForm;
