import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Footer from '../../hoc/Layout/Footer/Footer';
import Typography from '@material-ui/core/Typography'

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
    shopbar:{
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    bottombar:{visibility:'hidden', 
    [theme.breakpoints.up('md')]: {
        display: 'none'
    },[theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
        display: 'none',visibility:'hidden',
        }},
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
    
    
        toggle: {
            [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
            transition: 'margin-left 0.7s',
           
            '&:hover': {
                marginLeft:'0px',
                transition: 'margin-left 0.7s',
                boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
    
                 }
          }  
        },
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
            borderColor: 'transparent',  [theme.breakpoints.down('sm')]: {
            },
        },
        trait3:{
            width: '100%',
    
            height: 4,
            backgroundColor: 'rgb(47, 188, 211)',
            borderColor: 'transparent'
        },
        tabweb:{visibility:'visible', width:'100%', position:'sticky', top:'115px', fontSize:15, backgroundColor:'white', zIndex:'20',
        [theme.breakpoints.down('sm')]: {
            display: 'none',visibility:'hidden'}},


    tabmobile:{visibility:'hidden',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            visibility: 'visible',fontSize:'10px', fontWeight:'300', marginTop:'-100px', height:90, backgroundColor:'white', position:'sticky', top:55, zIndex:20}},

    mobilerow: {
        marginTop: '1%',
        [theme.breakpoints.down('sm')]: {
            marginTop: '15%'
        }
    },
    Rightcontent: {
            marginLeft: '4%'
    },
    toggle: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
});

class ComingReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: false,
            user: null,
            alfredReservations: [],
            userReservations: [],
        }

    }

    componentDidMount() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get(url + 'myAlfred/api/users/current')
        .then(res => {
          console.log(res.data);
          this.setState({ user: res.data })

          axios.get(url + 'myAlfred/api/booking/alfredBooking')
            .then(res => {
              this.setState({ alfredReservations: res.data })
            })
          
          axios.get(url + 'myAlfred/api/booking/userBooking')
            .then(res => {
              this.setState({ userReservations: res.data })
            })
        })
    }

    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };

    render() {
        const {classes} = this.props;
        const tabs = this.state.tabs;

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
                            <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
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

                        {/*/////////////////////////////////////////////////////////////////////////////////////////*/}


                        <Grid container style={{marginBottom: '10%'}}>
                            <Grid className={classes.toggle}  item xs={3} style={{ height: '100vh', borderRight: '1px #8281813b solid',}}>
                            
                                <Grid container style={{justifyContent: 'center', position: 'sticky', top: 100,}}>
                                    <Grid item style={{marginTop: 30,width: 281, height: 70}} className={classes.hidesm}>
                                        <Link href={'#'}>
                                            <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', height: 70}}>
                                                <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                    Toutes mes réservations
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid item style={{marginTop: 10,width: 281, height: 70}} className={classes.hidesm}>
                                        <Link href={'#'}>
                                            <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', height: 70}}>
                                                <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                    Mes réservations à venir
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid item style={{marginTop: 10,width: 281, height: 70}} className={classes.hidesm}>
                                        <Link href={'#'}>
                                            <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', height: 70}}>
                                                <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                    Mes réservations terminées
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid> 

                            <Grid className={classes.Rightcontent} item xs={9} sm={9} md={7}>
                                <Typography style={{fontSize: '2rem',marginTop: '4%'}}>Mes reservations</Typography>
                                <Typography style={{fontSize: '0.8rem', marginBottom: '4%'}}>vous avez N messages non lus</Typography>
                                <Grid container className={classes.tabweb}>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <div>
                                            <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Mes réservations en tant qu'Alfred</h2>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}> Mes réservations en tant qu'utilisateur</h2><br/>
                                    </Grid>

                                    <Grid item xs={6}>
                                        {tabs ?
                                            <React.Fragment>
                                                <hr className={classes.trait1} style={{marginTop:'-25px'}}/>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <hr className={classes.trait3} style={{marginTop:'-25px'}}/>
                                            </React.Fragment>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {tabs ?
                                            <React.Fragment>
                                                <hr className={classes.trait} style={{marginTop:'-25px'}}/>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <hr className={classes.trait2} style={{marginTop:'-25px'}}/>
                                            </React.Fragment>}
                                    </Grid>

                                </Grid>
                                <Grid container className={classes.tabmobile}>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}>Mes réservations en tant qu'Alfred</h2>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Mes réservations en tant qu'utilisateur</h2><br/>
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
                                {tabs ? <React.Fragment>
                                  {this.state.userReservations.map(booking => {
                                    return (
                                      <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                        <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                          <img src={`../../${booking.alfred.picture}`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                        </Grid>
                                        <Grid item xs={5} md={7}>
                                          <Typography style={{marginTop: '2%', color: '#419F41'}}>{booking.status} - {booking.alfred.firstname}</Typography>
                                          <Typography style={{color: '#9B9B9B'}}>{booking.date_prestation} - {booking.time_prestation}</Typography>
                                          <Typography style={{color: '#9B9B9B'}}>{booking.service}</Typography>
                                        </Grid>
                                        <Grid item xs={1} style={{}}>
                                          <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>{booking.amount}€</Typography>
                                        </Grid>
                                        <Grid item xs={2} style={{}}>
                                          <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la réservation</a></Link></Typography>
                                        </Grid>
                                      </Grid>
                                    )
                                  })}
                                </React.Fragment>: <React.Fragment>
                                <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                    <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                        <img src={`../../static/profile/ui.png`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                    </Grid>
                                    <Grid item xs={5} md={7}>
                                        <Typography style={{marginTop: '2%', color: '#419F41'}}>Confirmée - Prénom</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Date - Heure</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Service</Typography>
                                    </Grid>
                                    <Grid item xs={1} style={{}}>
                                        <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>28€</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{}}>
                                        <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la réservation</a></Link></Typography>
                                    </Grid>

                                </Grid>
                                
                                <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                    <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                        <img src={`../../static/profile/62.jpg`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                    </Grid>
                                    <Grid item xs={5} md={7}>
                                        <Typography style={{marginTop: '2%', color: '#A30808'}}>En attente de confirmation - Prénom</Typography>
                                        <Typography style={{color: '#955E5E'}}><span style={{cursor:'pointer'}}>Accepter</span> ou <span style={{cursor:'pointer'}}>refuser</span></Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Date - Heure</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Service</Typography>
                                    </Grid>
                                    <Grid item xs={1} style={{}}>
                                        <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>28€</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{}}>
                                        <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la</a></Link></Typography>
                                    </Grid>

                                </Grid>
                                
                                <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                    <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                        <img src={`../../static/profile/256.jpg`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                    </Grid>
                                    <Grid item xs={5} md={7}>
                                        <Typography style={{marginTop: '2%', color: '#747474'}}>Expirée  - Prénom</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Date - Heure</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Service</Typography>
                                    </Grid>
                                    <Grid item xs={1} style={{}}>
                                        <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>28€</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{}}>
                                        <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la</a></Link></Typography>
                                    </Grid>

                                </Grid>
                                
                                <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                    <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                        <img src={`../../static/profile/leslie_morales.jpg`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                    </Grid>
                                    <Grid item xs={5} md={7}>
                                        <Typography style={{marginTop: '2%', color: '#747474'}}>Annulée - Prénom</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Date - Heure</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Service</Typography>
                                    </Grid>
                                    <Grid item xs={1} style={{}}>
                                        <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>28€</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{}}>
                                        <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la</a></Link></Typography>
                                    </Grid>

                                </Grid>
                                
                                <Grid container className={classes.mobilerow} style={{borderBottom: '1px #8281813b solid'}}>
                                    <Grid item xs={3} md={1} style={{marginRight: '5%'}}>
                                        <img src={`../../static/profile/owl-login.png`} alt={'picture'} style={{width: '80px', height: '80px',borderRadius: '50%', objectFit:'cover'}}></img>
                                    </Grid>
                                    <Grid item xs={5} md={7}>
                                        <Typography style={{marginTop: '2%', color: '#747474'}}>Terminée - Prénom</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Date - Heure</Typography>
                                        <Typography style={{color: '#9B9B9B'}}>Service</Typography>
                                    </Grid>
                                    <Grid item xs={1} style={{}}>
                                        <Typography style={{color: '#4FBDD7', fontWeight: '600', paddingTop: '45%'}}>28€</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{}}>
                                        <Typography style={{height: '45px', backgroundColor: '#BCBCBC', color: 'white', textAlign:'center', cursor: 'pointer', lineHeight: '3',marginTop: '15%'}}><Link href="/myshop/statut"><a style={{textDecoration: 'none', color: 'white'}}>Voir la</a></Link></Typography>
                                    </Grid>

                                </Grid>
                                </React.Fragment>}
                            </Grid> 
                        </Grid>



                        {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
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

                    <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                        <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                        <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center"}}>
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



export default withStyles(styles)(ComingReservations);
