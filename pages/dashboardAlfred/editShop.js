import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import {Card} from "@material-ui/core";

moment.locale('fr');

const styles = theme => ({
    bigContainer: {
        marginTop: 100,
        flexGrow: 1,
    },
    card: {
        display: 'flex',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    item: {
        maxWidth: '30%'
    },
    item2 : {
        maxWidth: '45%'
    },
    card2: {
        display: 'flex',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }


});

const { config } = require('../../config/config');
const url = config.apiUrl;
class editShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            is_alfred: false


        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});



                if(user.is_alfred) {
                    this.setState({is_alfred: true})
                }

            })
            .catch(err => {
                    console.log(err);
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            );
    }


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {is_alfred} = this.state;
        const unauthorized = <h3>Accès refusé</h3>;


        return (

                <Layout>

                    <Grid container className={classes.bigContainer}>
                        {is_alfred ?
                            <Fragment>
                        <Grid container style={{alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <Grid item xs={4} className={classes.item} style={{marginRight: 15}} >
                                <Link href={'/dashboardAlfred/editPictureBanner'}>
                                  <Card className={classes.card}>


                                      <p>Modifier ma photo de bannière</p>

                                  </Card>
                                </Link>

                            </Grid>
                            <Grid item xs={4} className={classes.item} style={{marginRight: 15}}>
                                <Link href={'/dashboardAlfred/editWelcomeMessage'}>
                                    <Card className={classes.card}>
                                        <p>Modifier mon message d'accueil</p>
                                    </Card>
                                </Link>
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Link href={'/dashboardAlfred/editParameters'}>
                                    <Card className={classes.card}>
                                        <p>Modifier les paramètres de réservation</p>
                                    </Card>
                                </Link>
                            </Grid>

                        </Grid>

                        <Grid container style={{marginTop: 20,alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <Grid item xs={6} className={classes.item2} style={{marginRight: 15}}>
                                <Link href={'/dashboardAlfred/editStatus'}>
                                    <Card className={classes.card2}>
                                        <p>Modifier ma situation</p>
                                    </Card>
                                </Link>
                            </Grid>

                            <Grid item xs={6} className={classes.item2}>
                                <Link href={'/dashboardAlfred/services'}>
                                    <Card className={classes.card2}>
                                        <p>Mes services</p>
                                    </Card>
                                </Link>
                            </Grid>

                        </Grid>
                            </Fragment>: unauthorized}
                    </Grid>

                </Layout>

        );
    };
}

export default withStyles(styles)(editShop);
