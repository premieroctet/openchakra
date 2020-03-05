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
import styled from 'styled-components';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import DatePicker,{registerLocale,setDefaultLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import Select2 from "react-select";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { toast } from 'react-toastify';
registerLocale('fr', fr);
const _ = require('lodash');

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;
const FilledButton = styled.div`
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #2FBCD3;
    margin-right: 5px;
    margin-top: 3px;
    margin-left: 3px;
`;

const styles = theme => ({
    bigContainer: {
        marginTop: 55,
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
    bottombar:{ [theme.breakpoints.up('md')]: {
            display: 'none',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{ position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            display: 'none'
        }},
    respbg:{
        [theme.breakpoints.up('md')]: {
            height: '48.5vh!important',
        }},
    respcard:{
        width:'140%',
        [theme.breakpoints.up('md')]: {
            width:'115%!important',
        }
    }




});

class addAvailability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            availability: {},

            monday_event: [],
            tuesday_event: [],
            wednesday_event: [],
            thursday_event: [],
            friday_event: [],
            saturday_event: [],
            sunday_event: [],

            active: false,
            month_begin: "",
            month_end: "",

            monday_begin: "",
            tuesday_begin: "",
            wednesday_begin: "",
            thursday_begin: "",
            friday_begin: "",
            saturday_begin: "",
            sunday_begin: "",

            monday_end: "",
            tuesday_end: "",
            wednesday_end: "",
            thursday_end: "",
            friday_end: "",
            saturday_end: "",
            sunday_end: "",

            monday_service: null,
            tuesday_service: null,
            wednesday_service: null,
            thursday_service: null,
            friday_service: null,
            saturday_service: null,
            sunday_service: null,

            monday_all_service: false,
            tuesday_all_service: false,
            wednesday_all_service: false,
            thursday_all_service: false,
            friday_all_service: false,
            saturday_all_service: false,
            sunday_all_service: false,

            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            all_service: [],

            all_begin: '',
            all_end: '',
            recurrent_service: null,
            recurrent_all_service: false,

        };
        this.handleChecked=this.handleChecked.bind(this);
        this.handleChecked2=this.handleChecked2.bind(this);
        this.handleClickMonday=this.handleClickMonday.bind(this);
        this.deleteMonday=this.deleteMonday.bind(this);
        this.handleClickTuesday=this.handleClickTuesday.bind(this);
        this.deleteTuesday=this.deleteTuesday.bind(this);
        this.handleClickWednesday=this.handleClickWednesday.bind(this);
        this.deleteWednesday=this.deleteWednesday.bind(this);
        this.handleClickThursday=this.handleClickThursday.bind(this);
        this.deleteThursday=this.deleteThursday.bind(this);
        this.handleClickFriday=this.handleClickFriday.bind(this);
        this.deleteFriday=this.deleteFriday.bind(this);
        this.handleClickSaturday=this.handleClickSaturday.bind(this);
        this.deleteSaturday=this.deleteSaturday.bind(this);
        this.handleClickSunday=this.handleClickSunday.bind(this);
        this.handleClickAll=this.handleClickAll.bind(this);
        this.deleteSunday=this.deleteSunday.bind(this);





    }



    componentDidMount() {



        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({userId: user._id});
                if(user.is_alfred === false) {
                    Router.push('/creaShop/creaShop');
                } else {
                    this.setState({user:user});
                    axios
                        .get(url+'myAlfred/api/shop/currentAlfred')
                        .then(res => {
                            let shop = res.data;
                            this.setState({shop:shop});
                        })
                        .catch();


                    axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
                        .then(res => {
                            let data = res.data;
                            this.setState({all_service: data})
                        })
                        .catch()

                }
            })
            .catch(err => {
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

    handleChangeSelectRecurrent = recurrent_service => {
        this.setState({recurrent_service});

    };

    handleChangeSelectMonday = monday_service => {
        this.setState({monday_service});

    };

    handleChangeSelectTuesday = tuesday_service => {
        this.setState({tuesday_service})
    };

    handleChangeSelectWednesday = wednesday_service => {
        this.setState({wednesday_service})
    };

    handleChangeSelectThursday = thursday_service => {
        this.setState({thursday_service})
    };

    handleChangeSelectFriday = friday_service => {
        this.setState({friday_service})
    };

    handleChangeSelectSaturday = saturday_service => {
        this.setState({saturday_service})
    };

    handleChangeSelectSunday = sunday_service => {
        this.setState({sunday_service})
    };

    handleChecked () {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleChecked2 () {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if(this.state.active !== true) {
            this.setState({month_begin: '',month_end:''})
        }

    }

    handleChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClickAll() {
        if(moment(this.state.all_end).isBefore(moment(this.state.all_begin)) || this.state.all_begin ==="" || this.state.all_end ===""){
            toast.error('Erreur, heure de fin antérieure à l\'heure de début');
        } else {
            let arrayService = [];
            if (this.state.recurrent_service != null) {
                this.state.recurrent_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.all_begin,
                end: this.state.all_end,
                services: arrayService,
                all_services: this.state.recurrent_all_service

            };


            if(this.state.monday) {
                this.state.monday_event.push(obj);
            }
            if(this.state.tuesday) {
                this.state.tuesday_event.push(obj);
            }
            if(this.state.wednesday) {
                this.state.wednesday_event.push(obj);
            }
            if(this.state.thursday) {
                this.state.thursday_event.push(obj);
            }
            if(this.state.friday) {
                this.state.friday_event.push(obj);
            }
            if(this.state.saturday) {
                this.state.saturday_event.push(obj);
            }
            if(this.state.sunday) {
                this.state.sunday_event.push(obj);
            }

            toast.info('Créneau ajouté');

            this.setState({monday:false, tuesday:false, wednesday:false, thursday:false, friday:false, saturday:false, sunday:false,
                all_begin: '', all_end: '', recurrent_service: null, recurrent_all_service: false})
        }
    };

    handleClickMonday() {
        if(moment(this.state.monday_end).isBefore(moment(this.state.monday_begin)) || this.state.monday_begin ==="" || this.state.monday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.monday_service != null) {
                this.state.monday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.monday_begin,
                end: this.state.monday_end,
                services: arrayService,
                all_services: this.state.monday_all_service

            };
            this.state.monday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({monday_begin: '', monday_end: '', monday_service: null, monday_all_service: false})
        }
    }

    deleteMonday(id) {
        let array = [...this.state.monday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({monday_event: array});
    }

    handleClickTuesday() {
        if(moment(this.state.tuesday_end).isBefore(moment(this.state.tuesday_begin))|| this.state.tuesday_begin ==="" || this.state.tuesday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.tuesday_service != null) {
                this.state.tuesday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.tuesday_begin,
                end: this.state.tuesday_end,
                services: arrayService,
                all_services: this.state.tuesday_all_service

            };
            this.state.tuesday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({tuesday_begin: '', tuesday_end: '', tuesday_service: null, tuesday_all_service: false})
        }
    }

    deleteTuesday(id) {
        let array = [...this.state.tuesday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({tuesday_event: array});
    }

    handleClickWednesday() {
        if(moment(this.state.wednesday_end).isBefore(moment(this.state.wednesday_begin))|| this.state.wednesday_begin ==="" || this.state.wednesday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.wednesday_service != null) {
                this.state.wednesday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.wednesday_begin,
                end: this.state.wednesday_end,
                services: arrayService,
                all_services: this.state.wednesday_all_service

            };
            this.state.wednesday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({wednesday_begin: '', wednesday_end: '', wednesday_service: null, wednesday_all_service: false})
        }
    }

    deleteWednesday(id) {
        let array = [...this.state.wednesday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({wednesday_event: array});
    }

    handleClickThursday() {
        if(moment(this.state.thursday_end).isBefore(moment(this.state.thursday_begin))|| this.state.thursday_begin ==="" || this.state.thursday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.thursday_service != null) {
                this.state.thursday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.thursday_begin,
                end: this.state.thursday_end,
                services: arrayService,
                all_services: this.state.thursday_all_service

            };
            this.state.thursday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({thursday_begin: '', thursday_end: '', thursday_service: null, thursday_all_service: false})
        }
    }

    deleteThursday(id) {
        let array = [...this.state.thursday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({thursday_event: array});
    }

    handleClickFriday() {
        if(moment(this.state.friday_end).isBefore(moment(this.state.friday_begin))|| this.state.friday_begin ==="" || this.state.friday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.friday_service != null) {
                this.state.friday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.friday_begin,
                end: this.state.friday_end,
                services: arrayService,
                all_services: this.state.friday_all_service

            };
            this.state.friday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({friday_begin: '', friday_end: '', friday_service: null, friday_all_service: false})
        }
    }

    deleteFriday(id) {
        let array = [...this.state.friday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({friday_event: array});
    }

    handleClickSaturday() {
        if(moment(this.state.saturday_end).isBefore(moment(this.state.saturday_begin))|| this.state.saturday_begin ==="" || this.state.saturday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.saturday_service != null) {
                this.state.saturday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.saturday_begin,
                end: this.state.saturday_end,
                services: arrayService,
                all_services: this.state.saturday_all_service

            };
            this.state.saturday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({saturday_begin: '', saturday_end: '', saturday_service: null, saturday_all_service: false})
        }
    }

    deleteSaturday(id) {
        let array = [...this.state.saturday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({saturday_event: array});
    }

    handleClickSunday() {
        if(moment(this.state.sunday_end).isBefore(moment(this.state.sunday_begin))|| this.state.sunday_begin ==="" || this.state.sunday_end ===""){
            toast.error('Erreur, vérifiez vos horaires');
        } else {


            let arrayService = [];
            if (this.state.sunday_service != null) {
                this.state.sunday_service.forEach(w => {
                    const servObj = { label: w.label, value: w.value };
                    arrayService.push(servObj);

                });
            }
            const obj = {
                begin: this.state.sunday_begin,
                end: this.state.sunday_end,
                services: arrayService,
                all_services: this.state.sunday_all_service

            };
            this.state.sunday_event.push(obj);
            toast.info('Créneau ajouté');

            this.setState({sunday_begin: '', sunday_end: '', sunday_service: null, sunday_all_service: false})
        }
    }

    deleteSunday(id) {
        let array = [...this.state.sunday_event];
        const index = _.findIndex(array,['begin',id]);

        array.splice(index,1);
        this.setState({sunday_event: array});
    }


    onSubmit =() => {



        const data = {
            active : this.state.active,
            month_begin : this.state.month_begin,
            month_end : this.state.month_end,
            monday_event : this.state.monday_event,
            tuesday_event : this.state.tuesday_event,
            wednesday_event : this.state.wednesday_event,
            thursday_event : this.state.thursday_event,
            friday_event : this.state.friday_event,
            saturday_event : this.state.saturday_event,
            sunday_event : this.state.sunday_event
        };



        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.post(url+'myAlfred/api/availability/add',data)
            .then(() => {
                toast.info('Disponibilité ajoutée avec succès !');
                Router.push('/myShop/myAvailabilities');
            })
            .catch(() => {
                toast.error('Erreur');
            })

    };



    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {monday_event} = this.state;
        const {tuesday_event} = this.state;
        const {wednesday_event} = this.state;
        const {thursday_event} = this.state;
        const {friday_event} = this.state;
        const {saturday_event} = this.state;
        const {sunday_event} = this.state;
        const {all_service} = this.state;

        const optionsService = all_service.map(service => ({
            label: service.service.label,
            value: service.service._id
        }));







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
                                <Link href={'/reservations/messages'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                <Link href={'/reservations/allReservations'}>
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
                                <Link href={'/performances/revenus'}>
                                    <a style={{textDecoration:'none'}}>
                                        <p style={{color: "white",cursor: 'pointer'}}>Performances</p>
                                    </a>
                                </Link>
                            </Grid>

                        </Grid>
                        <Grid container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                            backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>



                        </Grid>
                        <Grid className={classes.respbg} item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh'}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'27%',left:'0%',right:'0%', margin: 'auto',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px',objectFit:'cover'}}  alt={'picture'}/>
                        </Grid>
                    </Grid>


                    <Grid container style={{marginTop: 20,paddingLeft:30}}>
                        <Grid item md={8} xs={12}>

                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Récurrent
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                        <Grid container>
                                            <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                <Grid container style={{paddingLeft:20}}>
                                                    <h4>Ajouter une disponibilité</h4>
                                                </Grid>
                                                <Grid container style={{paddingLeft: 20}}>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.monday}
                                                                    onChange={this.handleChecked}
                                                                    value={'monday'}
                                                                    color="primary"
                                                                    name={'monday'}
                                                                />
                                                            }
                                                            label="Lundi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.tuesday}
                                                                    onChange={this.handleChecked}
                                                                    value={'tuesday'}
                                                                    color="primary"
                                                                    name={'tuesday'}
                                                                />
                                                            }
                                                            label="Mardi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.wednesday}
                                                                    onChange={this.handleChecked}
                                                                    value={'wednesday'}
                                                                    color="primary"
                                                                    name={'wednesday'}
                                                                />
                                                            }
                                                            label="Mercredi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.thursday}
                                                                    onChange={this.handleChecked}
                                                                    value={'thursday'}
                                                                    color="primary"
                                                                    name={'thursday'}
                                                                />
                                                            }
                                                            label="Jeudi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.friday}
                                                                    onChange={this.handleChecked}
                                                                    value={'friday'}
                                                                    color="primary"
                                                                    name={'friday'}
                                                                />
                                                            }
                                                            label="Vendredi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.saturday}
                                                                    onChange={this.handleChecked}
                                                                    value={'saturday'}
                                                                    color="primary"
                                                                    name={'saturday'}
                                                                />
                                                            }
                                                            label="Samedi"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={5} md={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.sunday}
                                                                    onChange={this.handleChecked}
                                                                    value={'sunday'}
                                                                    color="primary"
                                                                    name={'sunday'}
                                                                />
                                                            }
                                                            label="Dimanche"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{paddingLeft:20}}>
                                                    <Grid item item xs={12} sm={6}>
                                                        <Grid container style={{alignItems:"center"}}>
                                                            <Grid item xs={3}>
                                                                <p>De :</p>
                                                            </Grid>
                                                            <Grid item xs={9}>
                                                                <DatePicker
                                                                    selected={this.state.all_begin}
                                                                    onChange={date => this.setState({all_begin:date})}
                                                                    locale='fr'
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={15}
                                                                    timeCaption="Début"
                                                                    dateFormat="HH:mm"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Grid container style={{alignItems:"center"}}>
                                                            <Grid item xs={3}>
                                                                <p>A :</p>
                                                            </Grid>
                                                            <Grid item xs={9}>
                                                                <DatePicker
                                                                    selected={this.state.all_end}
                                                                    onChange={date => this.setState({all_end:date})}
                                                                    locale='fr'
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={15}
                                                                    timeCaption="Fin"
                                                                    dateFormat="HH:mm"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                    <FormControl  style={{ width: '100%' }}>
                                                        <Select2
                                                            value={this.state.recurrent_service}
                                                            onChange={this.handleChangeSelectRecurrent}
                                                            options={optionsService}
                                                            isMulti
                                                            isSearchable
                                                            closeMenuOnSelect={false}
                                                            isDisabled={this.state.recurrent_all_service}
                                                            placeholder={'Sélectionnez vos services'}
                                                            noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={this.state.recurrent_all_service}
                                                                onChange={this.handleChecked}
                                                                value={'recurrent_all_service'}
                                                                color="primary"
                                                                name={'recurrent_all_service'}
                                                            />
                                                        }
                                                        label="Tous les services"
                                                    />
                                                </Grid>
                                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                    <Button type="button" onClick={() => this.handleClickAll()} variant="contained"
                                                            color="primary" style={{ width: '100%',color:"white" }}>
                                                        Ajouter le créneau horaire
                                                    </Button>
                                                </Grid>
                                            </Card>
                                        </Grid>



                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Lundi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {monday_event.map((e,index)=> (

                                                <Grid item xs={4} key={index}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205,
                                                            minWidth: 270
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteMonday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.monday_begin}
                                                                        onChange={date => this.setState({monday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.monday_end}
                                                                        onChange={date => this.setState({monday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.monday_service}
                                                                onChange={this.handleChangeSelectMonday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.monday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.monday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={'monday_all_service'}
                                                                    color="primary"
                                                                    name={'monday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickMonday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Mardi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {tuesday_event.map((e,index)=> (

                                                <Grid item xs={4} key={index}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteTuesday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.tuesday_begin}
                                                                        onChange={date => this.setState({tuesday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.tuesday_end}
                                                                        onChange={date => this.setState({tuesday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.tuesday_service}
                                                                onChange={this.handleChangeSelectTuesday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.tuesday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.tuesday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={'tuesday_all_service'}
                                                                    color="primary"
                                                                    name={'tuesday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickTuesday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Mercredi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {wednesday_event.map(e=> (

                                                <Grid item xs={4}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205,
                                                            minWidth: 270
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteWednesday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.wednesday_begin}
                                                                        onChange={date => this.setState({wednesday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.wednesday_end}
                                                                        onChange={date => this.setState({wednesday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.wednesday_service}
                                                                onChange={this.handleChangeSelectWednesday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.wednesday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.wednesday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={this.state.wednesday_all_service}
                                                                    color="primary"
                                                                    name={'wednesday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickWednesday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Jeudi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {thursday_event.map(e=> (

                                                <Grid item xs={4}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205,
                                                            minWidth: 270
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteThursday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.thursday_begin}
                                                                        onChange={date => this.setState({thursday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.thursday_end}
                                                                        onChange={date => this.setState({thursday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.thursday_service}
                                                                onChange={this.handleChangeSelectThursday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.thursday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.thursday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={this.state.thursday_all_service}
                                                                    color="primary"
                                                                    name={'thursday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickThursday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>



                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Vendredi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {friday_event.map(e=> (

                                                <Grid item xs={4}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205,
                                                            minWidth: 270
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteFriday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.friday_begin}
                                                                        onChange={date => this.setState({friday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.friday_end}
                                                                        onChange={date => this.setState({friday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.friday_service}
                                                                onChange={this.handleChangeSelectFriday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.friday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.friday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={this.state.friday_all_service}
                                                                    color="primary"
                                                                    name={'friday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickFriday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Samedi
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {saturday_event.map(e=> (

                                                <Grid item xs={4}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205,
                                                            minWidth: 270
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteSaturday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.saturday_begin}
                                                                        onChange={date => this.setState({saturday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.saturday_end}
                                                                        onChange={date => this.setState({saturday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.saturday_service}
                                                                onChange={this.handleChangeSelectSaturday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.saturday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.saturday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={this.state.saturday_all_service}
                                                                    color="primary"
                                                                    name={'saturday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickSaturday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "100%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{ fontSize: 20, flexBasis: "33.33%", flexShrink: 0 }}
                                        >
                                            Dimanche
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                            {sunday_event.map(e=> (

                                                <Grid item xs={4} style={{minWidth: 270}}>
                                                    <Card
                                                        style={{
                                                            padding: "2rem",
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginRight: '1rem',
                                                            minHeight: 205
                                                        }}
                                                    >
                                                        {e.services.length !== 0 ?
                                                            e.services.map(service =>
                                                                (
                                                                    <Typography
                                                                        style={{
                                                                            textAlign: "center",
                                                                            marginBottom: "1rem"
                                                                        }}
                                                                    >
                                                                        {service.label}
                                                                    </Typography>
                                                                )) :
                                                            <Typography
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginBottom: "1rem"
                                                                }}
                                                            >
                                                                Tous les services
                                                            </Typography>
                                                        }
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                justifyContent: "space-between",
                                                                marginBottom: "1rem"
                                                            }}
                                                        >
                                                            <Typography>{moment(e.begin).format('LT')}</Typography>
                                                            <Typography>-</Typography>
                                                            <Typography>{moment(e.end).format('LT')}</Typography>
                                                        </div>
                                                        <div style={{display: 'flex', justifyContent: "center"}}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{color:"white"}}
                                                                onClick={()=>this.deleteSunday(e.begin)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            <Grid container>
                                                <Card style={{width:'100%',marginTop:15, minWidth: 270}}>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <h4>Ajouter une disponibilité</h4>
                                                    </Grid>
                                                    <Grid container style={{paddingLeft:20}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>De :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.sunday_begin}
                                                                        onChange={date => this.setState({sunday_begin:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Début"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Grid container style={{alignItems:"center"}}>
                                                                <Grid item xs={3}>
                                                                    <p>A :</p>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <DatePicker
                                                                        selected={this.state.sunday_end}
                                                                        onChange={date => this.setState({sunday_end:date})}
                                                                        locale='fr'
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Fin"
                                                                        dateFormat="HH:mm"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={10} style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControl  style={{ width: '100%' }}>
                                                            <Select2
                                                                value={this.state.sunday_service}
                                                                onChange={this.handleChangeSelectSunday}
                                                                options={optionsService}
                                                                isMulti
                                                                isSearchable
                                                                closeMenuOnSelect={false}
                                                                isDisabled={this.state.sunday_all_service}
                                                                placeholder={'Sélectionnez vos services'}
                                                                noOptionsMessage={()=>'Plus d\'options disponibles'}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item style={{marginTop:20,paddingLeft:20}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.sunday_all_service}
                                                                    onChange={this.handleChecked}
                                                                    value={this.state.sunday_all_service}
                                                                    color="primary"
                                                                    name={'sunday_all_service'}
                                                                />
                                                            }
                                                            label="Tous les services"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                                        <Button type="button" onClick={() => this.handleClickSunday()} variant="contained"
                                                                color="primary" style={{ width: '100%',color:"white" }}>
                                                            Ajouter le créneau horaire
                                                        </Button>
                                                    </Grid>
                                                </Card>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                            <Grid container style={{marginLeft:20}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.active}
                                            onChange={this.handleChecked2}
                                            value={this.state.active}
                                            color="primary"
                                            name={'active'}
                                        />
                                    }
                                    label="Répéter pour une période ?"
                                />

                                {this.state.active ?

                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <Grid container style={{alignItems:"center"}}>
                                                <Grid item xs={3}>
                                                    <p>Du :</p>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <DatePicker
                                                        selected={Date.parse(this.state.month_begin)}
                                                        onChange={date => this.setState({month_begin:date})}
                                                        locale='fr'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        dateFormat="dd/MM/yyyy"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container style={{alignItems:"center"}}>
                                                <Grid item xs={3}>
                                                    <p>Au :</p>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <DatePicker
                                                        selected={Date.parse(this.state.month_end)}
                                                        onChange={date => this.setState({month_end:date})}
                                                        locale='fr'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        dateFormat="dd/MM/yyyy"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    : null}
                            </Grid>
                            <Grid container style={{marginTop:20,paddingLeft:20,marginBottom:20}}>

                                <Button onClick={()=>this.onSubmit()} variant={"contained"} color={"primary"} style={{color:"white",marginRight:20}}>Enregistrer</Button>

                            </Grid>




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
                        <Link href={'/reservations/messages'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/reservations/allReservations'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center",zIndex:999, borderBottom: '3px solid #4fbdd7'}}>
                        <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                    <Grid item xs={2} style={{textAlign:"center"}}>
                        <Link href={'/performances/revenus'}><a style={{textDecoration:'none'}}>
                            <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                        </a></Link>
                    </Grid>

                </Grid>
                {/* <Footer/>*/}


            </Fragment>
        );
    };
}



export default withStyles(styles)(addAvailability);



