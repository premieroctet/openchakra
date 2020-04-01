import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            marginTop: 250,
        }
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
    }




});

class applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},

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

                    <Grid className={classes.toggle}  item xs={3} style={{}}>

                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 4}}/>
                                            <a s style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}}className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}}className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/applications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/network-2.svg'} alt={'network'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Applications connectées
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/applications'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/network-2.svg'} alt={'network'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Parrainage
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Applications connectées</h1>
                            </Grid>

                        </Grid>
                    </Grid>
                </Layout>
                    {/* <Footer/>*/}

            </Fragment>
        );
    };
}



export default withStyles(styles)(applications);
