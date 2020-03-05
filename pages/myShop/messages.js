import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';
import {Helmet} from 'react-helmet';

const jwt = require('jsonwebtoken');

const {config} = require('../../config/config');
const url = config.apiUrl;

import { MYSHOP_MESSAGE, MYSHOP_SUBTITLE, MYSHOP_TITLE } from '../../utils/messages.js';
import axios from 'axios';

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    shopbar:{
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    bottombar:{
        visibility:'hidden',
        [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{
        visibility:'visible',
        position: 'sticky',
        top: 65,
        zIndex:999,
        [theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},
});

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            alfred: false,
            userId: ""
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({logged:true});
            const token2 = localStorage.getItem('token').split(' ')[1];
            const decode = jwt.decode(token2);
            this.setState({alfred: decode.is_alfred});

            axios.defaults.headers.common['Authorization'] = token;
            axios
              .get(url+'myAlfred/api/users/current')
              .then(res => {
                  let user = res.data;
                  this.setState({alfred:user.is_alfred, userId:user._id});
              })
              .catch(err => console.log(err))
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
		<Helmet>
        <title>Mes messages - My Alfred </title>
        <meta property="description" content="Echangez avec des Alfred à proximité au travers de la messagerie My Alfred ! Des milliers de services entre particuliers et professionnels rémunérés.Inscription My Alfred gratuite. Paiement sécurisé." />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3, height: '52px'}}>
                            <Grid item xs={1} className={classes.shopbar}/>
                            <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                <Link href={`/shop?id_alfred=${this.state.userId}`}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
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
                            <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                <Link href={'/myShop/performances'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                    </a>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={5} xs={12} style={{textAlign:'center', padding: '4%'}}>
                                <h1>{MYSHOP_TITLE}</h1>
                                <p>
                                    {MYSHOP_SUBTITLE}
                                </p>
                                <p>
                                    {MYSHOP_MESSAGE}
                                </p>
                                <Button color={"primary"} style={{borderRadius:'30px'}} variant={"contained"}><a style={{textDecoration:'none',color:'white'}} href={this.state.alfred ? '/myShop/services' : '/creaShop/creaShop'}> {this.state.alfred ? 'Ma boutique' : 'Créer ma boutique'}</a></Button>
                            </Grid>
                            <Grid item md={7} xs={12} style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}/>
                        </Grid>
                    </Grid>
                </Layout>
                <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>
                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={`/shop?id_alfred=${this.state.userId}`}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}/></p></a>
                        </Link>
                    </Grid>
                    <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                        <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                        </a></Link>
                    </Grid>
                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                        </a></Link>
                    </Grid>
                    <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                        <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                        </a></Link>
                    </Grid>
                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                        </a></Link>
                    </Grid>
                </Grid>
                {/* <Footer/>*/}

            </Fragment>
        );
    };
}

export default withStyles(styles)(Messages);



