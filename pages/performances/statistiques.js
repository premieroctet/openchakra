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
const _ = require('lodash');
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
    },
    shopbar:{
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},



});

class Statistiques extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalIncomes: 0,
            totalPrestations: 0,
            totalViewsServices: 0,
            totalReviews: 0,
            serviceUser: [],
            uniqCategory: [],
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

        axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
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
                    axios.post(url+'myAlfred/api/performances/statistics/bookings/service',obj)
                        .then(response => {
                            this.setState({[s.service.label+'Incomes']:response.data.incomes,[s.service.label+'Prestations']:response.data.prestations})
                        })
                        .catch(error => console.log(error));

                    axios.get(url+'myAlfred/api/performances/statistics/reviews/'+s._id)
                        .then(result => {
                            this.setState({[s.service.label+'Reviews']:result.data})
                        })
                        .catch(errors => console.log(errors))
                })
            })
            .catch(err => console.log(err))

    }

    render() {
        const {classes} = this.props;
        const {uniqCategory} = this.state;
        const {serviceUser} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3, height: '52px'}}>
                        <Grid item xs={1} className={classes.shopbar}></Grid>
                        <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                            <Link href={'/myShop/services'}>
                                <a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                            <Link href={'/myShop/messages'}>
                                <a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                            <Link href={'/myShop/mesreservations'}>
                                <a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                            <Link href={'/myShop/myAvailabilities'}>
                                <a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
                            <Link href={'/performances/revenus'}>
                                <a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Performances</p>
                                </a>
                            </Link>
                        </Grid>

                    </Grid>

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
                <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>

                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}></img></p></a>
                        </Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                        <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                        <Link href={'/performances/revenus'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                <Footer/>



            </Fragment>
        );
    };
}



export default withStyles(styles)(Statistiques);
