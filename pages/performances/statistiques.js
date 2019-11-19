import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';
import { Typography } from '@material-ui/core';


moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    exportSVG: {
        fontFamily: 'sans-serif!important',
        color: '#2FBCD3',
    },
    exportPNG: {
        fontFamily: 'sans-serif!important',
        color: '#2FBCD3',
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }

    ,hidelg: {
        [theme.breakpoints.up('md')]: {
            display:'none',
        }

    },
    trigger:{
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
            width: '100%',
            marginLeft:'0px',
            height:'30px',
            backgroundColor:'#2FBCD3',

            display:'block',
            transition: 'display 0.7s',
            borderRadius:'5px',
            '&:focus': {
                display:'none',
                transition: 'display 0.7s',

            }
        }

    },
    responsiveContainer: {
        [theme.breakpoints.down('sm')]: {
            width:'135%!important',

        }
    }

    ,toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
            transition: 'margin-left 0.7s',

            '&:hover': {
                marginLeft:'0px',
                transition: 'margin-left 0.7s',
                boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

            }
        }
    },
    webview: {
        [theme.breakpoints.down('sm')]:{
            display:'none'
        }
    },
    mobileview: {
        [theme.breakpoints.up('md')]:{
            display:'none'
        }
    },
    titreservice:{
        [theme.breakpoints.up('md')]:{
            marginLeft: '30px',
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: '2px'
        }
    }



});

class Statistiques extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalIncomes: 0,
            totalPrestations: 0,
            totalViewsServices: 0,
            totalReviews: 0,
        }
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/performances/statistics/totalBookings')
            .then(res => {
                this.setState({totalIncomes: res.data.incomes,totalPrestations: res.data.prestations})
            })
            .catch(err => console.log(err));

        axios.get(url+'myAlfred/api/performances/statistics/totalViewsServices')
            .then(res => {
                this.setState({totalViewsServices: res.data})
            })
            .catch(err => console.log(err));

        axios.get(url+'myAlfred/api/performances/statistics/totalReviews')
            .then(res => {
                this.setState({totalReviews: res.data})
            })
            .catch(err => console.log(err));

    }

    render() {
        const {classes} = this.props;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer} style={{overflowX:"hidden"}}>

                        <Grid className={classes.toggle}  item xs={3} style={{}}>

                            <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/revenus'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/revenus.svg'} alt={'user'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes revenus
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/revenus'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/revenus.svg'} alt={'user'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/statistiques'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/view-2.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes statistiques
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/performances/statistiques'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/view-2.svg'} alt={'sign'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/evaluations'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/chat.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/evaluations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/chat.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes évaluations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/historique'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/history.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/historique'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/history.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des <br/>transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>

                        <Grid item xs={9} style={{paddingLeft: 20, borderLeft: '#9f919178 solid 1px', marginBottom: '20px'}}>
                            <Grid container style={{marginBottom:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: '#7E7E7E',fontWeight: '100'}}>Mes statistiques</h1>
                                </Grid>
                                <Grid container style={{marginTop: '40px'}}>
                                    <Grid item className={classes.webview} md={2}></Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalIncomes}€</span> <br/>Générés depuis l'inscription</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalPrestations}</span> <br/>Prestation(s) réalisées</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalViewsServices}</span> <br/>Vue(s) de vos services depuis l'inscription</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                        <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>{this.state.totalReviews}</span> <br/>Commentaire(s)</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container style={{marginTop: '50px'}}>
                                    <Grid item md={11} xs={4}>
                                        <Typography style={{fontSize: '1.5rem'}}>Beauté</Typography>
                                    </Grid>
                                    <Grid item md={10} sm={7} xs={7} style={{borderBottom: '#7E7E7E solid 1px', height: '25px'}}></Grid>
                                </Grid>


                                {/*Web view*/}
                                <Grid className={classes.webview} container>
                                    <Grid item xs={3}>
                                        <img src="../../static/coiffure.jpg" style={{width: '100%', height: '170px', objectFit: 'cover'}}/>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography style={{fontSize: '1.1rem', marginLeft: '30px'}}>Coiffure</Typography>
                                        <Grid container style={{marginTop: '20px'}}>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX€</span> <br/>Générés depuis l'inscription</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Prestations réalisées</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Vues de vos services depuis l'inscription</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Commentaires</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/*Mobile view*/}
                                <Grid className={classes.mobileview} style={{boxShadow: '0px 0px 6px #00000024', padding: '15px'}} container>
                                    <Grid item xs={12} style={{}}>
                                        <img src="../../static/coiffure.jpg" style={{width: '100%', height: '170px', objectFit: 'cover'}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.titreservice} style={{fontSize: '1.1rem'}}>Coiffure</Typography>
                                        <Grid container style={{marginTop: '20px'}}>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX€</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Générés depuis l'inscription</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Prestations réalisées</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Vues de vos services depuis l'inscription</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginBottom: '10px'}}>
                                                <Grid item xs={3} sm={3} md={2}>
                                                    <Typography style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{color: '#7E7E7E'}}>Commentaires</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid className={classes.webview} container>
                                    <Grid item xs={10}>
                                        <hr style={{border: 'none', height: '1px', backgroundColor: '#7E7E7E', width: '100%'}}/>
                                    </Grid>
                                </Grid>

                                <Grid className={classes.webview} container>
                                    <Grid item xs={3}>
                                        <img src="../../static/markus-spiske-502390-unsplash.jpg" style={{width: '100%', height: '170px', objectFit: 'cover'}}/>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography style={{fontSize: '1.1rem', marginLeft: '30px'}}>Jardin</Typography>
                                        <Grid container style={{marginTop: '20px'}}>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX€</span> <br/>Générés depuis l'inscription</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Prestations réalisées</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Vues de vos services depuis l'inscription</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={2} style={{textAlign: 'center'}}>
                                                <Typography style={{color: '#7E7E7E'}}><span style={{color:'#2FBCD3', fontSize: '1.1rem', fontWeight: 'bold'}}>XXX</span> <br/>Commentaires</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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



export default withStyles(styles)(Statistiques);
