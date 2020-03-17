import React, { Fragment } from 'react';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
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
import CardPreview from '../CardPreview/CardPreview';

const geolib = require('geolib');
const _ = require('lodash');

const { config } = require('../../config/config');
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

class searchLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            address: {},
            otherAddress: [],
            addressSelected: {},
            categories: [],
            serviceUser: [],
            lat: null,
            lng: null,
            research: '',
            prestations: [],
            services: [],
            resultCategory: [],
            uniqCategory: [],
            uniqCategoryService: [],
            uniqService: [],
            uniqShop: [],
            prestationOk: false,
            serviceOk: false,
            categoryOk: [],
            idAlfred: [],
            proSelected: false, // Filtre professionnel
            individualSelected: false, // Filtre particulier
            startDate: null,
            endDate: null,
            focusedInput: null,
            statusFilterVisible:false,
            dateFilterVisible:false,
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({
                  user:user,
                  address: user.billing_address,
                  addressSelected: user.billing_address,
                  otherAddress: user.service_address,
                });
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

    onChange = e => {
        var {name, value} = e.target;
        console.log("onChange:"+name, value);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

     search() {
        this.setState({serviceUser:[],services:[],uniqCategory:[],uniqCategoryService:[], individualSelected:false,idAlfred:[]});
        const address = this.state.addressSelected;
        var filters={}
        // GPS
        if(address.gps !== undefined){
            this.setState({lat:address.gps.lat, lng: address.gps.lng});
            filters['gps']=address.gps;
        } else if(address==='all') {
            this.setState({lat:this.state.address.gps.lat, lng: this.state.address.gps.lng});
        } else {
            filters['gps']=address;
            this.setState({lat:address.lat,lng: address.lng});
 
      }
       // Keyword
       if (this.state.research) {
         filters['keyword']=this.state.research;
       }

       // Dates
       if (this.state.startDate) {
         filters['startDate']=this.state.startDate;
       }
       if (this.state.endDate) {
         filters['endDate']=this.state.endDate;
       }

       // Status : pro or individual
       if (this.state.individualSelect) {
         filters['individual']=this.state.individualSelected;
       }
       if (this.state.proSelected) {
         filters['professional']=this.state.proSelected;
       }

       axios.post('/myAlfred/api/serviceUser/search', filters)
         .then(res => {
           let serviceUsers = res.data;
           console.log("Got service:"+JSON.stringify(serviceUsers[0], null, 2));
           serviceUsers = _.orderBy(serviceUsers,['level','number_of_views','graduated','is_certified','user.creation_date'],
              ['desc','desc','desc','desc','desc']);
           this.setState({serviceUser:serviceUsers});
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

     keyPress(e) {
       if(e.keyCode === 13){
         this.search();
       }
     }



    render() {
        const {classes} = this.props;
        const {address} = this.state;
        const {user} = this.state;
        const {otherAddress} = this.state;
        var {research} = this.state;
        const categories = this.state.categories;
        const serviceUser = this.state.serviceUser;

        research = research.trim();  
        //console.log("state:"+JSON.stringify(this.state, null, 2));

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container style={{boxShadow: 'rgba(51, 51, 51, 0.31) 0px 5px 7px -5px', paddingBottom: '10px', paddingTop: '10px', position: 'sticky', top: '55px', backgroundColor: 'white', zIndex: 11}}>
                            <Grid item xs={4} style={{textAlign: 'center',width: '100%', margin: 'auto', color: '#545659' }}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        style:{height: 40, color: '#545659'},
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder={'Quel service ?'}
                                    variant={"outlined"}
                                    value={this.state.research}
                                    style={{width: '100%', margin: 'auto'}}
                                    onChange={(event)=>{this.setState({research: event.target.value});}}
                                    onKeyDown={(e)=>this.keyPress(e)}
                                />
                            </Grid>
                            <Grid item xs={4} style={{fontFamily: 'Helvetica Neue, Helvetica,sans-serif',width: '100%', margin: 'auto'}}>
                            <TextField
                            InputProps={{
                                style:{height: 40},
                            }}
                                    id="outlined-select-currency"
                                    select
                                    style={{width:'100%', marginTop: '6px'}}
                                    value={this.state.addressSelected}
                                    name={'addressSelected'}
                                    onChange={(e) => {this.onChange(e);}}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value={address}>
                                        Adresse principale, <em> {' '+address.address} {address.zip_code},{address.city}</em>
                                    </MenuItem>
                                    {otherAddress.map(e => (
                                        <MenuItem key={e._id} value={e}>
                                            {e.label+', '} <em> {' '+e.address},{e.zip_code} {e.city}</em>

                                        </MenuItem>
                                    ))}
                                    <MenuItem value={'all'}>
                                        Partout, Rechercher des Alfred partout
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={'/profile/myAddresses'}><a style={{textDecoration:"none"}}>
                                            <p style={{ color: '#2FBCD3',cursor:'pointer' }}>
                                                Ajouter une adresse
                                            </p>
                                        </a></Link>
                                    </MenuItem>
                                </TextField>

                            </Grid>
                            <Grid item xs={3} className={classes.webvoir} style={{display:"flex",alignItems:"center"}}>
                                    <Button variant={"contained"} onClick={()=>this.search()} color={"primary"} style={{color:'white'}}>Rechercher</Button>
                            </Grid>
                            <Grid item xs={3} className={classes.mobilevoir} style={{display:"flex",alignItems:"center"}}>
                                    <Button variant={"contained"} onClick={()=>this.search()} color={"primary"} style={{color:'white'}}><img src="../../static/search-solid1.svg" style={{width: 15, height: 15}}/></Button>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.respfilter} style={{position: 'sticky', top: '125px', zIndex: 10, background: 'white', height: 60}}>
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
                                                                            onChange={e=>{this.handleChange(e);this.filterParticulier()}}
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
                                        <>

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


                                        </>

                                        :
                                        <Grid item xs={5} md={3} onClick={()=> this.dateFilterToggled()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem',paddingTop:13,height:43 }}>Quelle(s) date(s) ?</Typography>
                                        </Grid>

                                    }
                                </Grid>
                            </Grid>

                            
                        </Grid>
                        { /* END FILTER PANEL */ }
                            <>
                                <Grid container>
                                    <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Que recherchez-vous {user.firstname} ?</h3>
                                </Grid>
                                <Grid container className="scrollLittle" style={{overflowX: 'scroll', whiteSpace: 'nowrap', display: 'inline-block', minHeight: '250px'}}>
                                    {categories.map((e,index) => (
                                        <Grid key={index} style={{display: 'inline-block', width: '300px', margin: 'auto 20px'}}>
                                            <Link href={'/serviceByCategory?category='+e._id}>
                                            <Card  style={{width: '300px', margin: '20px auto', borderRadius: '35px', height: '250px'}} className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        style={{height:200}}
                                                        image={e.picture}
                                                        title={e.label}
                                                    />
                                                    <CardContent style={{padding: '5px'}}>
                                                        <Typography gutterBottom style={{fontSize: '1.1rem', textAlign: 'center'}}>
                                                            {e.label}
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
                                         categories.map(e => (
                                            <Grid container>
                                                {this.state[e.label] !== 0 ? <Grid item xs={12}> <h3 style={{marginLeft:15}}>{e.label}</h3> </Grid> : null}

                                                <Grid container style={{paddingLeft: '25px'}}>
                                                {serviceUser.map(a => {
                                                    if (a.service.category === e._id) {
                                                        return (
                                                            <Grid item xs={12} sm={6} md={3}>
                                                               <Fragment>{ false ?<CardPreview service={a.service} shop={a.shop}></CardPreview> : null}
                                                                <Card className={classes.card} style={{height: '420px'}}>
                                                                            <CardMedia className={classes.media} style={{height:150}} image={a.service.picture} title={a.service.label} >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+a.user.picture}/>
                                                                                {a.service_address.city != undefined ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white',textShadow:'0px 0px 3px black',fontWeight:600, bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                  <img src='/static/assets/img/blanc.svg' />
                                                                                     {' ' + a.service_address.city}
                                                                                     ({Math.round((geolib.convertDistance(
                                                                                            geolib.getDistance({
                                                                                                    latitude: a.service_address.gps.lat,
                                                                                                    longitude: a.service_address.gps.lng
                                                                                                },
                                                                                                {
                                                                                                    latitude: this.state.lat,
                                                                                                    longitude: this.state.lng
                                                                                                })
                                                                                            , 'km') + Number.EPSILON) * 100) / 100} kms)
                                                                                </Typography>: null}
                                                                                {a.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: 'auto'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {a.service.label} par {a.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                            <StarRatings rating={a.user.score} starRatedColor={"#2FBCD3"} numberOfStars={5} name='rating' starDimension={'20px'} starHoverColor={'#2FBCD3'} starSpacing={'3px'}
                                                                                            />
                                                                                            <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({a.user.number_of_reviews})</span>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {a.minimum_basket}€</Typography>
                                                                                        <Link href={"/userServicePreview?id="+ a._id}>
                                                                                            <Button onClick={()=>localStorage.setItem('address',JSON.stringify(this.state.addressSelected))} alt={a.service._id} variant="contained" color="primary"
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
                                                                                            <img src='/static/assets/img/diplome.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <img src='/static/assets/img/certificat.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {a.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                              <img src='/static/assets/img/experience.svg' />
                                                                                            </Tooltip> 
                                                                                            :null}{a.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            :null}
                                                                                    </Grid>
                                                                                    : null}
                                                                                </Grid> : null}
                                                                            </CardContent>
                                                                    </Card></Fragment>
                                                            </Grid>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                                </Grid>
                                                {this.state[e.label] !== 0 ?
                                                    <hr style={{width: '10%', margin: 'auto', border:'none', height: '10px', marginBottom: '80px', marginTop: '55px', backgroundColor: '#2FBCD3'}} />
                                                    : null}

                                            </Grid>
                                        ))}
                                </Grid>
                            </>
                                {!this.state.serviceUser.length ? <p>Aucun résultat</p> : null}
                    </Grid>
                    <Footer/>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(searchLogin);
