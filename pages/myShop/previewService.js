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
                                            <img style={{position:"absolute",left:'-5.9%',top:'-8%',zIndex:502,textAlign: 'center'}} src="../../static/checkboxes/roundBlueChecked.png" width={'11%'}/>
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

                                {/*Commentaires*/}
                                <div style={{marginTop: '8%', marginBottom: '8%'}}>
                                    <h3 style={{padding: '0 90px',color: '#07BCE5' }}>
                                        77 Commentaires 
                                        <span style={{marginLeft: '2%'}}>
                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                            <img width="12px" src="../../static/stars/starhalf.svg"/>
                                        </span>
                                    </h3>
                                    <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={4} style={{textAlign: 'left!important'}}>
                                            <hr style={{marginLeft: '6.5%',}}/>
                                            <h4 style={{padding: '0 20px' }}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        Accueil 
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <span style={{marginLeft: '2%'}}>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="12px" src="../../static/stars/starhalf.svg"/>
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </h4>
                                            <h4 style={{padding: '0 20px'}}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        Qualité / Prix 
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <span style={{marginLeft: '2%'}}>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="12px" src="../../static/stars/starhalf.svg"/>
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </h4>
                                            <h4 style={{padding: '0 20px' }}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        Communication 
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <span style={{marginLeft: '2%'}}>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="13px" src="../../static/stars/starfull.svg"/>
                                                            <img width="12px" src="../../static/stars/starhalf.svg"/>
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </h4>
                                            <hr style={{marginLeft: '6.5%',}}/>

                                        </Grid>
                                            <Grid container style={{marginLeft:'3%',marginTop: '2%'}}>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={2}>
                                                    <Typography style={{fontWeight: 'bold', fontSize:'1rem'}}>Jean-Pierre</Typography>
                                                    <img style={{borderRadius: '50%',}} width="70px" height="70px" src="../../static/proposeservice.jpg"/>
                                                </Grid>
                                                <Grid item xs={8} style={{padding:'4.5% 2%',marginLeft: '-6%'}}>
                                                    <Typography style={{fontStyle: 'italic'}}>Commentaire qui est assez incroyable en réalité car il est très complexe pour absolument aucune raison</Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container style={{marginLeft:'3%',marginTop: '2%'}}>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={2}>
                                                    <Typography style={{fontWeight: 'bold', fontSize:'1rem'}}>Romain</Typography>
                                                    <img style={{borderRadius: '50%',}} width="70px" height="70px" src="../../static/monika-grabkowska-759473-unsplash.jpg"/>
                                                </Grid>
                                                <Grid item xs={8} style={{padding:'4.5% 2%',marginLeft: '-6%'}}>
                                                    <Typography style={{fontStyle: 'italic'}}>Commentaire incroyable pour la deuxième fois consécutive</Typography>
                                                </Grid>
                                            </Grid>

                                        
                                        <Grid item xs={7}></Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            {/*Contenu à droite*/}
                            <Grid item xs={5} style={{marginTop: '2%'}}>
                                <Grid container style={{border: 'thin solid #dedede',maxWidth: '80%',marginLeft:'14%'}}>
                                    <Grid item xs={12}><Typography style={{marginTop: '4%' ,marginBottom: '1%' ,marginLeft: '4%' ,color: 'gray', fontSize:'0.9rem'}}>Type de prestation</Typography></Grid>
                                    
                                    
                                    {/*FEMME*/}
                                    <Grid item xs={12} style={{marginBottom: '2%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>
                                            <span style={{marginRight: '2%'}}>
                                                <img width="13px" src="../../static/stars/arrowDown.png"/>
                                            </span>                                            
                                            Coiffure Femme
                                        </Typography>
                                    </Grid>

                                    
                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            5€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            / prestation
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Shampoing</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            5€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            / prestation
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Soin Profond</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Couleur (racines)</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                           
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                           
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Couleur complète</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                           
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                           
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Tie and dye</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                           
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                           
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Coupe Classique</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}></Grid><Grid item xs={8}><hr style={{marginTop:'8%', backgroundColor:'#dedede', border: '1px solid transparent'}} ></hr></Grid><Grid item xs={2}></Grid>

                                    {/*HOMME*/}
                                    <Grid item xs={12} style={{marginBottom: '2%', marginTop:'7%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>
                                            <span style={{marginRight: '2%'}}>
                                                <img width="13px" src="../../static/stars/arrowDown.png"/>
                                            </span>                                            
                                            Coiffure Homme
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Shampoing</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Soin Profond</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            5€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                            / prestation
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Shampoing</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            5€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.5rem"}}>
                                                           / prestation
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                            <Typography>Shampoing</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} style={{height:'30px', marginTop: '10%', backgroundColor:'#4FBDD7', cursor: 'pointer', textAlign: 'center',}}>
                                        <Typography style={{color:'white',marginTop:'4px'}}>options</Typography>
                                        
                                    </Grid>

                                    <Grid item xs={2}></Grid><Grid item xs={8}><hr style={{marginTop:'8%', backgroundColor:'#dedede', border: '1px solid transparent'}} ></hr></Grid><Grid item xs={2}></Grid>

                                    <Grid item xs={12} style={{marginBottom: '2%', marginTop:'7%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>Conditions de réservation</Typography>
                                        <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={1}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 67.193 51.687">
                                                <g id="Groupe_1031" data-name="Groupe 1031" transform="translate(0 20)">
                                                    <path id="Tracé_10836" data-name="Tracé 10836" d="M22.064-3l-.72.269-.631.358-.542.454-.539.539-.362.723-.181.72L19,.876l.089.72.181.72.362.723.539.539.542.454.631.358.72.269.812.092.812-.092.72-.269.631-.358.539-.454.542-.539.362-.723.181-.72.089-.72L26.662.064l-.181-.72-.362-.723-.542-.539-.539-.454-.631-.358L23.688-3Z" transform="translate(30.105 26.936)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10837" data-name="Tracé 10837" d="M10.063-3l-.719.269-.631.358-.542.454-.539.539-.361.723L7.09.064,7,.876l.089.72.181.72.361.723.539.539.542.454.631.358.719.269.811.092.811-.092.719-.269.631-.358.542-.454.539-.539.361-.723.181-.72.089-.72L14.659.064l-.181-.72-.361-.723-.539-.539-.542-.454L12.4-2.729,11.686-3Z" transform="translate(11.093 26.936)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10838" data-name="Tracé 10838" d="M60.269-7.574l.372.088.28.181.188.269.1.361-.1.361L53.621,9.709l-.184.269-.188.092-.188.181h-.28l-.376-.092-.28-.181-.188-.358-.1-.273.1-.358L59.426-7.036l.188-.358.28-.181Zm-8.05-.361.376.092.375.088.184.269.1.361v.361L48.287,10.071l-.092.269-.28.269-.188.092-.376.088-.188-.088-.372-.092L46.6,10.34l-.1-.361V9.621L51.471-7.213l.188-.361.184-.269ZM44.543-8.2l.376.088.28.273.1.269.092.361L42.953,10.52l-.092.269-.188.269-.28.181-.376.092h-.092l-.376-.181-.28-.181-.188-.361v-.358L43.517-7.394l.092-.361.28-.269.284-.181ZM36.5-8.566l.375.092.28.177.188.273.092.358.188,18.548-.092.358-.188.361-.28.181-.375.088-.376-.088-.28-.181-.188-.361-.092-.269L35.562-7.667l.092-.269.188-.361.28-.177Zm-7.675-.269.376.181.188.269.092.361,2.717,19.355v.358l-.188.273-.284.269-.28.088h-.467l-.28-.177-.188-.273L30.32,11.6,27.7-7.844V-8.2l.188-.269.188-.273.376-.088ZM20.867-9.1l.284.088.28.269.188.273,5.238,20.255v.361l-.092.269-.28.269-.376.181h-.467l-.28-.181-.188-.181-.188-.269L19.745-8.024v-.361l.1-.361.28-.177L20.5-9.1ZM1.5-20l-.376.092-.28.181-.28.181-.284.269L.1-18.916l-.1.269v.811l.1.269.184.361.284.269.28.181.28.181.376.088.376.088H12.821L20.308,14.21l-3,7.2-.092.45v.45l.092.361.188.45.1.092.839-.542.843-.361.935-.269H21.9l.655.088.563.181.559.181.563.269.467.361.467.361.467.45H49.505l.467-.45.467-.361.467-.361.563-.269.559-.181.563-.181.655-.088h1.59l.935.269.843.273.747.538.188-.538.1-.453v-.45l-.1-.269-.188-.361-.28-.269L56.8,20.6l-.28-.181-.376-.088H21.806l1.59-3.782.559.092h.655l28.45-2.521.655-.092.655-.269.559-.269.655-.361.563-.361.467-.45.375-.538.372-.542L66.913-8.385l.184-.538.1-.453-.1-.45L67-10.276l-.28-.269-.467-.269L65.786-11l-.559-.092L17.6-12.617l-1.406-6.03-.28-.542-.376-.45-.559-.269L14.319-20Z" fill="#07bce5" fill-rule="evenodd"/>
                                                </g>
                                            </svg>
                                        </Grid>
                                        <Grid item xs={10}><Typography>Panier minimum : 50€</Typography></Grid>

                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={1}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 54 51.75">
                                                <g id="Groupe_1030" data-name="Groupe 1030" transform="translate(0 23)">
                                                    <path id="Tracé_10816" data-name="Tracé 10816" d="M10.391-20.609l.573.164.573.325.409.328.409.492.248.489.161.573.084.656-.084.573-.161.569-.248.492-.409.492-.409.325-.573.328-.573.164-.573.08-.573-.08L8.673-14.8,8.1-15.131l-.409-.325-.409-.492-.245-.492-.164-.569-.08-.573.08-.656.164-.573.245-.489.409-.492L8.1-20.12l.573-.325.573-.164Zm34.363,0,.573.164.573.325.409.328.409.492.245.489.164.573.084.656-.084.573-.164.569-.245.492-.409.492-.409.325-.573.328-.573.164-.573.08-.573-.08-.573-.164-.573-.328-.409-.325-.409-.492L41.4-16.44l-.164-.569-.084-.573.084-.656.164-.573.245-.489.409-.492.409-.328.573-.325.573-.164ZM0-22v8.993H54V-22Z" transform="translate(0 1.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10817" data-name="Tracé 10817" d="M0-2V-.271L.084.335l.164.52.245.432.245.432.409.347.492.258.489.173H51.873l.489-.173.492-.258.409-.347.245-.432.245-.432.164-.52L54-.271V-2l-.084.605-.164.517-.245.432-.245.432-.409.347-.492.258-.489.173H2.127L1.638.593,1.146.335.737-.012.492-.444.248-.876.084-1.393Z" transform="translate(0 26.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10818" data-name="Tracé 10818" d="M4.5-23l-.376.174-.28.085-.28.262-.28.259-.1.259L3-21.615v6.229l.188.347.1.259.28.259.28.262.28.085L4.5-14H6l.372-.174.284-.085.28-.262.28-.259.1-.259.188-.347v-6.229l-.188-.347-.1-.259-.28-.259-.28-.262-.284-.085L6-23Z" transform="translate(3.75)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10819" data-name="Tracé 10819" d="M19.5-23l-.376.174-.28.085-.284.262-.28.259-.092.259L18-21.615v6.229l.188.347.092.259.28.259.284.262.28.085L19.5-14H21l.376-.174.28-.085.284-.262.28-.259.092-.259.188-.347v-6.229l-.188-.347-.092-.259-.28-.259-.284-.262-.28-.085L21-23Z" transform="translate(22.502)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10820" data-name="Tracé 10820" d="M7-11v8.992h6.747V-11Z" transform="translate(8.75 15.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10821" data-name="Tracé 10821" d="M7-14v6.743h6.747V-14Z" transform="translate(8.75 11.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10822" data-name="Tracé 10822" d="M7-7V-.255h6.747V-7Z" transform="translate(8.75 20.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10823" data-name="Tracé 10823" d="M10-7V-.255h6.743V-7Z" transform="translate(12.502 20.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10824" data-name="Tracé 10824" d="M3-11v8.992H9.748V-11Z" transform="translate(3.752 15.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10825" data-name="Tracé 10825" d="M3-7V-.255H9.748V-7Z" transform="translate(3.752 20.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10826" data-name="Tracé 10826" d="M3-14v6.743H9.748V-14Z" transform="translate(3.752 11.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10827" data-name="Tracé 10827" d="M10-11v8.992h6.743V-11Z" transform="translate(12.502 15.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10828" data-name="Tracé 10828" d="M48.352-12.168l.248.162.164.323.08.32V13.442l-.08.32-.164.244-.248.158-.325.082H5.973l-.325-.082L5.4,14.006l-.161-.244-.084-.32V-11.363l.084-.32.161-.323.248-.162ZM0-17V17.066l.084.32.164.323.245.323.245.32.409.244.492.241L2.127,19H51.873l.489-.162.492-.241.409-.323.245-.4.245-.4.164-.485L54,16.42V-17Z" transform="translate(0 7.502)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10829" data-name="Tracé 10829" d="M18-7V-.255h6.75V-7Z" transform="translate(22.5 20.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10830" data-name="Tracé 10830" d="M18-11v8.992h6.75V-11Z" transform="translate(22.5 15.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10831" data-name="Tracé 10831" d="M18-14v6.743h6.75V-14Z" transform="translate(22.5 11.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10832" data-name="Tracé 10832" d="M14-7V-.255h6.747V-7Z" transform="translate(17.502 20.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10833" data-name="Tracé 10833" d="M10-14v6.743h6.743V-14Z" transform="translate(12.502 11.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10834" data-name="Tracé 10834" d="M14-11v8.992h6.747V-11Z" transform="translate(17.502 15.002)" fill="#07bce5" fill-rule="evenodd"/>
                                                    <path id="Tracé_10835" data-name="Tracé 10835" d="M14-14v6.743h6.747V-14Z" transform="translate(17.502 11.252)" fill="#07bce5" fill-rule="evenodd"/>
                                                </g>
                                            </svg>
                                        </Grid>
                                        <Grid item xs={8}><Typography>3 Jours de délai de prévenance</Typography></Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(services);
