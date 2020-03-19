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

class serviceByService extends React.Component {

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

    static getInitialProps ({ query: { service, gps } }) {
        return { service: service, gps:gps }

    }

    componentDidMount() {
        const service = this.props.service;

        axios.get(url+'myAlfred/api/serviceUser/all')
            .then(res => {
                let serviceUser = res.data;
                let finalServiceUser = [];
                const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                sorted.forEach((s,index) => {
                    if(s.service._id == service){
                        finalServiceUser.push(sorted[index])
                    }
                });
                this.setState({serviceUser: finalServiceUser});
            })
            .catch(err => console.log(err))
    }

    search() {
        const service = this.props.service;
        axios.get(url+'myAlfred/api/serviceUser/all')
            .then(res => {
                let serviceUser = res.data;
                let finalServiceUser = [];
                const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                    ['desc','desc','desc','desc','desc']);
                sorted.forEach((s,index) => {
                    if(s.service._id == service){
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
                                            <Typography onClick={()=> this.yes()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem',paddingTop: 13, height: 45,}}>Statut</Typography>
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
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem',paddingTop: 13, height: 45, }}>Statut</Typography>
                                        </Grid>
                                    }
                                    {this.state.clickeddate ?
                                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography onClick={()=> this.yes2()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13, height: 45,}}>Quelle(s) date(s) ?</Typography>
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
                                        <Grid item xs={5} md={3} onClick={()=> this.yes2()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem', paddingTop: 13, height: 45}}>Quelle(s) date(s) ?</Typography>
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
                                                <CardPreview services={a} gps={gps} needAvatar={true} />
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


export default withStyles(styles)(serviceByService);
