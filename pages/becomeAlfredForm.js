import React, {useEffect, useState} from 'react';
import Form from '../components/WizardForm/Form';
import Layout from "../hoc/Layout/Layout";
import Router from 'next/router';

const becomeAlfredForm = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            Router.push('/login');
        }
    });



        return (
            <Layout>
                <Form/>
            </Layout>
        )




};




export default becomeAlfredForm;
