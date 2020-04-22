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
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';


moment.locale('fr');

const styles = theme => ({
    bigContainer: {
        marginTop: 75,
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 100,
        }
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
    topbar:{visibility:'visible', position: 'sticky', top: 75, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},

});

class Historique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: false,
            bookingsPaid: [],
            bookingsPaidSoon: [],
            userId: ''
        }
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get('/myAlfred/api/booking/getPaid')
            .then(res => {
                let bookingsPaid = res.data;
                this.setState({bookingsPaid: bookingsPaid})
            })
            .catch(err => console.log(err));

        axios.get('/myAlfred/api/booking/getPaidSoon')
            .then(res => {
                let bookingsPaidSoon = res.data;
                this.setState({bookingsPaidSoon: bookingsPaidSoon})
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

    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };


    render() {
        const {classes} = this.props;
        const {tabs} = this.state;
        const {bookingsPaid} = this.state;
        const {bookingsPaidSoon} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <NavBarShop userId={this.state.userId}/>
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
                                            <img src={'../static/view.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes statistiques
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/performances/statistiques'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/view.svg'} alt={'sign'} height={70} width={27} style={{marginleft: 4}}/>
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
                                            <img src={'../static/history-2.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/historique'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/history-2.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des <br/>transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>

                        <Grid item xs={9} style={{paddingLeft: 20, marginBottom: '20px',minHeight:530}}>
                            <Grid container className={classes.tabweb} style={{paddingRight:30}}>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <div>
                                        <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Versements effectués</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={6} >
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Versements à venir</h2><br/>
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
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}>Versements effectués</h2>
                                </Grid>
                                <Grid item xs={6} >
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Versements à venir</h2><br/>
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
                                            {bookingsPaidSoon.map((e,index) => (
                                                <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                    <Grid item xs={8}>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{moment(e.end_date).format('DD/MM/YYYY')}</Typography>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.user.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{(e.amount-(e.fees*2)).toFixed(2)}€</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}

                                        </Grid>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Grid className={classes.historesp} container>
                                            {bookingsPaid.map((e,index) => (
                                                <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                    <Grid item xs={8}>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{moment(e.date_payment).format('DD/MM/YYYY')}</Typography>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.user.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{(e.amount-(e.fees*2)).toFixed(2)}€</Typography>
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
               <NavbarMobile userId={this.state.userId}/>
            </Fragment>
        );
    };
}



export default withStyles(styles)(Historique);
