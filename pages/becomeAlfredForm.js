import React, {useEffect, useState} from 'react';
import Form from '../components/WizardForm/Form';
import Layout from "../hoc/Layout/Layout";
import Router from 'next/router';
import Grid from "@material-ui/core/Grid";
const jwt = require('jsonwebtoken');

const becomeAlfredForm = () => {
    const [alfred, setAlfred] = useState(false);
    useEffect(() => {
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token');
        if (token === null) {
            Router.push('/login');
        } else {
            const token2 = localStorage.getItem('token').split(' ')[1];
            const decode = jwt.decode(token2);

            setAlfred(decode.is_alfred);
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
