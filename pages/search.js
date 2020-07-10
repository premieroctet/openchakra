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
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from "moment";
import 'react-dates/lib/css/_datepicker.css';
import CardPreview from '../components/CardPreview/CardPreview';
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn'
import BecomeAlfred from '../components/home/BecomeAlfred/BecomeAlfred';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
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
import styles from './search/searchStyle'

moment.locale('fr');

class SearchPage extends React.Component {

    // FIX : page blanche quand redirigée depuis home page non connectée
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            address: {},
            selectedAddress: {},
            city: '',
            gps: null,
            categories: [],
            serviceUsers: [],
            serviceUsersDisplay: [],
            shops: [],
            proAlfred: [], // Professional Alfred ids
            keyword: '',
            proSelected: false, // Filtre professionnel
            individualSelected: false, // Filtre particulier
            startDate: null,
            endDate: null,
            focusedInput: null,
            statusFilterVisible:false,
            dateFilterVisible:false,
            visibleCategories:[],
            catCount:{}, // cat id => # of items to display
            isAdmin: false,
            mounting : true,
            searching : false,
        };
        this.filter=this.filter.bind(this);
        this.searchCallback=this.searchCallback.bind(this);
    }

    static getInitialProps ({ query: { keyword, city, gps, selectedAddress, category, service, prestation, search, date} }) {
      // FIX : set city nin AlgoPlaces if provided
      var init= { keyword: keyword, city:city, selectedAddress:selectedAddress, category:category, service:service, prestation:prestation, search:search, date:date}
      if (gps) {
        init['gps']=gps;
      }
      return init;
    }

    onChangeInterval(startDate, endDate) {
      if (startDate) {
        startDate.hour(0).minute(0).second(0).millisecond(0)
      };
      if (endDate) {
        endDate.hour(23).minute(59).second(59).millisecond(999)
      };
      this.setState({startDate:startDate, endDate:endDate});
    }

    componentDidUpdate(prevProps) {
      if (this.props!== prevProps) {
        window.location.reload()
      }
    }
    componentDidMount() {
        // Mount components gets criterion from URL
        // If date in URL then force filter after search
        var st={
          keyword:'keyword' in this.props ? this.props.keyword : '',
          gps:'gps' in this.props ? JSON.parse(this.props.gps) : null,
          city:this.props.city || '',
        };
        if ('date' in this.props && this.props.date) {
          var startDate=moment(parseInt(this.props.date));
          startDate.hour(0).minute(0).second(0);
          var endDate=moment(parseInt(this.props.date));
          endDate.hour(23).minute(59).second(59);
          st['startDate']=startDate;
          st['endDate']=endDate;
        }
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

        axios.get('/myAlfred/api/category/all/sort')
          .catch(err => {
            console.error(err)
            this.setState({mounting : false})
          })
          .then(res => {
            st['categories']=res.data;
            var catCount={}
            res.data.forEach( c => catCount[c._id]=8);
            st['catCount']=catCount;
             axios.get('/myAlfred/api/shop/allStatus')
               .catch(err => {
                 console.error(err)
                 this.setState({mounting : false})
               })
               .then( res => {
                  st['shops']=res.data;
                  axios.get('/myAlfred/api/users/current')
                    .then(res => {
                      let user = res.data;
                      this.setState({isAdmin: user.is_admin});
                      st['user']=user;
                      var allAddresses={'main': user.billing_address.gps}
                      user.service_address.forEach( ad => allAddresses[ad._id]={lat:ad.lat, lng:ad.lng});
                      st['allAddresses']= allAddresses;
                      if ('selectedAddress' in this.props && this.props['selectedAddress']!=='all') {
                         st['gps']=allAddresses[this.props.selectedAddress];
                      }
                      if (!this.props['selectedAddress'] && !this.props['gps']) {
                         st['gps']=allAddresses['main'];
                         st['selectedAddress']='main';
                      }
                      this.setState(st, () => {
                        if (this.props.search) {this.search('date' in this.props)}
                        this.setState({mounting : false})
                      })
                    })
                    .catch(err => {
                      this.setState(st, () => {
                        if (this.props.search) {this.search('date' in this.props)}
                        this.setState({mounting : false})
                      })
                    })
               })
           })
    }

    searchCallback = q => {
        if (!('gps' in q)) {
          q['gps']=null
        }
        this.setState(q, () => this.search())
    }

    onChange = e => {
        var {name, value} = e.target;
        this.setState({ [e.target.name]: e.target.value });
        if (name === 'selectedAddress') {
          this.setState({gps: value === 'all'?null: 'gps' in value ? value.gps : {'lat':value['lat'], 'lng':value['lng']}})
        }
    };

    statusFilterChanged = event => {
        this.setState({[event.target.name]: event.target.checked, statusFilterVisible: false}, () => this.filter() );
    };

    resetFilter() {
      this.setState({
        proSelected: false,
        individualSelected: false,
        startDate: null,
        endDate: null,
      }, () => this.filter())
    }

    // Filter according to pro or particular && dates
    filter() {
      const serviceUsers=this.state.serviceUsers;
      var serviceUsersDisplay=[];
      if (this.state.proSelected || this.state.individualSelected) {
        serviceUsers.forEach( su => {
          var alfId = su.user._id;
          const isPro = this.state.proAlfred.includes(alfId);
          if (isPro && this.state.proSelected || !isPro && this.state.individualSelected) serviceUsersDisplay.push(su);
        });
      } else {
        serviceUsersDisplay=serviceUsers;
      }

      const start=this.state.startDate;
      const end=this.state.endDate;

      if (start && end) {
        axios.post('/myAlfred/api/availability/check', {
          start: moment(start).unix(),
          end: moment(end).unix(),
          serviceUsers : serviceUsersDisplay.map (su => su._id ),
        })
          .then ( response => {
            const filteredServiceUsers = response.data
            serviceUsersDisplay = serviceUsersDisplay.filter( su => filteredServiceUsers.includes(su._id.toString()))
            this.setFilteredServiceUsers(serviceUsersDisplay)
          })
      }
      else {
        this.setFilteredServiceUsers(serviceUsersDisplay)
      }
    }

    setFilteredServiceUsers = serviceUsers => {
      var visibleCategories=[];
      this.state.categories.forEach(e => {
        serviceUsers.forEach(a => {
          if(a.service.category._id === e._id){
            visibleCategories.push(e.label);
          }
        })
      })

      this.setState({serviceUsersDisplay: serviceUsers, visibleCategories:visibleCategories});
    }

     search(forceFilter) {

       this.setState({searching: true})

       const address = this.state.selectedAddress;
        var filters={}

        // GPS
        if (this.state.gps) {
          filters['gps']=this.state.gps
          filters['perimeter']=true
        }
        // "Search everywhere" : provide GPS of first users' addresses if any, no limit
        else if (this.state.user && this.state.user.billing_address) {
          filters['gps']=this.state.user.billing_address.gps
          filters['perimeter']=false
        }

       // Keyword search disables cat/ser/presta filter
       if (this.state.keyword) {
         filters['keyword']=this.state.keyword;
       }
       else {
         // Category
         if (this.props.category) { filters['category']=this.props.category; }
         // Service
         if (this.props.service) { filters['service']=this.props.service; }
         // Prestation
         if (this.props.prestation) { filters['prestation']=this.props.prestation; }
       }

       axios.post('/myAlfred/api/serviceUser/search', filters)
         .then(res => {
           let serviceUsers = res.data;
           this.setState({serviceUsers:serviceUsers, serviceUsersDisplay:serviceUsers});
           const categories = this.state.categories
           var visibleCategories=[];
           categories.forEach(e => {
             serviceUsers.forEach(a => {
               if(a.service.category._id === e._id){
                 visibleCategories.push(e.label);
               }
             })
           })
           var proAlfred=this.state.shops.filter( s => s.is_professional).map( s => s.alfred._id);
           this.setState({visibleCategories:visibleCategories, categories:categories, proAlfred:proAlfred},
             () => { if (forceFilter) { this.filter()}});
           this.setState({searching : false})
         })
         .catch (err => {
           console.error(err)
           this.setState({searching : false})
         })
    }

    statusFilterToggled(){
      this.setState({statusFilterVisible: !this.state.statusFilterVisible});
    }

    dateFilterToggled(){
      this.setState({dateFilterVisible: !this.state.dateFilterVisible});
    }

     cancelDateFilter(){
       this.setState({startDate:null,endDate:null,dateFilterVisible:false}, () => this.filter());
     }

     validateDateFilter(){
       this.setState({dateFilterVisible:false}, () => this.filter());
     }

    restrictServices(serviceUsers, category) {
      const nbToDisplay=this.state.catCount[category._id];
      return serviceUsers.filter( s => s.service && s.service.category && s.service.category._id === category._id).slice(0, nbToDisplay);
    }

    hasMoreToDisplay(serviceUsers, category) {
      const nbToDisplay=this.state.catCount[category._id];
      const nbTotal = serviceUsers.filter( s => s.service.category._id === category._id).length;
      return nbTotal>nbToDisplay;
    }

    increaseCount(category) {
      var counts=this.state.catCount;
      counts[category._id]=counts[category._id]+8;
      this.setState({catCount:counts});
    }

    isStatusFilterSet() {
      return this.state.proSelected || this.state.individualSelected;
    }

    isDateFilterSet() {
      return this.state.startDate!=null || this.state.endDate!=null;
    }

    isSubFilterSet() {
      return this.isStatusFilterSet() || this.isDateFilterSet();
    }

    render() {
        const {classes, search} = this.props
        const {user, categories, gps, isAdmin, mounting, searching} = this.state;
        const serviceUsers = this.state.serviceUsersDisplay;

        const statusFilterBg=this.isStatusFilterSet() ? '#2FBCD3':'white';
        const dateFilterBg=this.isDateFilterSet() ? '#2FBCD3':'white';

        var resultMessage
        const res={mounting, searching, search}

        if (mounting || search!='1') {
          resultMessage =
            <Typography></Typography>
        }
        else if (searching) {
          resultMessage =
            <Typography>Recherche en cours</Typography>
        }
        else if (serviceUsers.length==0){
          resultMessage = this.isSubFilterSet() ?
            <Typography><Button onClick={() => this.resetFilter()}>Aucun résultat, cliquez ici pour supprimer les filtres et relancer la recherche</Button></Typography>
            :
            <Typography>Nous n'avons pas trouvé de résultat pour votre recherche</Typography>
        }

        return (
          <Fragment>
            <Layout searchCallback={this.searchCallback} >
              <Grid container className={classes.bigContainer}>
                <Grid container className={classes.respfilter}>
                  <Grid item xs={12} style={{height: 50}}>
                    <Grid container>
                      {this.state.statusFilterVisible ?
                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                          <Typography onClick={()=> this.statusFilterToggled()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13, height:43}}>Statut</Typography>
                            <Grid id="status" className={classes.filterStatus} item xs={12}>
                              <Grid container>
                                <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}} spacing={3}>
                                  {this.state.individualSelected ? <Grid item xs={3}/> :
                                    <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                              checked={this.state.proSelected}
                                              onChange={e=>{this.statusFilterChanged(e);this.filter()}}
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
                                                onChange={e=>{this.statusFilterChanged(e);this.filter()}}
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
                          <Grid key={moment()} item xs={5} md={3} onClick={()=> this.statusFilterToggled()} style={{borderRadius: '15px', backgroundColor: `${statusFilterBg}`, boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
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
                                        onDatesChange={({ startDate, endDate }) => this.onChangeInterval(startDate, endDate)} // PropTypes.func.isRequired,
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
                          <Grid item xs={5} md={3} onClick={()=> this.dateFilterToggled()} style={{borderRadius: '15px', backgroundColor: `${dateFilterBg}`, boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                              <Typography style={{textAlign: 'center', fontSize: '0.8rem',paddingTop:13,height:43 }}>Quelle(s) date(s) ?</Typography>
                          </Grid>
                        }
                        </Grid>
                       </Grid>
                  </Grid>
                  { /* END FILTER PANEL */ }
                  <Grid className={classes.containerTitle}>
                    <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Que recherchez-vous {user?user.firstname:''} ?</h3>
                  </Grid>
                    <Grid container style={{overflowX: 'scroll', width: '100%', marginLeft: 1}} spacing={2} wrap={'nowrap'}>
                      {categories.map((cat, index) => (
                        <Grid item key={index}>
                          <Link href={'/search?search=1&category='+cat._id+(gps?'&gps='+JSON.stringify(gps):'')}>
                            <Card style={{borderRadius: 35, width: '100%', margin: 10}}>
                              <CardActionArea>
                                <CardMedia
                                    style={{minHeight:150, minWidth: 200}}
                                    image={cat.picture}
                                    title={cat.label}
                                />
                                <CardContent style={{minHeight: 50}}>
                                  <Typography style={{fontSize: '0.9rem', textAlign: 'center'}}>
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
                        { this.props.search && serviceUsers.length>0 ?
                          <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Nos meilleurs Alfred ...</h3>
                          :
                          null }
                          {/* Adresse spécifique  */
                          categories.map(cat => (
                            <Grid container>
                              {this.state.visibleCategories.includes(cat.label) ?
                                <Grid item xs={12}>
                                  <h3 style={{marginLeft:15}}>{cat.label}</h3>
                                </Grid> : null
                              }
                                <Grid container spacing={1} className={classes.containerCardPreview}>
                                {
                                   this.restrictServices(serviceUsers, cat).map(su => {
                                    return (
                                      <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.paddingResponsive}>
                                        <CardPreview services={su._id} gps={user ? user.billing_address.gps : this.state.gps} needAvatar={true} key={su._id} isAdmin={isAdmin}/>
                                      </Grid>
                                    )
                                  })
                                }
                                </Grid>
                                {this.state.visibleCategories.includes(cat.label) ?
                                  <Grid style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 30, marginBottom: 30}}>
                                    { this.hasMoreToDisplay(serviceUsers, cat) ?
                                      <Grid style={{marginLeft: 15}}>
                                        <Button color={'primary'} onClick={()=>this.increaseCount(cat)}>Voir plus d'Alfred</Button>
                                      </Grid>
                                      : null
                                    }
                                    <Grid style={{textAlign: 'center'}}>
                                      <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                                    </Grid>
                                  </Grid>
                                    : null}
                              </Grid>
                            ))}
                          </Grid>
                          { resultMessage }
                 </Grid>
                { this.props.search || serviceUsers.length>0 ? null:
                  <>
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
                  </>
                }

                <Footer/>
              </Layout>
            </Fragment>
        )
    }
}


export default withStyles(styles)(SearchPage);
