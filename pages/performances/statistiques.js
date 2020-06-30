import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './statistiques/statistiquesStyle'
import cookie from 'react-cookies'

moment.locale('fr');
const _ = require('lodash');

class Statistiques extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            totalIncomes: 0,
            totalPrestations: 0,
            totalViewsServices: 0,
            totalReviews: 0,
            serviceUser: [],
            uniqCategory: [],
            userId: ''
        }
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios.get('/myAlfred/api/performances/statistics/totalBookings')
            .then(res => {
                this.setState({totalIncomes: res.data.incomes,totalPrestations: res.data.prestations})
            })
            .catch(err => console.log(err));

        axios.get('/myAlfred/api/performances/statistics/totalViewsServices')
            .then(res => {
                this.setState({totalViewsServices: res.data})
            })
            .catch(err => console.log(err));

        axios.get('/myAlfred/api/performances/statistics/totalReviews')
            .then(res => {
                this.setState({totalReviews: res.data})
            })
            .catch(err => console.log(err));

        axios.get('/myAlfred/api/serviceUser/currentAlfred')
            .then(res => {
                let service = res.data;
                this.setState({serviceUser: service});
                let arrayCategory = [];
                service.forEach(s => {
                    arrayCategory.push(s.service.category);
                });
                const uniqCategory = _.uniqBy(arrayCategory,'label');
                this.setState({uniqCategory:uniqCategory});
                service.forEach(s => {
                    const obj = {label:s.service.label};
                    axios.post('/myAlfred/api/performances/statistics/bookings/service',obj)
                        .then(response => {
                            this.setState({[s.service.label+'Incomes']:response.data.incomes,[s.service.label+'Prestations']:response.data.prestations})
                        })
                        .catch(error => console.log(error));

                    axios.get('/myAlfred/api/performances/statistics/reviews/'+s._id)
                        .then(result => {
                            this.setState({[s.service.label+'Reviews']:result.data})
                        })
                        .catch(errors => console.log(errors))
                })
            })
            .catch(err => console.log(err))

        axios.get('/myAlfred/api/users/current').then(res => {
            let user = res.data;
            if(user) {
                this.setState({
                    userId: user._id,
                })
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;
        const {uniqCategory, serviceUser} = this.state;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <NavBarShop userId={this.state.userId}/>
                        <Grid className={classes.toggle}>
                            <Grid>
                                <ResponsiveDrawer ref={this.child} isActiveIndex={1} itemsDrawers={'performance'} needMargin={true}/>
                            </Grid>
                            <Grid>
                                <Grid>
                                    <IconButton
                                      color="inherit"
                                      aria-label="open drawer"
                                      edge="start"
                                      onClick={this.callDrawer}
                                      className={classes.menuButton}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 55,  marginBottom: '20px'}}>
                            <Grid container style={{marginBottom:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: '#7E7E7E',fontWeight: '100'}}>Mes statistiques</h1>
                                </Grid>
                                <Grid container style={{marginTop: '40px'}}>
                                    <Grid item className={classes.webview} md={2}/>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalIncomes.toFixed(2)}€</span> <br/>Générés depuis l'inscription</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalPrestations}</span> <br/>Prestation(s) réalisée(s)</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalViewsServices}</span> <br/>Vue(s) de vos services depuis l'inscription</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalReviews}</span> <br/>Commentaire(s)</Typography>
                                    </Grid>
                                </Grid>

                                {uniqCategory.map((u,index) => (

                                <React.Fragment key={index}>
                                <Grid container style={{marginTop: '50px'}}>
                                    <Grid item md={11} xs={4}>
                                        <Typography style={{fontSize: '1.5rem'}}>{u.label}</Typography>
                                    </Grid>
                                    <Grid item md={10} sm={7} xs={7} style={{borderBottom: '#7E7E7E solid 1px', height: '25px'}}></Grid>
                                </Grid>

                                    {serviceUser.map((s,index2) => {
                                        if(s.service.category._id === u._id){
                                            return (
                                                <Grid key={index2} className={classes.webview} container>
                                                    <Grid item xs={3}>
                                                        <Link href={'/myShop/previewService?id='+s._id}><a style={{textDecoration:"none"}}>
                                                            <img src={"../../"+s.service.picture} style={{width: '100%', height: '170px', objectFit: 'cover'}}/>
                                                        </a></Link>
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <Typography style={{fontSize: '1.1rem', marginLeft: '30px'}}>{s.service.label}</Typography>
                                                        <Grid container style={{marginTop: '20px'}}>
                                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Incomes']}€</span> <br/>Générés depuis l'inscription</Typography>
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Prestations']}</span> <br/>Prestation(s) réalisée(s)</Typography>
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{s.number_of_views}</span> <br/>Vue(s) du service depuis l'inscription</Typography>
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Reviews']}</span> <br/>Commentaire(s)</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        } else {
                                            return null
                                        }


                                    })}

                                    {serviceUser.map((s,index3) => {
                                        if(s.service.category._id === u._id){
                                            return (
                                <Grid key={index3} className={classes.mobileview} style={{boxShadow: '0px 0px 6px #00000024', padding: '15px'}} container>
                                    <Grid item xs={12} style={{}}>
                                        <img src={"../../"+s.service.picture} style={{width: '100%', height: '170px', objectFit: 'cover'}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.titreservice} style={{fontSize: '1.1rem'}}>{s.service.label}</Typography>
                                        <Grid container style={{marginTop: '20px'}}>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Incomes']}€</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Générés depuis l'inscription</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Prestations']}</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Prestation(s) réalisée(s)</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{s.number_of_views}</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Vue(s) du service depuis l'inscription</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state[s.service.label+'Reviews']}</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Commentaire(s)</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                            )
                                        } else {
                                            return null
                                        }


                                    })}

                                <Grid className={classes.webview} container>
                                    <Grid item xs={10}>
                                        <hr style={{border: 'none', height: '1px', backgroundColor: '#7E7E7E', width: '100%'}}/>
                                    </Grid>
                                </Grid>

                                </React.Fragment>
                                    ))}

                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
               <NavbarMobile userId={this.state.userId}/>
            </Fragment>
        );
    };
}



export default withStyles(styles)(Statistiques);
