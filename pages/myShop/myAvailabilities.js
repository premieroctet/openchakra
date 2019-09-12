import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
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
    }




});

class myAvailabilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            all_availabilities: [],

        };



    }

    componentDidMount() {


        localStorage.setItem('path',Router.pathname);
        //const token = localStorage.getItem('token').split(' ')[1];
        /*const decode = jwt.decode(token);
        if (decode.is_alfred === false) {
            Router.push('/becomeAlfredForm');

        }*/

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                if(user.is_alfred === false) {
                    Router.push('/becomeAlfredForm');
                } else {
                this.setState({user:user});
                    axios
                        .get(url+'myAlfred/api/shop/currentAlfred')
                        .then(res => {
                            let shop = res.data;
                            this.setState({shop:shop,booking_request: shop.booking_request, no_booking_request:shop.no_booking_request,my_alfred_conditions: shop.my_alfred_conditions,
                                profile_picture: shop.profile_picture, identity_card: shop.identity_card, recommandations: shop.recommandations,
                                flexible_cancel: shop.flexible_cancel, moderate_cancel: shop.moderate_cancel, strict_cancel: shop.strict_cancel,
                                welcome_message: shop.welcome_message});
                        })
                        .catch(err =>
                            console.log(err)
                        );

                    axios.get(url+'myAlfred/api/availability/currentAlfred')
                        .then(res => {
                            let availability = res.data;
                            this.setState({all_availabilities: availability});

                        })
                        .catch(err => console.log(err));
                }
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


    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    onSubmit =() => {

    };

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {all_availabilities} = this.state;






        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                            </Grid>

                        </Grid>
                        <Grid container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                            backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>



                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh',top:117}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius:'50%',position:'absolute',top:'27%',left:'45%',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px'}} alt={'picture'}/>
                        </Grid>
                    </Grid>


                        <Grid container style={{marginTop: 20}}>
                            <Grid item xs={7}>

                                {all_availabilities.map((e,index) => {
                                    if(e.period.active){
                                        return (
                                            <Link key={index} href={'/myShop/detailsAvailability?id='+e._id}>
                                                <a style={{textDecoration:'none'}}>
                                                    <p>Disponibilités pour la période : {moment(e.period.month_begin).format('LL')} / {moment(e.period.month_end).format('LL')}</p>
                                                </a>
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <Link key={index} href={'/myShop/detailsAvailability?id='+e._id}>
                                                <a style={{textDecoration:'none'}}>
                                                    <p>Disponibilités sans période</p>
                                                </a>
                                            </Link>
                                        )
                                    }
                                })}


                            </Grid>
                        </Grid>
                    <Grid container style={{marginBottom:20}}>
                        <Link href={'/myShop/addAvailability'}>
                        <a style={{textDecoration:'none'}}><Button color={"primary"} style={{color:"white"}} variant={"contained"}>Ajouter une disponibilité</Button></a>
                        </Link>
                    </Grid>


                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(myAvailabilities);



