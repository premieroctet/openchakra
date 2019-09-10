import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Footer from '../../hoc/Layout/Footer/Footer';
import dynamic from 'next/dynamic';






moment.locale('fr');
const _ = require('lodash');
const { config } = require('../../config/config');
const url = config.apiUrl;
const MapComponent = dynamic(() => import('../../components/map'), {
    ssr: false
});
const styles = theme => ({
    bigContainer: {
        flexGrow: 1,
    },
    grosHR: {
      height: '7px',
      backgroundColor: '#6ec1e4',
      width: '76%',
      float: 'left',
    },
    fournitureHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '85%',
        float: 'left',
      },
    disponibilityHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '103%',
        float: 'left',
      },
    conditionsHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '189%',
        float: 'left',
      },
    perimeterHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '223%',
        float: 'left',
      },
});


class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            serviceUser: [],
            uniqFilter: [],
            drops: false,
            dropsoption: false,
            service: {},
            equipments: [],
            prestations: [],
            flexible2: false,
            moderate2: false,
            strict2: false,
            options: {},
            availability: [],
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
            sunday: {},
            monday_event: [],
            tuesday_event: [],
            wednesday_event: [],
            thursday_event: [],
            friday_event: [],
            saturday_event: [],
            sunday_event: [],
            position: '',
        };

        this.handleclick1 = this.handleclick1.bind(this);
        this.handleclick2 = this.handleclick2.bind(this);



    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {



        const id = this.props.service_id;
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop});
                this.setState({flexible2:shop.flexible_cancel});
                this.setState({moderate2:shop.moderate_cancel});
                this.setState({strict2:shop.strict_cancel});
            })
            .catch(err =>
                console.log(err)
            );

        axios
            .get(url+`myAlfred/api/availability/currentAlfred`)
            .then(res => {
                let availability = res.data;
                this.setState({availability: availability});
                
                availability.forEach(d => {
                    this.setState({monday: d.monday});
                    this.setState({tuesday: d.tuesday});
                    this.setState({wednesday: d.wednesday});
                    this.setState({thursday: d.thursday});
                    this.setState({friday: d.friday});
                    this.setState({saturday: d.saturday});
                    this.setState({sunday: d.sunday});
                });
                
                /*Lundi*/
                this.state.monday.event.forEach(i  => {
                        i.services.forEach(d =>{
                            if(d.value === id){
                                this.setState({monday_event: [...this.state.monday_event, i]})  
                            }
                        })
                });
                this.state.monday.event.forEach(e => {
                    if(e.all_services === true){
                       this.setState({monday_event: [...this.state.monday_event, e]}) 
                    }
                });

                /*mardi*/
                this.state.tuesday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({tuesday_event: [...this.state.tuesday_event, i]})  
                        }
                    })
                })
                this.state.tuesday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({tuesday_event: [...this.state.tuesday_event, e]}) 
                    }
                })

                /*Mercredi*/
                this.state.wednesday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({wednesday_event: [...this.state.wednesday_event, i]})  
                        }
                    })
                })
                this.state.wednesday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({wednesday_event: [...this.state.wednesday_event, e]}) 
                    }
                })

                /*Jeudi*/
                this.state.thursday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({thursday_event: [...this.state.thursday_event, i]})  
                        }
                    })
                })
                this.state.thursday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({thursday_event: [...this.state.thursday_event, e]}) 
                    }
                })

                /*Vendredi*/
                this.state.friday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({friday_event: [...this.state.friday_event, i]})  
                        }
                    })
                })
                this.state.friday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({friday_event: [...this.state.friday_event, e]}) 
                    }
                })

                /*Samedi*/
                this.state.saturday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({saturday_event: [...this.state.saturday_event, i]})  
                        }
                    })
                })
                this.state.saturday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({saturday_event: [...this.state.saturday_event, e]})
                    }
                })

                /*Dimanche*/
                this.state.sunday.event.forEach(i  => {
                    i.services.forEach(d =>{
                        if(d.value === id){
                            this.setState({sunday_event: [...this.state.sunday_event, i]})  
                        }
                    })
                })
                this.state.sunday.event.forEach(e => {
                    if(e.all_services === true){
                    this.setState({sunday_event: [...this.state.sunday_event, e]}) 
                    }
                })

            })
            .catch(err =>
                console.log(err)
            );

        axios
            .get(url+`myAlfred/api/serviceUser/${id}`)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser});
                let prestations = serviceUser.prestations;
                let arrayFilter =  [];
                prestations.forEach(e => {
                    arrayFilter.push(e.prestation.filter_presentation);
                    let uniqFilter = _.uniqBy(arrayFilter,'label');
                    this.setState({uniqFilter: uniqFilter});
                });
                this.setState({options:serviceUser.option})
                this.setState({service: serviceUser.service})
                this.setState({equipments: serviceUser.equipments});
                this.setState({prestations: serviceUser.prestations})
                this.state.uniqFilter.forEach(e =>{
                    this.setState({[e.label]:false})
                });
                const lat = serviceUser.service_address.gps.lat;
                const lng = serviceUser.service_address.gps.lng;
                this.setState({position: [lat,lng]})
            })
            .catch(err =>
                console.log(err)
            );
    }

    handleclick1(label) {
        this.setState({[label]: false });
    }

    handleclick2 (label) {
        this.setState({[label]: true });
    }

    handleclickoption1 =() => {
        this.setState({ dropsoption: false });
    }

    handleclickoption2 =() => {
        this.setState({ dropsoption: true });
    }



    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {shop} = this.state;
        const {serviceUser} = this.state;
        const {service} = this.state;
        const drop = this.state.drops;
        const dropoption = this.state.dropsoption;
        const {uniqFilter} = this.state;
        const {equipments} = this.state;
        const {prestations} = this.state;
        const {options} = this.state;
        const {monday_event} = this.state;
        const {tuesday_event} = this.state;
        const {wednesday_event} = this.state;
        const {thursday_event} = this.state;
        const {friday_event} = this.state;
        const {saturday_event} = this.state;
        const {sunday_event} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        {/*Le Header */}
                        <Grid container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,height:'54vh',
                            backgroundSize:"cover",justifyContent:"center",alignItems:"center",marginRight: "1%",marginLeft: "1%",}}>

                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'98%',zIndex:500,height:'54vh',marginRight: "1%",marginLeft: "1%"}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'20%',left:'0',right:'0',marginLeft:'auto',marginRight:'auto',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px',}} alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'0',right:'0',marginLeft:'auto',marginRight:'auto',top:'38%',zIndex:502,textAlign: 'center'}}>
                        <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.35rem'}}>{service.label}</p>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.1rem'}}>par {user.firstname} ({serviceUser.perimeter} kms)</p>
                        </Grid>

                        {/*Le Contenu */}
                        <Grid container>
                        
                        {/*Contenu à Gauche*/}

                            {/*Petite Description*/}
                            <Grid item md={6} xs={12} style={{textAlign: 'left',margin: '0 auto',}}>
                                <div style={{margin: '20px 11%', marginTop: '5%',width: '75%'}}></div>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h2 style={{fontSize: '1.6rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>{service.label}</h2>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.grosHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Typography style={{fontSize: '1rem' }}>
                                       {serviceUser.description}
                                    </Typography>
                                {/*Mes équipements*/}
                                <div style={{marginTop: '8%'}}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h3 style={{fontSize: '1.35rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>
                                                Je fournis :
                                            </h3>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.fournitureHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Grid container>
                                        {equipments.map((e)=>(<React.Fragment>
                                            <Grid item xs={1} style={{ marginLeft: '1.5%'}}><img src={'../'+ e.logo2}/></Grid>
                                        </React.Fragment>))}
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </div>

                                <div style={{marginTop: '8%'}}>

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h3 style={{fontSize: '1.35rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>
                                                Disponibilité :
                                            </h3>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.disponibilityHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Grid container>
                                        {/*<Grid item xs={1} style={{}}></Grid>*/}
                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Lundi :  <br/>
                                        {monday_event.map((e)=>(
                                            <React.Fragment>
                                                
                                                 {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Mardi :  <br/>
                                        {tuesday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Mercredi :  <br/>
                                        {wednesday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Jeudi :  <br/>
                                        {thursday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Vendredi :  <br/>
                                        {friday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Samedi :  <br/>
                                        {saturday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={2} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}}>
                                         <Typography>
                                             Dimanche :  <br/>
                                        {sunday_event.map((e)=>(
                                            <React.Fragment>

                                                {moment(e.begin).format('LT')} - {moment(e.end).format('LT')}<br/>
                                                
                                            </React.Fragment>
                                        ))}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </div>

                                {/*cadre avec couleur et checkbox*/}
                                <div style={{marginTop: '8%', marginBottom: '8%'}}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h3 style={{fontSize: '1.35rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>
                                                Conditions d'annulation :
                                            </h3>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.conditionsHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} style={{margin: '4% 0'}}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    {this.state.flexible2 ? <img src="../../static/checkboxes/roundBlueFull.png" width={'35%'}/> : <img src="../../static/checkboxes/roundBlue.png" width={'35%'}/>}
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{ fontSize: '1rem',}}>
                                                        <span style={{fontWeight:'bolder'}}>Flexibles</span> - Remboursement intégral jusqu’à un jour avant la prestation
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{margin: '4% 0'}}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    {this.state.moderate2 ? <img src="../../static/checkboxes/roundSkyblueFull.png" width={'35%'}/> : <img src="../../static/checkboxes/roundSkyblue.png" width={'35%'}/>}
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{ fontSize: '1rem',}}>
                                                        <span style={{fontWeight:'bolder'}}>Modérées</span> - Remboursement intégral jusqu’à 5 jours avant la prestations
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{margin: '4% 0'}}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    {this.state.strict2 ? <img src="../../static/checkboxes/roundRedFull.png" width={'35%'}/> : <img src="../../static/checkboxes/roundRed.png" width={'35%'}/> }
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography style={{ fontSize: '1rem',}}>
                                                        <span style={{fontWeight:'bolder'}}>Strictes</span> - Remboursement intégral jusqu’à 10 jours avant la prestation
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                    </Grid>
                                </div>

                                {/*Map Perimeters*/}
                                <div style={{marginTop: '8%', marginBottom: '8%'}}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h3 style={{fontSize: '1.35rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>
                                                Mon périmètre d'intervention :
                                            </h3>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.perimeterHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Grid container>
                                        {/*<Grid item xs={2}></Grid>*/}
                                        <Grid item xs={6}>
                                            <Typography>{serviceUser.perimeter} km à partir de l'adresse principale</Typography>

                                            <MapComponent position={this.state.position}/>


                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>
                                </div>

                               
                                        
                                            

                                   
                            </Grid>

                            {/*Contenu à droite*/}
                            <Grid item xs={12} md={5} style={{marginTop: '2%', marginBottom: '5%'}}>
                                <Grid container style={{border: 'thin solid #dedede',maxWidth: '80%',marginLeft:'14%'}}>
                                    <Grid item xs={12}><Typography style={{marginTop: '4%' ,marginBottom: '1%' ,marginLeft: '4%' ,color: 'gray', fontSize:'0.9rem'}}>Type de prestation</Typography></Grid>
                                    
                                    {uniqFilter.map(z =>{
                                    return (
                                    <React.Fragment>
                                    <Grid item xs={12} style={{marginBottom: '2%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>
                                        {this.state[z.label] ?
                                        <React.Fragment> 
                                            <span onClick={()=>{this.handleclick1(z.label)}} style={{cursor:'pointer'}}>
                                                <img style={{marginRight: '2%'}} width="13px" src="../../static/stars/arrowDown.png"/>
                                                {z.label}
                                            </span>
                                        </React.Fragment> : 
                                        <React.Fragment> 
                                            <span onClick={()=>{this.handleclick2(z.label)}} style={{cursor:'pointer'}}>
                                                <img style={{marginRight: '2%',transform: 'rotate(-90deg)'}} width="13px" src="../../static/stars/arrowDown.png"/>
                                                {z.label}
                                            </span>
                                        </React.Fragment>}                                         
                                        </Typography>
                                    </Grid>

                                   {this.state[z.label] ?<React.Fragment>
                                    <Grid item xs={1}></Grid>
                                    {prestations.map(d=>{
                                    if(d.prestation.filter_presentation.label !== z.label){return null}
                                    else{
                                        return(

                                        
                                    <React.Fragment>
                                    <Grid item xs={4} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                        {d.price}€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.6rem"}}>
                                                            /{d.billing}
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography>{d.prestation.label}</Typography>     
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    </React.Fragment>)}})}
                                    <Grid item xs={1}></Grid>

                                    
                                    <Grid item xs={12}></Grid>   
                                    <Grid item xs={2}></Grid><Grid item xs={8}><hr style={{marginTop:'8%', backgroundColor:'#dedede', border: '1px solid transparent'}} ></hr></Grid><Grid item xs={2}></Grid></React.Fragment> : null} </React.Fragment>)})}


                                    <Grid item xs={12} style={{marginBottom: '2%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>
                                        {dropoption ?
                                        <React.Fragment> 
                                            <span onClick={this.handleclickoption1} style={{cursor:'pointer'}}>
                                                <img width="13px" style={{marginRight: '2%'}} src="../../static/stars/arrowDown.png"/>
                                                Option/Supplément
                                            </span>
                                        </React.Fragment> : 
                                        <React.Fragment>
                                            <span onClick={this.handleclickoption2} style={{cursor:'pointer'}}>
                                                <img style={{marginRight: '2%',transform: 'rotate(-90deg)'}} width="13px" src="../../static/stars/arrowDown.png"/>
                                                Option/Supplément
                                            </span>
                                        </React.Fragment>}                                         
                                            
                                        </Typography>
                                    </Grid>

                                    {dropoption ?
                                    <React.Fragment>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={4} style={{marginTop: '6%'}}>
                                        <Grid container>
                                            
                                            <Grid item xs={2} style={{borderBottom: 'solid #dedede'}}>
                                                <Typography>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                        {options.price}€
                                                        </Grid>
                                                        <Grid item xs={12} style={{fontSize:"0.6rem"}}>
                                                            /{options.unity}({options.option_extra})
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography>{options.label}</Typography>     
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    </React.Fragment>
                                    : null}

                                    <Grid item xs={2}></Grid><Grid item xs={8}><hr style={{marginTop:'8%', backgroundColor:'#dedede', border: '1px solid transparent'}} ></hr></Grid><Grid item xs={2}></Grid>

                                    <Grid item xs={12} style={{marginBottom: '2%', marginTop:'7%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00'}}>Conditions de réservation</Typography>
                                        <Grid container>
                                        <Grid item xs={1}>
                                            <img src="../../static/iconspreview/cart.png" style={{marginLeft: '20%'}} width={30}></img>
                                        </Grid>
                                        <Grid item xs={1} style={{maxWidth: '30px'}}></Grid>
                                        <Grid item xs={10}><Typography>Panier minimum : {serviceUser.minimum_basket}€</Typography></Grid>



                                        <Grid item xs={1}>
                                            <img src="../../static/iconspreview/calendar.png" style={{marginLeft: '22%'}} width={30}></img>
                                        </Grid>
                                        <Grid item xs={1} style={{maxWidth: '30px'}}></Grid>
                                        <Grid item xs={8}><Typography>{serviceUser.deadline_before_booking} de délai de prévenance</Typography></Grid>
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



export default withStyles(styles)(services);
