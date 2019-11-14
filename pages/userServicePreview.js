import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Footer from '../hoc/Layout/Footer/Footer';
import dynamic from 'next/dynamic';
import { border } from 'polished';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker, {registerLocale,setDefaultLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import Tooltip from '@material-ui/core/Tooltip';
registerLocale('fr', fr);






moment.locale('fr');
const _ = require('lodash');
const { config } = require('../config/config');
const url = config.apiUrl;
const MapComponent = dynamic(() => import('../components/map'), {
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
      dispocard:{

     minHeight:'100px',
     width:'200px',
     textAlign:'center',

     boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
     border:'solid 1px #ccc',
     borderRadius:'10px',


      },
       dispocardin:{

     padding:'1%',
      fontSize:'17px',
     fontWeight:'bold',
     marginBottom:10,


      },

      prestationlist:{

        padding:'1%',

        marginBottom:10,
        border:'solid 1px #ccc',
        borderRadius:'5px',


         },
         prestationside:{

            backgroundColor:'#f2f2f2',
            Border:'1px #ccc solid',
            borderRadius:'10px',
            marginRight:'10px',
            marginLeft:'10px',
            height:'30px',


             },

      dispoheader:{

        height:'2%',
        color:'white',
        width:'100%',
        padding:'1%',

        fontSize:'15px',
        textAlign:'center',

        borderRadius:'0px',
        backgroundColor:'#F8727F',
        marginBottom:'20px'


         }
});

const Input2 = ({value,  onClick }) => (
  <Button value={value} color={"inherit"} variant={"outlined"} style={{color:"gray"}} className="example-custom-input" onClick={onClick}>
    {value}
  </Button>

);

class userServices extends React.Component {
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
            haveOptions: false,
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
            all_availabilities: [],
            selectedPrestations: [],
            totalPrice: null,
            total: null,
            grandTotal: null,
            fees: null,
            checkedOption: false,
            optionPrice: null,
            date: Date.now(),
            hour: Date.now(),
        };

        this.handleclick1 = this.handleclick1.bind(this);
        this.handleclick2 = this.handleclick2.bind(this);



    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {
        localStorage.removeItem('prestations');
        localStorage.removeItem('fees');
        localStorage.removeItem('date');
        localStorage.removeItem('hour');


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
                console.log(serviceUser);
                this.setState({serviceUser: serviceUser});
                let prestations = serviceUser.prestations;
                let arrayFilter =  [];
                prestations.forEach(e => {
                    arrayFilter.push(e.prestation.filter_presentation);
                    let uniqFilter = _.uniqBy(arrayFilter,'label');
                    this.setState({uniqFilter: uniqFilter});
                });
                if(serviceUser.option !== undefined){

                    this.setState({options:serviceUser.option,haveOptions:true})
                }
                this.setState({service: serviceUser.service})
                this.setState({equipments: serviceUser.equipments});
                this.setState({prestations: serviceUser.prestations})
                this.state.uniqFilter.forEach(e =>{
                    this.setState({[e.label]:true})
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

    onChange(event, price) {
        let sumArr = [];
        let dummyState = [...this.state.selectedPrestations]
        let fees = null;
        let total = null;
        let grandTotal = null;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        const index = _.findIndex(dummyState, function(p) { return p.name === event.target.name });
        if (index === -1) dummyState.push({ name: event.target.name, value: event.target.value, price: price });
        if (index !== -1) { 
            dummyState[index].value = event.target.value;
        }

        dummyState = _.filter(dummyState, function(f) { return f.value !== "" });
        this.setState({ selectedPrestations: dummyState });

        dummyState.map(prestation => {
            sumArr.push(prestation.price * prestation.value);
        });

        if (!_.isEmpty(sumArr)) {
            fees = 0.09 * (sumArr.reduce(reducer) + this.state.optionPrice);    
            fees = parseFloat(fees.toFixed(2));
            console.log(fees);

            this.setState({ total: sumArr.reduce(reducer) + this.state.optionPrice });
            this.setState({ fees: fees });

            grandTotal = sumArr.reduce(reducer) + fees;

            this.setState({ grandTotal: grandTotal + this.state.optionPrice });
        } else {
            this.setState({ total: null + this.state.optionPrice });
            this.setState({ fees: null });
            this.setState({ grandTotal: null + this.state.optionPrice })
        }

    }

    async handleCheckedOption(price) {
        await this.setState({ checkedOption: !this.state.checkedOption });

        if (this.state.checkedOption === true) {
            let feesTrue = 0.09 * (this.state.total + price);
            feesTrue = parseFloat(feesTrue.toFixed(2));

            let grandTotalTrue = this.state.total + price + feesTrue;
            grandTotalTrue = parseFloat(grandTotalTrue.toFixed(2));
            this.setState({ fees: feesTrue })
            this.setState({ optionPrice: price });
            this.setState({ grandTotal: grandTotalTrue });
        } 
        if (this.state.checkedOption === false) {
            let feesFalse = 0.09 * (this.state.total);
            feesFalse = parseFloat(feesFalse.toFixed(2));

            let grandTotalFalse = this.state.total + feesFalse;
            grandTotalFalse = parseFloat(grandTotalFalse.toFixed(2));
            this.setState({ fees: feesFalse })
            this.setState({ optionPrice: null });
            this.setState({ grandTotal: grandTotalFalse });
        } 

    }

    moreInfos() {
        if (this.state.prestations.length || this.state.fees !== null || this.state.hour !== null || this.state.grandTotal !== null) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.post(url + 'myAlfred/api/chatRooms/addAndConnect', { emitter: this.state.user._id, recipient: this.state.serviceUser.user._id })
                .then(res => {
                    let reference;

                    let name= this.state.user.name;
                    let firstLetterNameUser = name.charAt(0).toUpperCase();
                    let firstname = this.state.user.firstname;
                    let firstLetterFirstnameUser = firstname.charAt(0).toUpperCase();

                    let nameAlfred = this.state.serviceUser.user.name;
                    let firstLetterNameAlfred = nameAlfred.charAt(0).toUpperCase();
                    let firstnameAlfred = this.state.serviceUser.user.firstname;
                    let firstLetterFirstnameAlfred = firstnameAlfred.charAt(0).toUpperCase();

                    const letter = firstLetterNameUser + firstLetterFirstnameUser + firstLetterNameAlfred + firstLetterFirstnameAlfred;
                    const day = new Date().getDate();
                    const month = new Date().getMonth();
                    const year = new Date().getFullYear();

                    reference = letter + '_' + day+month+year;

                    const bookingObj = {
                        reference: reference,
                        service: this.state.service.label,
                        address: this.state.serviceUser.service_address,
                        equipments: this.state.serviceUser.equipments,
                        amount: this.state.grandTotal,
                        date_prestation: moment(this.state.date).format('DD/MM/YYYY'),
                        time_prestation: moment(this.state.hour).format('HH:mm'),
                        alfred: this.state.serviceUser.user._id,
                        user: this.state.user._id,
                        prestations: this.state.selectedPrestations,
                        chatroom: res.data._id,
                        fees: this.state.fees,
                        status: 'Demande d\'infos'
                    }

                    console.log(bookingObj);
                    axios.post(url + 'myAlfred/api/booking/add', bookingObj)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
        } else {
            console.log('res')
        }
    }

    reservationPage() {
        localStorage.setItem('prestations', JSON.stringify(this.state.selectedPrestations));
        localStorage.setItem('fees', this.state.fees);
        localStorage.setItem('date', this.state.date);
        localStorage.setItem('hour', this.state.hour);
        localStorage.setItem('grandTotal', this.state.grandTotal);
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
        const {availability} = this.state;


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
                            <Grid item md={6} xs={12} style={{textAlign: 'left',margin: '0 auto', float:'right'}}>
                                <div style={{margin: '20px 11%', marginTop: '5%',width: '90%'}}></div>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h2 style={{fontSize: '1.6rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold'}}>{service.label} par {user.firstname}</h2>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.fournitureHR}/></Grid>
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
                                        {equipments.map((e,index)=>(<React.Fragment key={index}>
                                            <Grid item xs={1} style={{ marginLeft: '1.5%'}}><img src={'../'+ e.logo2}/></Grid>
                                        </React.Fragment>))}
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </div>

                                <div style={{marginTop: '8%'}}>

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <h3 style={{fontSize: '1.35rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: 'bold',}}>
                                                Disponibilités :
                                            </h3>
                                        </Grid>
                                        <Grid item xs={2} style={{marginTop: '-20px', marginBottom: '15px'}}><hr className={classes.disponibilityHR}/></Grid>
                                        <Grid item xs={5}></Grid>
                                        <Grid item xs={5}></Grid>
                                    </Grid>
                                    <Grid container>
                                        {availability.map((e,index)=> {
                                            if(e.period.active){
                                                return (
                                                    <ExpansionPanel
                                                        style={{ border: "none", boxShadow: "none", width: "70%" }}
                                                    >
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                                        >
                                                            <Typography
                                                                style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                                            >
                                                                Du {moment(e.period.month_begin).format('LL')} au {moment(e.period.month_end).format('LL')}
                                                            </Typography>
                                                            <Typography style={{ fontSize: 12, lineHeight: 3 }}>

                                                            </Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>

                                                            <Grid container>
                                                                {e.monday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Lundi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.monday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.monday.event.map(f=> (

                                                                                        f.services.map(g => {
                                                                                            if (g.value === this.props.service_id) {
                                                                                                return (
                                                                                                    <React.Fragment>

                                                                                                        {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            }

                                                                                        })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Lundi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.tuesday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mardi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.tuesday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.tuesday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mardi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.wednesday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mercredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.wednesday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.wednesday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mercredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.thursday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Jeudi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.thursday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.thursday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })

                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Jeudi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.friday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Vendredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.friday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.friday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Vendredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.saturday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Samedi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.saturday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.saturday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Samedi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.sunday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Dimanche  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.sunday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.sunday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Dimanche  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                                </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }


                                                            </Grid>



                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                )
                                            } else {
                                                return (
                                                    <ExpansionPanel
                                                        style={{ border: "none", boxShadow: "none", width: "70%" }}
                                                    >
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                                        >
                                                            <Typography
                                                                style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                                            >
                                                                Disponibilités sans périodes
                                                            </Typography>
                                                            <Typography style={{ fontSize: 12, lineHeight: 3 }}>
                                                            </Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>

                                                            <Grid container>
                                                                {e.monday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Lundi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.monday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.monday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Lundi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.tuesday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mardi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.tuesday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.tuesday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mardi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.wednesday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mercredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.wednesday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.wednesday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Mercredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.thursday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Jeudi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.thursday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.thursday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Jeudi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.friday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Vendredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.friday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.friday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Vendredi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.saturday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Samedi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.saturday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.saturday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Samedi  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {e.sunday.event.length !== 0 ?

                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Dimanche  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                {e.sunday.event.map(f=> {
                                                                                    if (f.all_services === true) {
                                                                                        return (
                                                                                            <React.Fragment>

                                                                                                {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                            </React.Fragment>
                                                                                        )


                                                                                    }
                                                                                })}
                                                                                {e.sunday.event.map(f=> (

                                                                                    f.services.map(g => {
                                                                                        if (g.value === this.props.service_id) {
                                                                                            return (
                                                                                                <React.Fragment>

                                                                                                    {moment(f.begin).format('LT')} - {moment(f.end).format('LT')}<br/>

                                                                                                </React.Fragment>
                                                                                            )
                                                                                        }

                                                                                    })



                                                                                ))}</div>
                                                                        </Typography>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={3} style={{ marginLeft: '3.5%', marginBottom: '3.5%'}} className={classes.dispocard}>

                                                                        <Typography>
                                                                            <div className={classes.dispoheader}>Dimanche  </div>
                                                                            <br/>
                                                                            <div className={classes.dispocardin} >
                                                                                <p>Aucune disponibilités</p>
                                                                            </div>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                            </Grid>



                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                )
                                            }
                                                })}



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
                                        <Grid item xs={12}>
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
                                <Grid container style={{border: 'thin solid #dedede',maxWidth: '80%',marginLeft:'14%', padding:'2%', position: 'sticky', top: 100,}}>
                                    <Grid item xs={12}>
                                      <Typography style={{marginTop: '4%' ,marginBottom: '2%',marginLeft: '4%' ,color: 'black', fontSize:'1.2rem'}}>Date et heure</Typography>
                                    </Grid>
                                    <Grid container style={{marginTop:20, marginLeft: '4%'}}>
                                      <Grid item xs={6}>
                                        <Grid container style={{alignItems:"center"}}>
                                          <Grid item xs={2}>
                                        <p style={{color:"gray"}}>Le</p>
                                          </Grid>
                                          <Grid item xs={10}>
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={(date)=>this.setState({date:date})}
                                            customInput={<Input2 />}
                                            locale='fr'
                                            showMonthDropdown
                                            dateFormat="dd/MM/yyyy"


                                        />
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                      <Grid item xs={6} >
                                        <Grid container style={{alignItems:"center"}}>
                                          <Grid item xs={2}>
                                            <p style={{color:"gray"}}>À</p>
                                          </Grid>
                                          <Grid item xs={10}>
                                            <DatePicker
                                                selected={this.state.hour}
                                                onChange={(date)=>this.setState({hour:date})}
                                                customInput={<Input2 />}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Heure"
                                                dateFormat="HH:mm"
                                                locale='fr'



                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}><Typography style={{marginTop: '4%' ,marginBottom: '2%',marginLeft: '4%' ,color: 'black', fontSize:'1.2rem'}}>Type de prestation</Typography></Grid>
                                    
                                    {uniqFilter.map(z =>{
                                    return (
                                    <React.Fragment>
                                    <Grid item xs={12} style={{marginBottom: '2%', marginTop: '2%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00', color:'white', minHeight:'40px', padding:'10px', backgroundColor:'gray', borderRadius:5,}}>
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
                                    {prestations.map((d,index)=>{
                                    if(d.prestation.filter_presentation.label !== z.label){return null}
                                    else{
                                        return(

                                        
                                    <React.Fragment>
                                    <Grid item xs={12} style={{marginTop: '2%', marginBottom: '2%', paddingLeft:'4%',}}>
                                        <Grid container>
                                            
                                            <Grid item xs={12}>
                                                <Typography>

                                                    <Grid container className={classes.prestationlist} style={{backgroundColor:'white',padding:'0px', paddingBottom:'15px',  paddingTop:'15px', minHeight:'50px', minWidth:'120px',}}>
                                                    <Grid item xs={1} className={classes.prestationside} >
                                                      <input type="number" name={d.prestation.label} style={{width: '100%'}} onChange={() => this.onChange(event, d.price)} />
                                                   </Grid>

                                            <Grid item xs={5} className={classes.prestationheader} style={{backgroundColor:'white', color:'black', borderBottom:'1px solid white'}}>
                                                <Typography style={{fontSize:"1rem", fontWeight:'bold', color:'black', marginTop:3}}>{d.prestation.label}</Typography>
                                            </Grid>
                                                        <Grid item xs={2}  className={classes.prestationin} style={{fontSize:"1rem", fontWeight:'bold', marginTop:'3px',  padding:'0px',  textAlign:'right'}}>
                                                        {d.price}€
                                                        </Grid>
                                                        <Grid item xs={3} style={{fontSize:"1rem", textAlign:'left', paddingLeft:'10px', marginTop:'3px'}}>
                                                            {d.billing}
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>

                                            
                                        </Grid>
                                    </Grid>
                                    </React.Fragment>)}})}

                                    <Grid item xs={2}></Grid><Grid item xs={8}></Grid><Grid item xs={2}></Grid></React.Fragment> : null} </React.Fragment>)})}

                                    {this.state.haveOptions ?
                                    <Grid item xs={12} style={{marginBottom: '2%', marginTop: '2%'}}>
                                        <Typography style={{marginLeft: '3%' , fontSize:'1.1rem', fontWeight: '5e00', color:'white', minHeight:'40px', padding:'10px', backgroundColor:'gray', borderRadius:5,}}>
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
                                    </Grid> : null}

                                    {dropoption ?
                                    <React.Fragment>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} style={{marginTop: '2%', marginBottom: '2%', paddingLeft:'4%',}}>
                                                <Typography>

                                                    <Grid container className={classes.prestationlist} style={{backgroundColor:'white',padding:'0px', paddingBottom:'15px',  paddingTop:'15px', minHeight:'50px', minWidth:'120px',}}>
                                                    <Grid item xs={1} className={classes.prestationside} >
                                                        <input type="checkbox" checked={this.state.checkedOption} onChange={() => this.handleCheckedOption(options.price)} />
                                                   </Grid>

                                            <Grid item xs={5} className={classes.prestationheader} style={{backgroundColor:'white', color:'black', borderBottom:'1px solid white'}}>
                                                <Typography style={{fontSize:"1rem", fontWeight:'bold', color:'black', marginTop:3}}>{options.label}</Typography>
                                            </Grid>
                                                        <Grid item xs={2}  className={classes.prestationin} style={{fontSize:"1rem", fontWeight:'bold', marginTop:'3px',  padding:'0px',  textAlign:'right'}}>
                                                            {options.price}€
                                                        </Grid>
                                                        <Grid item xs={3} style={{fontSize:"1rem", textAlign:'left', paddingLeft:'10px', marginTop:'3px'}}>
                                                            {options.unity} <Tooltip title={options.option_extra}><span style={{color: '#07bce5', cursor: 'pointer'}}>?</span></Tooltip>   
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    </React.Fragment>
                                    : null}

                                    <Grid item xs={2}></Grid><Grid item xs={8}></Grid><Grid item xs={2}></Grid>
                                    <hr style={{width: '100%', margin: '1rem 0'}} />

                                    {this.state.selectedPrestations.map(presta => {
                                        if (presta.value == 0 || presta.value === null || presta.value === "") {
                                            return null;
                                        } else {
                                            return <p>{presta.value}x {presta.name} {presta.value * presta.price}€</p>
                                        }
                                    })}
                                    <p>Options : {this.state.optionPrice === null ? 0 : this.state.optionPrice}€</p>
                                    <p>Frais de service : {this.state.fees === null ? 0 : this.state.fees}€</p>

                                    <p>TOTAL : {this.state.grandTotal === null ? 0 : this.state.grandTotal}€</p>

                                    <hr style={{width: '100%', margin: '1rem 0'}} />
                                    <Grid item xs={12} style={{marginBottom: '2%'}}>
                                        <Typography style={{marginLeft: '4%' , marginBottom: '2%', fontSize:'1.2rem', fontWeight: '5e00'}}>Conditions de réservation</Typography>
                                        <Grid container>
                                        <Grid item xs={1}>
                                            <img src="../../static/iconspreview/cart.png" style={{marginLeft: '20%'}} width={30}></img>
                                        </Grid>
                                        <Grid item xs={1} style={{maxWidth: '30px'}}></Grid>
                                        <Grid item xs={10}><Typography style={{ marginBottom: '2%', fontSize:'1.1rem'}}>Panier minimum : {serviceUser.minimum_basket}€</Typography></Grid>



                                        <Grid item xs={1}>
                                            <img src="../../static/iconspreview/calendar.png" style={{marginLeft: '22%'}} width={30}></img>
                                        </Grid>
                                        <Grid item xs={1} style={{maxWidth: '30px'}}></Grid>
                                        <Grid item xs={8}><Typography style={{ marginBottom: '2%', fontSize:'1.1rem'}}>{serviceUser.deadline_before_booking} de délai de prévenance</Typography></Grid>
                                        </Grid>
                                        <Grid>
                                            <button 
                                                //disabled={}
                                                onClick={() => this.moreInfos()}
                                            >
                                                Demande d'infos
                                            </button>
                                            <Link href={{ pathname: '/confirmPayement', query: {id: this.props.service_id }}}>
                                                <button 
                                                    onClick={() => this.reservationPage()}
                                                >
                                                    Réserver
                                                </button>
                                            </Link>
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



export default withStyles(styles)(userServices);
