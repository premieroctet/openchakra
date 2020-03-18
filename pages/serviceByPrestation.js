import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import Footer from '../hoc/Layout/Footer/Footer';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import StarRatings from 'react-star-ratings';
import CardPreview from '../components/CardPreview/CardPreview';

import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import 'react-dates/initialize';
import {DateRangePicker} from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import '../static/overridedate.css';


const _ = require('lodash');

const { config } = require('../config/config');
const url = config.apiUrl;
moment.locale('fr');
const styles = theme => ({
    bigContainer: {
        marginTop: 80,
        minHeight: 530
    },
    card: {
        margin: 20,
    },
    media: {
        height: "250px!important",
        position: 'relative',
        objectFit: 'cover',
    },
    respfilter:{
        [theme.breakpoints.down('sm')]: {
            top: 200,
        }
    },
    DateInput_input__focused:{
        borderBottom: '1px solid #fb1515!important',
    },
    algol: {
        fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
        '::placeholder':{
            color: '#cfcfcf',
        },
        '&:hover':{
            border: '1px solid black!important',
            transition: 'border 0.5s',
        },
        '&:focus':{
            border: '2px solid #2FBCD3!important',
            transition: 'border 0.5s',
        }
    }
});

class serviceByPrestation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            allCategories: [],
            showCategories: false,
            serviceUser: [],
            copyService: [],
            copyFilterPro: [],
            copyFilterParticulier: [],
            uniqShop: [],
            idAlfred: [],
            checkedB: false,
            checkedParticulier: false,
            clickedstatut:false,
            clickeddate: false,
            startDate: null,
            endDate: null,
        }
    }

    static getInitialProps ({ query: { prestation, gps } }) {
        return { prestation: prestation, gps:gps }

    }

    componentDidMount() {
        const prestation = this.props.prestation;

        axios.get(url+'myAlfred/api/serviceUser/all')
            .then(res => {
                let serviceUser = res.data;
                let finalServiceUser = [];
                const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                sorted.forEach((s,index) => {
                            const index1 = s.prestations.findIndex(i => i.prestation == prestation);

                            if(index1 !== -1) {
                                finalServiceUser.push(sorted[index])
                            }
                });
                this.setState({serviceUser: finalServiceUser});
            })
            .catch(err => console.log(err))
    }

    search() {
        const prestation = this.props.prestation;
        axios.get(url+'myAlfred/api/serviceUser/all')
            .then(res => {
                let serviceUser = res.data;
                let finalServiceUser = [];
                const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                sorted.forEach((s,index) => {
                    const index1 = s.prestations.findIndex(i => i.prestation == prestation);

                    if(index1 !== -1) {
                        finalServiceUser.push(sorted[index])
                    }
                });
                this.setState({serviceUser: finalServiceUser});
            })
            .catch(err => console.log(err))
    }

    yes(){
        if(this.state.clickedstatut == true)
        {
            this.setState({clickedstatut: false});
        } else {
            this.setState({clickedstatut: true});
        }
    }

    yes2(){
        if(this.state.clickeddate == true)
        {
            {/*this.fadeOutDate();*/}
            this.setState({clickeddate: false});
        } else {
            {/*this.fadeInDate();*/}
            this.setState({clickeddate: true});
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

    async filter(){
        const serviceUser = await this.state.serviceUser;
        if( this.state.checkedB){
            setTimeout(() => {
                const serviceFilter = [];
                serviceUser.forEach(s => {
                    if(s.status === 'Pro'){
                        serviceFilter.push(s)
                    }
                });
                const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                this.setState({serviceUser: sorted, copyFilterPro: sorted});
            },2000)
        } else {
            setTimeout(() => {
                this.search();
            },2000)
        }
    }

    async filterParticulier(){
        const serviceUser = await this.state.serviceUser;
        if( this.state.checkedParticulier){
            setTimeout(() => {
                const serviceFilter = [];
                serviceUser.forEach(s => {
                    if(s.status === 'Particulier'){
                        serviceFilter.push(s)
                    }
                });
                const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                this.setState({serviceUser: sorted, copyFilterParticulier: sorted});
                this.state.allCategories.forEach(e => {
                    this.setState({[e.label]:0});
                    this.state.serviceUser.forEach(a => {
                        if(a.service.category === e._id){
                            this.setState(prevState => {
                                return {[e.label]: prevState[e.label] + 1}
                            })

                        }
                    })
                })
            },2000)
        } else {
            setTimeout(() => {

                this.search()
            },2000)
        }
    }

    async filterDate(){

        const serviceUser = this.state.serviceUser;
        const begin = this.state.startDate;
        const end = this.state.endDate;
        const beginDay =  moment(begin).format('dddd');
        const endDay =  moment(end).format('dddd');
        const obj = {begin,end,beginDay,endDay};

        axios.post(url+'myAlfred/api/availability/filterDate',obj)
            .then(response => {
                let availability = response.data;
                const idAlfred = [];
                const services = [];
                availability.forEach(a => {
                    idAlfred.push(a.user);
                });
                serviceUser.forEach(w => {

                    const index = idAlfred.findIndex(i => i == w.user._id);
                    if(index !== -1){
                        services.push(w);
                    }
                });
                this.setState({serviceUser:services,filterDate:true});
                this.state.allCategories.forEach(e => {
                    this.setState({[e.label]:0});
                    this.state.serviceUser.forEach(a => {
                        if(a.service.category === e._id){
                            this.setState(prevState => {
                                return {[e.label]: prevState[e.label] + 1}
                            })
                        }
                    })
                })
            })
            .catch(err => console.log(err));
    }

    cancelDateFilter(){
        this.setState({startDate:null,endDate:null,filterDate:false});
        if(this.state.checkedB){
            this.setState({serviceUser:this.state.copyFilterPro});

        } else if(this.state.checkedParticulier){
            this.setState({serviceUser:this.state.copyFilterParticulier});
        } else {

            this.search()
        }
    }

    render() {
        const {classes} = this.props;
        const serviceUser = this.state.serviceUser;
        const gps=this.props.gps?JSON.parse(this.props.gps) : '';
        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container style={{boxShadow: 'rgba(51, 51, 51, 0.31) 0px 5px 7px -5px', paddingBottom: '10px', paddingTop: '10px', position: 'sticky', top: '50px', backgroundColor: 'white', zIndex: 11}}>

                                <Grid container>
                                    {this.state.clickedstatut ?
                                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography onClick={()=> this.yes()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13,height:45}}>Statut</Typography>
                                            <Grid item xs={12} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', height: '100px', marginTop: 8, zIndex: 1}}>
                                                <Grid container>
                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        {this.state.checkedParticulier ? <Grid item xs={3}></Grid> :

                                                            <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={this.state.checkedB}
                                                                            onChange={e=>{this.handleChange(e);this.filter()}}
                                                                            value={this.state.checkedB}
                                                                            color="primary"
                                                                            name={'checkedB'}
                                                                        />
                                                                    }
                                                                    label="Pro"
                                                                />
                                                            </Grid>
                                                        }
                                                    </Grid>

                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        {this.state.checkedB ? null :

                                                            <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={this.state.checkedParticulier}
                                                                            onChange={e=>{this.handleChange(e);this.filterParticulier()}}
                                                                            value={this.state.checkedParticulier}
                                                                            color="primary"
                                                                            name={'checkedParticulier'}
                                                                        />
                                                                    }
                                                                    label="Particulier"
                                                                />
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid item xs={5} md={3} onClick={()=> this.yes()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem',  paddingTop: 13,height:45}}>Statut</Typography>
                                        </Grid>
                                    }
                                    {this.state.clickeddate ?
                                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer',  height: '45px', margin: 10}}>
                                            <Typography onClick={()=> this.yes2()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13,height:45}}>Quelle(s) date(s) ?</Typography>
                                            <Grid id="thedate" item xs={12} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', height: 'auto', marginTop: 8,zIndex: 1, padding: 10}}>
                                                <Grid container>
                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        <DateRangePicker
                                                            style={{width: '50px'}}
                                                            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                                            startDatePlaceholderText={'Début'}
                                                            endDatePlaceholderText={'Fin'}
                                                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                                            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                                            minimumNights={0}
                                                            numberOfMonths={1}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <Button style={{fontSize: '0.8rem',}} onClick={()=>this.cancelDateFilter()}>Annuler</Button>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Button style={{fontSize: '0.8rem',}} onClick={()=>this.filterDate()}>Valider</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid item xs={5} md={3} onClick={()=> this.yes2()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer',  height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem', paddingTop: 13,height:45}}>Quelle(s) date(s) ?</Typography>
                                        </Grid>
                                    }
                                </Grid>

                        </Grid>

                        <Grid container style={{paddingLeft:25}}>
                            <Grid container>
                                <Grid container>


                                    <Grid container style={{padding: '25px'}}>
                                        {serviceUser.map(a => (


                                            <Grid item md={3} sm={6} xs={12}>
                                                <CardPreview services={a} gps={gps} needAvatar={true}/>
                                                <Card className={classes.card} style={{height: '420px'}}>
                                                    <CardMedia
                                                        className={classes.media}
                                                        style={{height:150}}
                                                        image={a.service.picture}
                                                        title={a.service.label}
                                                    >
                                                        <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+a.user.picture}/>
                                                        {a.service_address.city != undefined ?
                                                            <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white',fontWeight:600, textShadow:'0px 0px 3px black',bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                    <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="white" fill-rule="evenodd"/>
                                                                </svg>
                                                                {' ' + a.service_address.city}
                                                            </Typography>: null}
                                                        {a.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                    </CardMedia>
                                                    <CardContent style={{height: 'auto'}}>
                                                        <Grid container>
                                                            <Grid item xs={7}>

                                                                <Typography style={{fontSize: '1rem'}}>
                                                                    {a.service.label} par {a.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                </Typography>
                                                                <StarRatings
                                                                    rating={a.user.score}
                                                                    starRatedColor={"#2FBCD3"}
                                                                    numberOfStars={5}
                                                                    name='rating'
                                                                    starDimension={'20px'}
                                                                    starHoverColor={'#2FBCD3'}
                                                                    starSpacing={'3px'}
                                                                />
                                                                <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({a.user.number_of_reviews})</span>
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                                <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {a.minimum_basket}€</Typography>
                                                                <Link href={"/userServicePreview?id="+ a._id}>
                                                                    <Button alt={a.service._id} variant="contained" color="primary"
                                                                            style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                        Réserver
                                                                    </Button>
                                                                </Link>
                                                            </Grid>
                                                        </Grid>
                                                        {a.graduated == true || a.is_certified == true || a.level != 0 ?
                                                            <Grid container style={{marginTop: '20px', marginBottom: '-15px'}}>
                                                                {a.graduated == true ?
                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                        <Tooltip title="Diplomé">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21.305" height="18.675" viewBox="0 0 26.305 23.675">
                                                                                <g id="Groupe_1739" data-name="Groupe 1739" transform="translate(0 -24)">
                                                                                    <g id="Groupe_1597" data-name="Groupe 1597" transform="translate(0 24)">
                                                                                        <g id="Groupe_1596" data-name="Groupe 1596" transform="translate(0 0)">
                                                                                            <path id="Tracé_13252" data-name="Tracé 13252" d="M24.551,24H4.384a1.754,1.754,0,0,0-1.754,1.754V39.783H.438A.438.438,0,0,0,0,40.221a1.754,1.754,0,0,0,1.754,1.754H14.468v5.261a.438.438,0,0,0,.748.31l2.321-2.321,2.321,2.321a.438.438,0,0,0,.31.128.433.433,0,0,0,.168-.033.438.438,0,0,0,.271-.405V41.975h1.315a1.754,1.754,0,0,0,1.754-1.754V26.192h2.192a.438.438,0,0,0,.438-.438A1.754,1.754,0,0,0,24.551,24Zm-.759,1.315a.877.877,0,0,1,1.518,0Z" transform="translate(0 -24)" fill="#f87280"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1599" data-name="Groupe 1599" transform="translate(13.345 32.336)">
                                                                                        <g id="Groupe_1598" data-name="Groupe 1598" transform="translate(0 0)">
                                                                                            <path id="Tracé_13253" data-name="Tracé 13253" d="M251.837,181.493l-.562-1.006.564-1.005a.438.438,0,0,0-.167-.6l-.033-.017-1.047-.479-.135-1.144a.438.438,0,0,0-.487-.384l-.033.005-1.13.224-.782-.847a.452.452,0,0,0-.639,0l-.005,0-.782.847-1.13-.224a.438.438,0,0,0-.515.345q0,.017-.005.033l-.135,1.144-1.046.48a.438.438,0,0,0-.216.581q.008.017.017.033l.564,1-.564,1.005a.438.438,0,0,0,.167.6l.033.017,1.046.48.135,1.145a.438.438,0,0,0,.487.384l.033-.005,1.13-.224.782.847a.438.438,0,0,0,.62.024l.024-.024.782-.847,1.13.224a.432.432,0,0,0,.343-.075.438.438,0,0,0,.175-.3l.135-1.144,1.047-.48a.438.438,0,0,0,.216-.581C251.848,181.515,251.843,181.5,251.837,181.493Zm-1.446-.792.451.8-.838.384a.438.438,0,0,0-.253.347l-.108.918-.906-.179a.432.432,0,0,0-.407.132l-.626.679-.626-.678a.438.438,0,0,0-.322-.141.4.4,0,0,0-.085.009l-.906.179-.108-.918a.438.438,0,0,0-.253-.347l-.838-.384.451-.8a.43.43,0,0,0,0-.429v0l-.451-.8.838-.384a.438.438,0,0,0,.253-.347l.108-.918.906.179a.434.434,0,0,0,.407-.132l.626-.68.626.678a.432.432,0,0,0,.407.132l.906-.179.108.918a.438.438,0,0,0,.253.347l.838.385-.451.8A.439.439,0,0,0,250.39,180.7Z" transform="translate(-243.512 -176.109)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1601" data-name="Groupe 1601" transform="translate(15.345 34.522)">
                                                                                        <g id="Groupe_1600" data-name="Groupe 1600" transform="translate(0 0)">
                                                                                            <path id="Tracé_13254" data-name="Tracé 13254" d="M282.192,216a2.192,2.192,0,1,0,2.192,2.192A2.192,2.192,0,0,0,282.192,216Zm0,3.507a1.315,1.315,0,1,1,1.315-1.315A1.315,1.315,0,0,1,282.192,219.507Z" transform="translate(-280 -216)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1603" data-name="Groupe 1603" transform="translate(9.852 26.657)">
                                                                                        <g id="Groupe_1602" data-name="Groupe 1602" transform="translate(0 0)">
                                                                                            <rect id="Rectangle_2272" data-name="Rectangle 2272" width="6" transform="translate(0.148 0.388)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1605" data-name="Groupe 1605" transform="translate(5.254 29.284)">
                                                                                        <g id="Groupe_1604" data-name="Groupe 1604" transform="translate(0 0)">
                                                                                            <rect id="Rectangle_2273" data-name="Rectangle 2273" width="16" height="1" transform="translate(-0.254 -0.239)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1607" data-name="Groupe 1607" transform="translate(5.254 31.255)">
                                                                                        <g id="Groupe_1606" data-name="Groupe 1606" transform="translate(0 0)">
                                                                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="16" height="1" transform="translate(-0.254 -0.209)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Groupe_1609" data-name="Groupe 1609" transform="translate(5.911 36.509)">
                                                                                        <g id="Groupe_1608" data-name="Groupe 1608" transform="translate(0 0)">
                                                                                            <rect id="Rectangle_2275" data-name="Rectangle 2275" width="5" height="2" transform="translate(0.089 -0.463)" fill="#fff"/>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                        </Tooltip>
                                                                    </Grid>
                                                                    : null}
                                                                {a.is_certified == true ?
                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                        <Tooltip title="Certifié">
                                                                            <svg id="Groupe_1737" data-name="Groupe 1737" xmlns="http://www.w3.org/2000/svg" width="15.673" height="21.846" viewBox="0 0 22.673 28.846">
                                                                                <g id="Groupe_1069" data-name="Groupe 1069" transform="translate(0)">
                                                                                    <path id="Tracé_11017" data-name="Tracé 11017" d="M48.308,10.2,46.114,7.936l.442-3.123a.894.894,0,0,0-.731-1.006l-3.107-.545L41.239.476A.894.894,0,0,0,40.057.091L37.223,1.476,34.389.091a.894.894,0,0,0-1.183.384L31.728,3.263l-3.107.545a.894.894,0,0,0-.731,1.006l.442,3.123L26.138,10.2a.894.894,0,0,0,0,1.244l2.193,2.267-.442,3.125a.894.894,0,0,0,.731,1.006l2.487.436v9.671a.894.894,0,0,0,1.294.8l4.822-2.41,4.821,2.41a.894.894,0,0,0,1.294-.8V18.281l2.487-.436a.894.894,0,0,0,.731-1.006l-.442-3.125,2.193-2.267A.894.894,0,0,0,48.308,10.2ZM37.623,24.542a.894.894,0,0,0-.8,0L32.9,26.505V20.591l.31.585a.894.894,0,0,0,1.183.384l2.834-1.386,2.833,1.386a.894.894,0,0,0,1.183-.384l.31-.585v5.914Z" transform="translate(-25.886 0)" fill="#f87280"/>
                                                                                    <path id="Tracé_11018" data-name="Tracé 11018" d="M75.792,39.507a6.115,6.115,0,1,0,6.115,6.115A6.122,6.122,0,0,0,75.792,39.507Zm0,10.442a4.327,4.327,0,1,1,4.326-4.328A4.332,4.332,0,0,1,75.792,49.949Z" transform="translate(-64.455 -34.797)" fill="#fff"/>
                                                                                    <path id="Tracé_11019" data-name="Tracé 11019" d="M98.045,69.831,95.4,72.472l-1.005-1a.894.894,0,1,0-1.264,1.265l1.637,1.636a.894.894,0,0,0,1.264,0L99.309,71.1a.894.894,0,0,0-1.264-1.265Z" transform="translate(-84.885 -61.274)" fill="#fff"/>
                                                                                </g>
                                                                            </svg>
                                                                        </Tooltip>
                                                                    </Grid>
                                                                    : null}
                                                                {a.level != 0 ?
                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                        {a.level == 1 ?
                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                    <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                        </g>
                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                    </g>
                                                                                </svg>
                                                                            </Tooltip>
                                                                            :null}{a.level == 2 ?
                                                                        <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                            <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                    </g>
                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                </g>
                                                                            </svg>
                                                                        </Tooltip>
                                                                        : null} {a.level == 3 ?
                                                                        <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                            <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                    </g>
                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                </g>
                                                                            </svg>
                                                                        </Tooltip>
                                                                        : null} {a.level == 4 ?
                                                                        <Tooltip title="Plus de 10 ans d'expérience">
                                                                            <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                    </g>
                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                </g>
                                                                            </svg>
                                                                        </Tooltip>
                                                                        :null}
                                                                    </Grid>
                                                                    : null}
                                                            </Grid> : null}
                                                    </CardContent>
                                                </Card>
                                            </Grid>

                                        ))}
                                        {!serviceUser.length ?
                                            <p>Aucun résultat</p>
                                            : null}
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Footer/>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(serviceByPrestation);
