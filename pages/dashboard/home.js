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
import { CSVLink} from "react-csv";
import cookie from 'react-cookies'


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
});

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_admin: '',
            shopsData: [],
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const auth = cookie.load('token')
        if(!auth) {
            Router.push('/login')
        } else {
            const token = auth.split(' ')[1];
            const decode = jwt.decode(token);
            this.setState({is_admin: decode.is_admin});
        }
        axios.defaults.headers.common['Authorization'] = auth
        axios.get("/myAlfred/api/admin/shops/extract")
          .then (res => this.setState({shopsData: res.data}))
          .catch (err => console.error(err));
    }

    render() {
        const { classes } = this.props;
        const admin= this.state.is_admin;

        return (
          <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            {admin ?
                              <Grid>
                                  <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                      <Typography style={{ fontSize: 30 }}>Maintenance</Typography>
                                  </Grid>
                                  <Link href="/dashboard/logAsUser"><a>Connexion en tant qu'autre utilisateur</a></Link><br/>
                                  <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                      <Typography style={{ fontSize: 30 }}>Moniteur</Typography>
                                  </Grid>
                                  <Link href="/dashboard/statistics"><a>Statistiques</a></Link><br/>
                                  <Link href="/dashboard/map"><a>Carte des services</a></Link><br/>
                                  <Link href="/dashboard/bookings"><a>Réservations</a></Link><br/>
                                  <Link href="/dashboard/prospect"><a>Prospection</a></Link><br/>
                                  <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                      <Typography style={{ fontSize: 30 }}>Base de données</Typography>
                                  </Grid>
                                  <Link href="/dashboard/category/all"><a>Catégories</a></Link><br/>
                                  <Link href="/dashboard/billing/all"><a>Méthodes de facturation</a></Link><br/>
                                  <Link href="/dashboard/calculating/all"><a>Méthodes de calcul</a></Link><br/>
                                  <Link href="/dashboard/filterPresentation/all"><a>Filtres de présentation</a></Link><br/>
                                  <Link href="/dashboard/job/all"><a>Métiers</a></Link><br/>
                                  <Link href="/dashboard/searchFilter/all"><a>Filtres de recherche</a></Link><br/>
                                  <Link href="/dashboard/tags/all"><a>Tags</a></Link><br/>
                                  <Link href="/dashboard/equipments/all"><a>Equipements</a></Link><br/>
                                  <Link href="/dashboard/shopBanner/all"><a>Photos bannière shop</a></Link><br/>
                                  <Link href="/dashboard/services/all"><a>Services</a></Link><br/>
                                  <Link href="/dashboard/prestations/all"><a>Prestations</a></Link><br/>
                                  <Link href="/dashboard/options/all"><a>Options</a></Link><br/>
                                  <Link href="/dashboard/users/all"><a>Utilisateurs</a></Link><br/>
                                  <Link href="/dashboard/alfred/all"><a>Alfred</a></Link><br/>
                                  <Link href="/dashboard/admin/all"><a>Administrateurs</a></Link><br/>
                                  <CSVLink asyncOnClick={true} data={this.state.shopsData} filename="shops.csv" separator={";"} target="_blank">Export boutiques</CSVLink>
                                  <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                      <Typography style={{ fontSize: 30 }}>Fonctions DEV</Typography>
                                  </Grid>
                                  <Link href="/dashboard/dev/api_calls"><a>Appels API</a></Link><br/>
                              </Grid>
                              :
                              <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                  <Typography style={{ fontSize: 30 }}>Accès refusé</Typography>
                              </Grid>
                            }

                        </Grid>
                    </Card>
                </Grid>
                </Layout>
        );
    };
}

export default withStyles(styles)(home);
