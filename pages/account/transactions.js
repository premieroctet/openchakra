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
import {Helmet} from 'react-helmet';

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
    tabscontainer:{width:'60%',
        [theme.breakpoints.down('sm')]: {
            width:'100%',}},

    tabweb:{width:'100%', position:'sticky', top:'35px', fontSize:15, backgroundColor:'white', zIndex:'20',
        [theme.breakpoints.down('sm')]: {
            display: 'none'}},


    tabmobile:{
        fontSize:'10px', fontWeight:'300', marginTop:'-100px', height:60, backgroundColor:'white', position:'sticky', top:55, zIndex:20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }},
        trait:{
            width: '100%',
            height: 4,
            backgroundColor: 'rgb(47, 188, 211)',
            borderColor: 'transparent',
            [theme.breakpoints.down('sm')]: {
            },
        },
        trait1:{
            width: '100%',

            height: 4,
            backgroundColor: 'lightgray',
            borderColor: 'transparent'
        },
        trait2:{
            width: '100%',
            height: 4,
            backgroundColor: 'lightgray',
            borderColor: 'transparent',
        },
        trait3:{
            width: '100%',

            height: 4,
            backgroundColor: 'rgb(47, 188, 211)',
            borderColor: 'transparent'
        },
        historesp: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '150px',
            },
        }


});

class transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            tabs: false,
            paid: [],
            paidSoon: []

        }

    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data});
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get(url+'myAlfred/api/booking/account/paid')
            .then(res => {
                this.setState({paid: res.data})
            })
            .catch();

        axios.get(url+'myAlfred/api/booking/account/paidSoon')
            .then(res => {
                this.setState({paidSoon: res.data})
            })
            .catch()
    }
    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };




    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {tabs} = this.state;
        const {paid} = this.state;
        const {paidSoon} = this.state;

        return (
            <Fragment>
		<Helmet>
        <title>compte - Historique des transactions - My Alfred </title>
        <meta property="description" content="Retrouvez l'ensemble des services rémunérés que vous avez consommé sur My Alfred depuis votre historique des transactions. My Alfred des services entre particuliers assurés, un paiement sécurisé ! " />
      </Helmet>

                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>

                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic-2.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic-2.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/applications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Applications connectées
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/applications'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 20, marginBottom: '20px',minHeight:530}}>
                            <Grid container className={classes.tabweb} style={{paddingRight:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: 'dimgray',fontWeight: '100'}}>Historique des transactions</h1>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Commandes passées</h2>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Commandes à venir</h2><br/>
                                </Grid>

                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait1} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait3} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>
                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait2} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>

                            </Grid>
                            <Grid container className={classes.tabmobile}>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}>Commandes passées</h2>
                                </Grid>
                                <Grid item xs={6} >
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Commandes à venir</h2><br/>
                                </Grid>

                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait1}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait3}/>
                                        </React.Fragment>}
                                </Grid>
                                <Grid item xs={6} >
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait2}/>
                                        </React.Fragment>}
                                </Grid>


                            </Grid>

                            <Grid container style={{marginBottom:20, marginTop: '50px'}}>
                                {tabs ?
                                <React.Fragment>

                                        <Grid className={classes.historesp} container>
                                            {paidSoon.map((e,index) => (
                                                <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                    <Grid item xs={8}>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.end_date}</Typography>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.alfred.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{e.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}€</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}

                                        </Grid>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Grid className={classes.historesp} container>
                                        {paid.map((e,index) => (
                                            <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                <Grid item xs={8}>
                                                    <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{moment(e.date_payment).format('DD/MM/YYYY')}</Typography>
                                                    <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.alfred.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{e.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}€</Typography>
                                                </Grid>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </React.Fragment>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}


            </Fragment>
        );
    };
}



export default withStyles(styles)(transactions);
