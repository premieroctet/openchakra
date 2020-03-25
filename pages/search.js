import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import Footer from '../hoc/Layout/Footer/Footer';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import Router from "next/dist/client/router";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import StarRatings from 'react-star-ratings';
import 'react-dates/lib/css/_datepicker.css';
import Tooltip from '@material-ui/core/Tooltip';
import CardPreview from '../components/CardPreview/CardPreview';
import AlgoliaPlaces from "algolia-places-react";
import SearchInput from '../components/SearchInput/SearchInput';
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn'
import BecomeAlfred from '../components/home/BecomeAlfred/BecomeAlfred';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
import Homeheader from '../components/home/Homeheader/Homeheader';
import FeelingGood from '../components/home/feelingGood/feelingGood';
import Wellbeing from '../components/home/Wellbeing/Wellbeing';
import Proposeservice from '../components/home/proposeservice/Proposeservice';
import Assureback from '../components/home/AssureBack/Assureback';
import Section3 from '../components/home/section3';
import Section6 from '../components/home/section6';
import Section8 from '../components/home/section8';
import Passions from '../components/home/Passions/passions';
import Facons from '../components/home/Facons/facons';
import Otter from '../components/home/Otter/otter';
import Section10 from '../components/home/section10';
import Section12 from '../components/home/section12';
import Section15 from '../components/home/section15';
import Section16 from '../components/home/section16';
import Section18 from '../components/home/section18';
import Section19 from '../components/home/section19';
import Section21 from '../components/home/section21';
import Section22 from '../components/home/section22';


