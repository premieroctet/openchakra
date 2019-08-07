import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';





moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
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
                        <Grid container justify="center" style={{backgroundColor: '#4fbdd7',border: '0.2px solid #707070'}}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white"}}>Ma boutique</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white"}}>Message</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white"}}>Mes réservations</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white"}}>Mon calendrier</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white"}}>Performance</p>
                            </Grid>

                        </Grid>
                        <Grid container style={{backgroundImage: "url('../static/shopBanner/maldives-1993704_1920.jpg')",height:'84vh',
                            backgroundSize:"cover",justifyContent:"center",alignItems:"center"}}>



                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'84vh',top:118}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'45%',left:'45%',zIndex:501}} width={'12%'} alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'3%',top:'18%',zIndex:502}}>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.15rem'}}>Modifier</p>
                        </Grid>
                        <Grid item style={{position:"absolute",right:'3%',top:'18%',zIndex:502}}>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.15rem'}}>Aperçu de ma boutique</p>
                        </Grid>

                        <Grid container style={{backgroundColor: '#E5E5E5', height:40,marginTop:4}}>
                        </Grid>

                        <Grid container style={{marginTop: 20}}>
                            <Grid item xs={8}>
                                <Grid container>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <h2 style={{color:'#2FBCD3',fontWeight: '100'}}> Mes services</h2>
                                        <br/>
                                        <hr style={{borderWidth: 1,
                                            width: '44%',
                                            marginTop: -24,
                                            borderColor: 'black'}}/>
                                            <br/>
                                        <div style={{width: 0,
                                            height: 0,
                                            borderLeft: '15px solid transparent',
                                            borderRight: '15px solid transparent',
                                            borderTop: '15px solid gray',margin: '0 auto',marginTop:-26}}>

                                        </div>
                                    </Grid>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <h2 style={{color:'#2FBCD3',fontWeight: '100'}}> Mes paramètres de réservation</h2>
                                    </Grid>
                                </Grid>
                                {serviceUser.map((e,index)=> (
                                    <React.Fragment>
                                        <Grid key={index} container style={{paddingLeft: 100}}>
                                            <Grid item xs={4}>
                                                <h3>{e.service.category.label}</h3>

                                            </Grid>
                                            <Grid item xs={8} style={{paddingTop:26}}>
                                                <hr/>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{paddingLeft:110}}>
                                            <Grid item xs={5}>
                                                <img src={e.service.picture} alt={'picture'} width={'70%'}/>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <h3 style={{fontWeight: '100'}}>{e.service.label}</h3>
                                                <p>{e.prestations.length} Prestation(s) proposée(s)</p>
                                            </Grid>
                                            <Grid item xs={3} style={{display:"flex", justifyContent:"flex-end"}}>
                                                <Link href={'/myShop/editService?id='+e._id}><a style={{textDecoration:'none',height:'fit-content'}}><h3 style={{color:'#F8727F',fontWeight: '100',marginTop:0,cursor:"pointer"}}>Modifier</h3></a></Link>
                                            </Grid>

                                        </Grid>
                                        <Grid item style={{paddingLeft:100}}>
                                            <hr/>
                                        </Grid>
                                    </React.Fragment>
                                ))}

                                <Grid container style={{marginLeft:90,border: '1px solid lightgrey',maxWidth:'90%',marginTop:30,height:70,justifyContent:"center"}}>

                                <Grid item xs={4} style={{display:"flex",justifyContent:"center"}}>
                                    <img src={'../static/plus-2.svg'} width={'11%'} alt={'plus'}/>
                                </Grid>

                                <Grid item xs={8}>
                                    <h2 style={{color:'#2FBCD3',fontWeight: '100'}}>Ajouter un nouveau service</h2>
                                </Grid>

                            </Grid>


                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} style={{backgroundColor: '#F0F0F0',paddingLeft:20,maxWidth:'22%',border: '0.2px solid #707070'}}>
                                <Grid container style={{alignItems:"center"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 37.418 35.979">
                                    <g id="Groupe_936" data-name="Groupe 936" transform="translate(0 24.999)">
                                        <path id="Tracé_10757" data-name="Tracé 10757" d="M27.626-19.5l.412.049.464.1.414.148.361.2.412.2.361.248.361.3.308.345.26.347.2.4.207.347.154.4.1.446.053.4v.844l-.053.4-.1.446-.154.4-.207.347-.2.4-.26.347-.308.347-2.062,1.934-.257.2-.257.148-.31.1-.361.049-.308-.049-.31-.1-.257-.148-.257-.2-4.071-3.916-.207-.248-.154-.248-.1-.3-.053-.3.053-.347.1-.3.154-.248.207-.25,2.009-1.98.361-.3.361-.248L25.1-19l.361-.2.414-.148.464-.1.412-.049ZM17.678-7.009l.207.049.154.049.207.1.154.1.1.148.1.2.051.148.053.2-.053.2-.051.2-.1.15-.1.148L13.04-.171l-.154.148-.154.1-.207.049h-.412L11.907.077l-.154-.1L11.6-.171l-.156-.148-.1-.15-.051-.2v-.4l.051-.2.1-.15.156-.148,5.36-5.154.154-.1.154-.1.207-.049ZM31.286-25l-1.133.049-1.133.051-1.135.148-1.133.248-1.083.248-1.03.347-.929.446-.464.2-.361.3-.412.248-.31.3L11.7-12.362H.825l-.308.049-.207.051-.207.1-.1.148v.148l.053.2.1.2.2.25,5.1,4.856-.669.645-2.784.5-.31.1-.257.1-.154.2-.1.148v.2l.051.248.1.2.207.248L15.359,9.491l.26.2.2.1.257.049h.207l.154-.1.207-.15.1-.248.1-.3.515-2.676.669-.645,5.052,4.906.257.2.207.1.2.049h.156l.154-.1.1-.2.051-.2.053-.3V-.27l10.461-10.06.31-.3.257-.4.31-.4.2-.4.464-.893.361-.992L36.9-14.74l.257-1.092.156-1.09.051-1.09.051-1.092v-.99l-.051-.941-.1-.893-.154-.743-.154-.645-.207-.5-.154-.2-.1-.1-.1-.1-.207-.15-.515-.2L35-24.7l-.775-.15-.926-.1L32.318-25Z" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10758" data-name="Tracé 10758" d="M5.977-5l-.42.047-.42.1-.42.143-.358.24L4-4.04l-.54.672L2.381-1.594,1.421.036,1,.756H1L1.9.421,3.94-.347l2.216-.864L7-1.643l.54-.287.3-.289.179-.336.12-.336L8.2-3.226l-.061-.336L8.014-3.9l-.179-.287-.3-.289-.358-.24-.361-.143-.42-.1Z" transform="translate(0.44 8.785)" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10759" data-name="Tracé 10759" d="M6.72-3,6.5-2.943l-.223.112-.187.168L5.9-2.438,5.71-2.1,5.562-1.6l-.15.617-.15.673L5.075.87,5,1.318H5l.337-.055L6.122.925,6.533.758l.41-.225.375-.28L7.542.028l.15-.28L7.8-.587,7.879-.87v-.673L7.8-1.878l-.112-.28-.15-.28-.187-.225L7.168-2.83l-.225-.112Z" transform="translate(2.196 9.663)" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10760" data-name="Tracé 10760" d="M2.186-7l-.28.11-.337.17-.28.223-.223.337L.784-5.6l-.223.617-.17.615L.057-3.19,0-2.685.449-2.8l1.177-.28L2.3-3.3l.617-.225.5-.225.337-.28.225-.28.167-.28.112-.337.055-.335L4.26-5.6l-.112-.335-.167-.28L3.755-6.5l-.28-.223-.28-.17L2.858-7Z" transform="translate(0.001 7.907)" fill="#7e7e7e" fill-rule="evenodd"/>
                                    </g>
                                </svg>
                                <h2 style={{color: '#585858',fontWeight:'100',marginLeft:10}}>Conseils</h2>

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
