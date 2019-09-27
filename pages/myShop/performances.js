import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Footer from '../../hoc/Layout/Footer/Footer';







const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

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

class Performances extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;



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
                                <Link href={'/myShop/performances'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                    </a>
                                </Link>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item md={5} xs={12} style={{textAlign:'center', padding: '4%'}}>
                                <h1>Ne ratez pas le lancement des réservations !</h1>
                                <p>

                                    Cette fonctionnalité sera disponible lors du lancement des réservations sur My-Alfred.
                                </p>
                                <p>
                                    Inscrivez-vous dès aujourd’hui à la session de lancement des réservations ! Toute l’équipe My-Alfred sera mobilisée pour vous présenter l’ensemble des fonctionnalités de My-Alfred et vous annoncer de grandes surpises !
                                </p>
                                <Button color={"primary"} style={{borderRadius:'30px'}} variant={"contained"}><a style={{textDecoration:'none',color:'white'}} href="mailto:hello@my-alfred.io">Je m'inscris !</a></Button>
                            </Grid>
                            <Grid item md={7} xs={12} style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></Grid>
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
                        <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                <Footer/>



            </Fragment>
        );
    };
}



export default withStyles(styles)(Performances);



import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Footer from '../../hoc/Layout/Footer/Footer';







const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

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

class Performances extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;



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
                                <Link href={'/myShop/performances'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                    </a>
                                </Link>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item md={5} xs={12} style={{textAlign:'center', padding: '4%'}}>
                                <h1>Ne ratez pas le lancement des réservations !</h1>
                                <p>

                                    Cette fonctionnalité sera disponible lors du lancement des réservations sur My-Alfred.
                                </p>
                                <p>
                                    Inscrivez-vous dès aujourd’hui à la session de lancement des réservations ! Toute l’équipe My-Alfred sera mobilisée pour vous présenter l’ensemble des fonctionnalités de My-Alfred et vous annoncer de grandes surpises !
                                </p>
                                <Button color={"primary"} style={{borderRadius:'30px'}} variant={"contained"}><a style={{textDecoration:'none',color:'white'}} href="mailto:hello@my-alfred.io">Je m'inscris !</a></Button>
                            </Grid>
                            <Grid item md={7} xs={12} style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></Grid>
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
                        <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                <Footer/>



            </Fragment>
        );
    };
}



export default withStyles(styles)(Performances);



import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Footer from '../../hoc/Layout/Footer/Footer';







const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

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

class Performances extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;



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
                                <Link href={'/myShop/performances'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                    </a>
                                </Link>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item md={5} xs={12} style={{textAlign:'center', padding: '4%'}}>
                                <h1>Ne ratez pas le lancement des réservations !</h1>
                                <p>

                                    Cette fonctionnalité sera disponible lors du lancement des réservations sur My-Alfred.
                                </p>
                                <p>
                                    Inscrivez-vous dès aujourd’hui à la session de lancement des réservations ! Toute l’équipe My-Alfred sera mobilisée pour vous présenter l’ensemble des fonctionnalités de My-Alfred et vous annoncer de grandes surpises !
                                </p>
                                <Button color={"primary"} style={{borderRadius:'30px'}} variant={"contained"}><a style={{textDecoration:'none',color:'white'}} href="mailto:hello@my-alfred.io">Je m'inscris !</a></Button>
                            </Grid>
                            <Grid item md={7} xs={12} style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></Grid>
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
                        <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                <Footer/>



            </Fragment>
        );
    };
}



export default withStyles(styles)(Performances);



import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Footer from '../../hoc/Layout/Footer/Footer';







const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

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

class Performances extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;



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
                                <Link href={'/myShop/performances'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                    </a>
                                </Link>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item md={5} xs={12} style={{textAlign:'center', padding: '4%'}}>
                                <h1>Ne ratez pas le lancement des réservations !</h1>
                                <p>

                                    Cette fonctionnalité sera disponible lors du lancement des réservations sur My-Alfred.
                                </p>
                                <p>
                                    Inscrivez-vous dès aujourd’hui à la session de lancement des réservations ! Toute l’équipe My-Alfred sera mobilisée pour vous présenter l’ensemble des fonctionnalités de My-Alfred et vous annoncer de grandes surpises !
                                </p>
                                <Button color={"primary"} style={{borderRadius:'30px'}} variant={"contained"}><a style={{textDecoration:'none',color:'white'}} href="mailto:hello@my-alfred.io">Je m'inscris !</a></Button>
                            </Grid>
                            <Grid item md={7} xs={12} style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></Grid>
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
                        <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                <Footer/>



            </Fragment>
        );
    };
}



export default withStyles(styles)(Performances);



