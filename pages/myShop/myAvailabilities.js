import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Schedule from '../../components/Schedule/Schedule';
import { toast } from 'react-toastify';

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
    },
    containercalendar:{
      width:'100%',
      [theme.breakpoints.down('sm')]: {
            width:'100%!important',

        }},
    containerheader:{[theme.breakpoints.down('sm')]: {
            width:'100%!important',
            marginTop:'-70px',
        }},
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},
    hidenimg:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
    ,
    dispocard:{
        minHeight:'100px',
        maxWidth:'250px',
        textAlign:'center',
        backgroundColor:'#f2f2f2',
        boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
        border:'solid 1px #ccc',
        borderRadius:'10px',
        padding:'5%',
    },
    dispocardin:{
        padding:'5%',
        fontSize:'15px',
        marginBottom:10,
    },

    dispoheader:{
        height:'10%',
        color:'gray',
        width:'100%',
        backgroundColor:'#f2f2f2',
        transition: 'background-color 0.5s',
        fontSize:'15px',
        textAlign:'left',
        borderRadius:'0px',
        marginBottom:'5 px',
        '&:hover': {
            backgroundColor:'#2FBCD3',
            transition: 'background-color 0.5s',
            color: 'white',
        }
    },

    respbg:{
        [theme.breakpoints.down('sm')]: {
            marginTop: '-13%',
        }
    },
    resppic:{
        [theme.breakpoints.down('sm')]: {
            top: '17%!important',
        }
    },
});


class myAvailabilities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            availabilities: [],
            services: [],
        };
        this.availabilityCreated = this.availabilityCreated.bind(this);
        this.availabilityDelete = this.availabilityDelete.bind(this);
    }

    availabilityCreated(avail) {
      console.log("CB created availability:"+JSON.stringify(avail));
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      axios.post(url+'myAlfred/api/availability/add',avail)
          .then(res => {
              console.log("Added:"+JSON.stringify(res.data));
              toast.info('Disponibilité ajoutée avec succès !');
              let new_availabilities = [res.data, ...this.state.availabilities];
              this.setState({availabilities: new_availabilities});
          })
          .catch(err => {
            console.log(err);
            toast.error(err);
		  })
    }

    availabilityDelete(avail) {
      console.log("CB delete availability:"+JSON.stringify(avail));
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      axios.delete(url+'myAlfred/api/availability/'+avail)
          .then(res => {
              console.log("Deleting:"+JSON.stringify(res.data));
              toast.info('Disponibilité supprimée avec succès !');
              let new_availabilities=[];
              this.state.availabilities.forEach( a => {
                if (a._id!==avail) {
                  new_availabilities.push(a);
                }
              })
              this.setState({availabilities: new_availabilities});
          })
          .catch(err => {
            console.log(err);
            toast.error(err);
          })
    }


    componentDidMount() {

        localStorage.setItem('path',Router.pathname);

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
                        let availabilities = res.data;
                        this.setState({availabilities: availabilities});

                    })
                    .catch(err => console.log(err));

                   axios
                        .get(url+'myAlfred/api/serviceUser/currentAlfred')
                        .then(res => {
                            //let services = [...new Set(res.data.map(d => [d['service']['label'],d['service'][_id']]))];
                            let mapServices = new Map();
                            res.data.forEach( d => mapServices.set(d['service']['label'], d['service']['_id']));
                            let services = [...mapServices.entries()];
                            this.setState({services:services});
                            //this.setState({serviceUser: serviceUser});
                        })
                        .catch(err =>
                            console.log(err)
                        );


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

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {events} = this.state;

        return (
          <Fragment>
              <Layout>
                  <Grid container className={classes.bigContainer}>
                      <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3, height: '52px'}}>
                          <Grid item xs={1} className={classes.shopbar}/>
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
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
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
                      <Grid className={classes.respbg} container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                          backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>
                      </Grid>
                      <Grid className={classes.respbg} item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh',top:117}}>
                      </Grid>
                      <Grid item>
                          <img src={'../'+user.picture} className={classes.resppic} style={{borderRadius:'50%',position:'absolute',top:'27%',left:'0%',right:'0%',margin: 'auto',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px'}} alt={'picture'}/>
                      </Grid>
                  </Grid>
                  <Grid container style={{marginTop: 20, padding:'2%'}} className={classes.containercalendar}>
                      <Grid style={{width:'100%'}}>
                          <Schedule availabilities={this.state.availabilities} services={this.state.services} cbAvailabilityCreated={this.availabilityCreated} cbAvailabilityDelete={this.availabilityDelete} />
                      </Grid>
                  </Grid>
              </Layout>
              <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}/></p></a>
                      </Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center",zIndex:999, borderBottom: '3px solid #4fbdd7'}}>
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
              <Footer/>
          </Fragment>
        );
    };
}
export default withStyles(styles)(myAvailabilities);



