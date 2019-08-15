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





moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,
    },


});

class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            serviceUser: [],

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
            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

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
            })
            .catch(err =>
                console.log(err)
            );
    }



    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {shop} = this.state;
        const {serviceUser} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        {/*Le Header */}
                        <Grid container style={{backgroundImage: "url('../static/shopBanner/sky-690293_1920.jpg')",height:'54vh',
                            backgroundSize:"cover",justifyContent:"center",alignItems:"center",marginRight: "1%",marginLeft: "1%",}}>

                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'98%',zIndex:500,height:'54vh',marginRight: "1%",marginLeft: "1%"}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'20%',left:'46.5%',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px',}} alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'46.2%',top:'38%',zIndex:502,textAlign: 'center'}}>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.35rem'}}>Plomberie</p>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.1rem'}}>par Maelys (4kms)</p>
                        </Grid>

                        {/*Le Contenu */}
                        <Grid container>
                        
                        {/*Contenu à Gauche*/}

                            {/*Petite Description*/}
                            <Grid item xs={6} style={{textAlign: 'left',margin: '0 auto',}}>
                                <div style={{margin: '20px 11%', marginTop: '5%',width: '75%'}}></div>
                                <Typography style={{padding: '0 90px',fontSize: '1rem' }}>
                                    Plombière depuis plus de 10 ans, je vous propose mes services de plomberie à domicile pour 
                                    partager ma passion pour la plomberie . 
                                    J’ai également suivi une formation de soudure, me permettant de vous conseiller au mieux !
                                </Typography>

                                {/*Mes équipements*/}
                                <div style={{marginTop: '8%'}}>
                                    <h3 style={{padding: '0 90px',color: '#07BCE5' }}>
                                        Je fournis :
                                    </h3>
                                    <Grid container>
                                        <Grid item xs={1} style={{}}></Grid>
                                        <Grid item xs={1} style={{cursor: 'pointer', marginLeft: '3.5%'}}><img src="../../static/equipments/RaccordsJoints.svg"/></Grid>
                                        <Grid item xs={1} style={{cursor: 'pointer', marginLeft: '1.5%'}}><img src="../../static/equipments/RaccordsJointsSelected.svg"/></Grid>
                                        <Grid item xs={1} style={{cursor: 'pointer', marginLeft: '1.5%'}}><img src="../../static/equipments/RaccordsJoints.svg"/></Grid>
                                        <Grid item xs={1} style={{cursor: 'pointer', marginLeft: '1.5%'}}><img src="../../static/equipments/RaccordsJointsSelected.svg"/></Grid>
                                        <Grid item xs={1} style={{cursor: 'pointer', marginLeft: '1.5%'}}><img src="../../static/equipments/RaccordsJoints.svg"/></Grid>
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </div>

                                <div style={{marginTop: '8%'}}>
                                    <h3 style={{padding: '0 90px',color: '#07BCE5' }}>
                                        Disponibilité :
                                    </h3>
                                    <Grid container>
                                        <Grid item xs={1} style={{}}></Grid>
                                        <Grid item xs={6} style={{ marginLeft: '3.5%'}}><img src="../../static/falsecalendar.png"/></Grid>
                                        
                                    </Grid>
                                </div>

                                {/*cadre avec couleur et checkbox*/}
                                <div style={{marginTop: '8%', marginBottom: '8%'}}>
                                    <h3 style={{padding: '0 90px',color: '#07BCE5' }}>
                                        Conditions d'annulation :
                                    </h3>
                                    <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={1} style={{height: '150px',maxWidth: '30px!important',borderTop: '4px solid #018489', position:'relative'}}>

                                        </Grid>
                                        <Grid item xs={3} style={{height: '150px',minWidth: '190px!important',borderLeft: '2px solid #018489', borderTop: '4px solid #018489', borderRight: '2px solid #B2DADB', position:'relative'}}>
                                            <img style={{position:"absolute",left:'-5.9%',top:'-8%',zIndex:502,textAlign: 'center'}} src="../../static/checkboxes/roundBlue.png" width={'11%'}/>
                                            <img style={{position:"absolute",left:'95.1%',top:'-8%',zIndex:502,textAlign: 'center'}} src="../../static/checkboxes/roundSkyblue.png" width={'11%'}/>
                                            <Typography style={{textAlign: 'center', fontSize: '1rem',padding: '5%'}}>
                                                Remboursement intégral
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={3} style={{height: '150px',minWidth: '190px!important', borderTop: '4px solid #B2DADB',borderRight: '2px solid #FFB400', position:'relative' }}>
                                            <img style={{position:"absolute",left:'95.1%',top:'-8%',zIndex:502,textAlign: 'center'}} src="../../static/checkboxes/roundYellow.png" width={'11%'}/>
                                            <Typography style={{textAlign: 'center', fontSize: '1rem',padding: '5%'}}>
                                                Remboursement intégral, moins les frais de dossier
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} style={{height: '150px',minWidth: '190px!important', borderTop: '4px solid #FFB400',borderRight: '2px solid #FF5B5E', position:'relative' }}>
                                            <img style={{position:"absolute",left:'94.9%',top:'-8%',zIndex:502,textAlign: 'center'}} src="../../static/checkboxes/roundRedFull.png" width={'11%'}/>
                                            <Typography style={{textAlign: 'center', fontSize: '1rem',padding: '5%'}}>
                                                Remboursement à hauteur de 50%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} style={{height: '150px',maxWidth: '30px!important',borderTop: '4px solid #FF5B5E',}}></Grid>
                                    </Grid>
                                </div>

                                {/*Map Perimeters*/}
                                <div style={{marginTop: '8%', marginBottom: '8%'}}>
                                    <h3 style={{padding: '0 90px',color: '#07BCE5' }}>
                                        Mon périmètre d'intervention :
                                    </h3>
                                    <Grid container>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={6}>
                                            <img width="450" height="325" src="../../static/perimetersfalse.png" />
                                            <Typography>15 Kms à partir de l'adresse principale</Typography>
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            {/*Contenu à droite*/}
                            <Grid item xs={6} style={{textAlign: 'center'}}>
                                Contenu Droit
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(services);
