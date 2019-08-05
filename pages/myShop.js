import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";




moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },


});

class myShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},

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
    }



    render() {
        const {classes} = this.props;
        const {user} = this.state;


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
                                            borderLeft: '30px solid transparent',
                                            borderRight: '30px solid transparent',
                                            borderTop: '30px solid gray',margin: '0 auto',marginTop:-26}}>

                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2 style={{color:'#2FBCD3',fontWeight: '100'}}> Mes paramètres de réservation</h2>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>

                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(myShop);