const geolib = require('geolib');
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
    mobilevoir: {
        [theme.breakpoints.up("md")]: {
            display: "none!important"
        }
    },
    webvoir: {
        [theme.breakpoints.down("sm")]: {
            display: "none!important"
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

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searched:false,
            user: null,
            address: {},
            otherAddress: [],
            selectedAddress: {},
            city: '',
            gps: null,
            categories: [],
            serviceUsers: [],
            serviceUsersDisplay: [],
            keyword: '',
            proSelected: false, // Filtre professionnel
            individualSelected: false, // Filtre particulier
            startDate: null,
            endDate: null,
            focusedInput: null,
            statusFilterVisible:false,
            dateFilterVisible:false,
        };
        this.needReasearch = this.needReasearch.bind(this)
    }

    static getInitialProps ({ query: { keyword, city, date, dateISO, day, hour, gps, address, category, service, prestation} }) {
      // FIX : set city nin AlgoPlaces if provided
      var init= { keyword: keyword, city:city, date:date, dateISO: dateISO,day:day, hour:hour, gps:gps, address:address, category:category, service:service, prestation:prestation}
      console.log("InitialProps:"+JSON.stringify(init));
      return init;
    }

    onChangeCity({suggestion}) {
      this.setState({gps:suggestion.latlng, city: suggestion.name});
    };

    componentDidUpdate(prevProps) {
      if (this.props!== prevProps) {
        this.search();
      }
    }
    componentDidMount() {
       console.log("Did mount");
        var st={
          keyword:'keyword' in this.props ? this.props.keyword : '',
          gps:'gps' in this.props ? JSON.parse(this.props.gps) : null,
          city:this.props.city || '',
        };
        if ('category' in this.props) {
          st['category']=this.props.category;
        }
        if ('service' in this.props) {
          st['service']=this.props.service;
        }
        if ('prestation' in this.props) {
          st['prestation']=this.props.prestation;
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                st['user']=user;
                st['address']=user.billing_address;
                st['selectedAddress']='address' in this.props && this.props.address ? JSON.parse(this.props.address) : user.billing_address;
                st['otherAddress']=user.service_address;
                if (!st['gps']) {
                  st['gps']=user.billing_address.gps;
                }
                this.setState(st, () => this.search());
            })
            .catch(err => { console.log(err); }
            );
    }

    onChange = e => {
        var {name, value} = e.target;
        this.setState({ [e.target.name]: e.target.value });
        if (name === 'selectedAddress') {
          console.log("Selected:"+JSON.stringify(value));
          this.setState({gps: value === 'all'?null: 'gps' in value ? value.gps : {'lat':value['lat'], 'lng':value['lng']}})
        }
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

    // Filter according to pro or particular && dates
    filter() {
      // Filter only if a search was already done
      if (this.state.searched) {
        this.search();
      }
    }

     search() {
        console.log("Searching");
        const address = this.state.selectedAddress;
        var filters={}
        // GPS
        if (this.state.gps) {
            filters['gps']=this.state.gps;
        }

       // Keyword search disables cat/ser/presta filter
       if (this.state.keyword) {
         filters['keyword']=this.state.keyword;
       }
       else {
         // Category
         if (this.props.category) {
           filters['category']=this.props.category;
         }

         // Service
         if (this.props.service) {
           filters['service']=this.props.service;
         }
         // Prestation
         if (this.props.prestation) {
           filters['prestation']=this.props.prestation;
         }
       }

       axios.post('/myAlfred/api/serviceUser/search', filters)
         .then(res => {
           let serviceUsers = res.data;
           console.log("Got SU:"+serviceUsers.length);
           /**
              serviceUsers = _.orderBy(serviceUsers,['level','number_of_views','graduated','is_certified','user.creation_date'],
              ['desc','desc','desc','desc','desc']);
           */
           this.setState({serviceUsers:serviceUsers, serviceUsersDisplay:serviceUsers});
           axios.get(url+'myAlfred/api/category/all/sort')
             .then(res => {
               let categories = res.data;
               var catCount={}
               categories.forEach(e => {
                 catCount[e.label]=0;
                 serviceUsers.forEach(a => {
                   if(a.service.category === e._id){
                     catCount[e.label]=catCount[e.label]+1;
                   }
                 })
               })
               this.setState({...catCount, categories:categories});
             }
             )
             .catch(err => console.log(err));
             this.setState({searched:true});
           })
           .catch(err => console.log(err));
    }

    statusFilterToggled(){
      this.setState({statusFilterVisible: !this.state.statusFilterVisible});
    }

    dateFilterToggled(){
      this.setState({dateFilterVisible: !this.state.dateFilterVisible});
    }

     cancelDateFilter(){
       this.setState({startDate:null,endDate:null,filterDateVisible:false});
     }

     validateDateFilter(){
       this.setState({filterDateVisible:false});
     }

    needReasearch = data =>{
        this.setState({keyword : data}, () => this.search())
    }

    render() {
        console.log("Rendering");
        const {classes} = this.props;
        const {user, categories, gps} = this.state;
        var keyword = this.state.keyword;
        const serviceUsers = this.state.serviceUsersDisplay;
        keyword = keyword ? keyword.trim() : '';


        return (
          <Fragment>
            <Layout search={this.needReasearch}>
              <Grid container className={classes.bigContainer}>
                <Grid container className={classes.respfilter} style={{position: 'sticky', top: 60, zIndex: 10, background: 'white', height: 60}}>
                  <Grid item xs={12} style={{height: 50}}>
                    <Grid container>
                      {this.state.statusFilterVisible ?
                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                          <Typography onClick={()=> this.statusFilterToggled()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13, height:43}}>Statut</Typography>
                            <Grid id="status" item xs={12}  style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', height: '100px', marginTop: 8,padding:10,zIndex: 1}}>
                              <Grid container>
                                <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                  {this.state.individualSelected ? <Grid item xs={3}></Grid> :
                                    <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                              checked={this.state.proSelected}
                                              onChange={e=>{this.handleChange(e);this.filter()}}
                                              value={this.state.proSelected}
                                              color="primary"
                                              name={'proSelected'}
                                          />
                                        }
                                          label="Pro"
                                      />
                                      </Grid>
                                  }
                                  </Grid>
                                  <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                    {this.state.proSelected ? null :
                                      <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                        <FormControlLabel
                                          control={
                                            <Switch
                                                checked={this.state.individualSelected}
                                                onChange={e=>{this.handleChange(e);this.filter()}}
                                                value={this.state.individualSelected}
                                                color="primary"
                                                name={'individualSelected'}
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
                          <Grid item xs={5} md={3} onClick={()=> this.statusFilterToggled()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                              <Typography style={{textAlign: 'center', fontSize: '0.8rem', height:43,paddingTop: 13}}>Statut</Typography>
                          </Grid>
                      }
                        {this.state.dateFilterVisible ?
                          <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                            <Typography onClick={()=> this.dateFilterToggled()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem',paddingTop:13,height:43}}>Quelle(s) date(s) ?</Typography>
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
                                          <Button style={{fontSize: '0.8rem',}} onClick={()=>this.validateDateFilter()}>Valider</Button>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                            :
                          <Grid item xs={5} md={3} onClick={()=> this.dateFilterToggled()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                              <Typography style={{textAlign: 'center', fontSize: '0.8rem',paddingTop:13,height:43 }}>Quelle(s) date(s) ?</Typography>
                          </Grid>
                        }
                        </Grid>
                       </Grid>
                  </Grid>
                  { /* END FILTER PANEL */ }
                  <Grid container>
                    <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Que recherchez-vous {user?user.firstname:''} ?</h3>
                  </Grid>
                    <Grid container className="scrollLittle" style={{overflowX: 'scroll', whiteSpace: 'nowrap', display: 'inline-block', minHeight: '250px'}}>
                      {categories.map((cat, index) => (
                        <Grid key={index} style={{display: 'inline-block', width: '300px', margin: 'auto 20px'}}>
                          <Link href={'/search?category='+cat._id} activeClassName="active">
                            <Card  style={{width: '300px', margin: '20px auto', borderRadius: '35px', height: '250px'}} className={classes.card}>
                              <CardActionArea>
                                <CardMedia
                                    style={{height:200}}
                                    image={cat.picture}
                                    title={cat.label}
                                />
                                <CardContent style={{padding: '5px'}}>
                                  <Typography gutterBottom style={{fontSize: '1.1rem', textAlign: 'center'}}>
                                      {cat.label}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                      <Grid container>
                        <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Nos meilleurs Alfred ...</h3>
                          {/* Adresse spécifique  */
                          categories.map(cat => (
                            <Grid container>
                              {this.state[cat.label] !== 0 ?
                                <Grid item xs={12}>
                                  <h3 style={{marginLeft:15}}>{cat.label}</h3>
                                </Grid> : null
                              }
                                <Grid container spacing={2} style={{marginLeft: 15, marginRight : 15}}>
                                {serviceUsers.map(su => {
                                  if (su.service.category._id === cat._id) {
                                    return (
                                      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                        <CardPreview services={su} alfred={user} gps={gps} needAvatar={true}/>
                                      </Grid>
                                    )
                                  } else {
                                    return null
                                  }
                                })}
                                </Grid>
                                {this.state[cat.label] !== 0 ?
                                    <hr style={{width: '10%', margin: 'auto', border:'none', height: '10px', marginBottom: '80px', marginTop: '55px', backgroundColor: '#2FBCD3'}} />
                                    : null}

                              </Grid>
                            ))}
                          </Grid>
                          {this.state.serviceUsers.length === 0 ?
                            <p>Aucun résultat</p>
                            :
                            null
                          }
                 </Grid>
                <SerenityNeed gps={gps}/>
                <BecomeAlfred />
                <Section3 gps={gps}/>
                <NearbyYou gps={gps}/>
                <Profiteandlearn gps={gps}/>
                <Section6 gps={gps}/>
                <Wellbeing gps={gps}/>
                <Section8 gps={gps}/>
                <FeelingGood gps={gps}/>
                <Section10 gps={gps}/>
                <Proposeservice />
                <Section12 gps={gps}/>
                <NearbyYou gps={gps}/>
                <Passions/>
                <Section15 gps={gps}/>
                <Section16 gps={gps}/>
                <Facons/>
                <Section18 gps={gps}/>
                <Section19 gps={gps}/>
                <Otter/>
                <Section21 gps={gps}/>
                <Section22 gps={gps}/>
                <Assureback/>

                <Footer/>
              </Layout>
            </Fragment>
        )
    }
}


export default withStyles(styles)(SearchPage);
