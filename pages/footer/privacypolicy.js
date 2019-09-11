import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Footer from '../../hoc/Layout/Footer/Footer';
import dynamic from 'next/dynamic';

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,
    },
});


class Privacypolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

 

    componentDidMount() {

    }




    render() {
        const {classes} = this.props;


        return (
            <Fragment>
                <Layout>
                   <Grid container style={{marginTop: '6%'}}>
                       <Grid item xs={3} style={{borderRight: '2px solid rgb(206, 206, 206)'}}>
                            <Grid container>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#4FBDD7', fontSize: '1.1rem'}}>Préambule</a>
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Définitions</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Les données & informations collectées</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Paiements & versements</a>
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Utilisation des données</a>
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Communication</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Droits relatifs aux données à caractère personnel</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Sécurité</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Modifications</a> 
                                </Grid>
                                <Grid item xs={12} style={{padding: '20px 50px'}}>
                                    <a href="#" style={{textDecoration: 'none', color: '#585858', fontSize: '1.1rem'}}>Politique de gestion des cookies</a> 
                                </Grid>
                            </Grid>
                       </Grid>
                       <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p style={{color: '#585858', fontSize: '1.35rem', paddingLeft: '25px', fontWeight: 'b'}}>Politique de confidentialité & gestion des cookies</p>
                                </Grid>
                            </Grid>
                       </Grid>
                   </Grid>
                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(Privacypolicy);
