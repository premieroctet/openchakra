import React from 'react';
import Layout from '../hoc/Layout/Layout';
import Footer from '../hoc/Layout/Footer/Footer';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import CardPreview from '../components/Card/CardPreview/CardPreview';
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn';
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
import styles from '../static/css/searchPage/searchStyle';
import cookie from 'react-cookies';
import NavBar from "../hoc/Layout/NavBar/NavBar";
import InfoBar from "../components/InfoBar/InfoBar";
import FilterMenu from "../components/FilterMenu/FilterMenu";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardService from "../components/Card/CardService/CardService";
import ScrollMenu from "../components/ScrollMenu/SrollMenu";

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
      statusFilterVisible: false,
      dateFilterVisible: false,
      visibleCategories: [],
      catCount: {}, // cat id => # of items to display
      isAdmin: false,
      mounting: true,
      searching: false,
      filters:['Plus proche de moi']
    };
  }

  static getInitialProps({query: {keyword, city, gps, selectedAddress, category, service, prestation, search, date}}) {
    // FIX : set city nin AlgoPlaces if provided
    var init = {
      keyword: keyword,
      city: city,
      selectedAddress: selectedAddress,
      category: category,
      service: service,
      prestation: prestation,
      search: search,
      date: date,
    };
    if (gps) {
      init['gps'] = gps;
    }
    return init;
  }



  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      window.location.reload();
    }
  }

  componentDidMount() {
    // Mount components gets criterion from URL
    // If date in URL then force filter after search
    let st = {
      keyword: 'keyword' in this.props ? this.props.keyword : '',
      gps: 'gps' in this.props ? JSON.parse(this.props.gps) : null,
      city: this.props.city || '',
    };
    if ('date' in this.props && this.props.date) {
      var startDate = moment(parseInt(this.props.date));
      startDate.hour(0).minute(0).second(0);
      var endDate = moment(parseInt(this.props.date));
      endDate.hour(23).minute(59).second(59);
      st['startDate'] = startDate;
      st['endDate'] = endDate;
    }
    if ('category' in this.props) {
      st['category'] = this.props.category;
    }
    if ('service' in this.props) {
      st['service'] = this.props.service;
    }
    if ('prestation' in this.props) {
      st['prestation'] = this.props.prestation;
    }
    axios.defaults.headers.common['Authorization'] = cookie.load('token');

    axios.get('/myAlfred/api/category/all/sort')
      .catch(err => {
        console.error(err);
        this.setState({mounting: false});
      })
      .then(res => {
        st['categories'] = res.data;
        var catCount = {};
        res.data.forEach(c => catCount[c._id] = 8);
        st['catCount'] = catCount;
        axios.get('/myAlfred/api/shop/allStatus')
          .catch(err => {
            console.error(err);
            this.setState({mounting: false});
          })
          .then(res => {
            st['shops'] = res.data;
            axios.get('/myAlfred/api/users/current')
              .then(res => {
                let user = res.data;


                this.setState({isAdmin: user.is_admin});
                st['user'] = user;
                let allAddresses = {'main': user.billing_address.gps};
                user.service_address.forEach(ad => allAddresses[ad._id] = {lat: ad.lat, lng: ad.lng});
                st['allAddresses'] = allAddresses;
                if ('selectedAddress' in this.props && this.props['selectedAddress'] !== 'all') {
                  st['gps'] = allAddresses[this.props.selectedAddress];
                }
                if (!this.props['selectedAddress'] && !this.props['gps']) {
                  st['gps'] = allAddresses['main'];
                  st['selectedAddress'] = 'main';
                }
                this.setState(st, () => {
                  if (this.props.search) {
                    this.search('date' in this.props);
                  }
                  this.setState({mounting: false});
                });
              })
              .catch(err => {
                this.setState(st, () => {
                  if (this.props.search) {
                    this.search('date' in this.props);
                  }
                  this.setState({mounting: false});
                });
              });
          });
      });
  }

  searchCallback = q => {
    if (!('gps' in q)) {
      q['gps'] = null;
    }
    this.setState(q, () => this.search());
  };

  onChange = e => {
    var {name, value} = e.target;
    this.setState({[e.target.name]: e.target.value});
    if (name === 'selectedAddress') {
      this.setState({
        gps: value === 'all' ? null : 'gps' in value ? value.gps : {
          'lat': value['lat'],
          'lng': value['lng'],
        },
      });
    }
  };



  resetFilter() {
    this.setState({
      proSelected: false,
      individualSelected: false,
      startDate: null,
      endDate: null,
    }, () => this.filter());
  }

  // Filter according to pro or particular && dates


  setFilteredServiceUsers = serviceUsers => {
    var visibleCategories = [];
    this.state.categories.forEach(e => {
      serviceUsers.forEach(a => {
        if (a.service.category._id === e._id) {
          visibleCategories.push(e.label);
        }
      });
    });

    this.setState({serviceUsersDisplay: serviceUsers, visibleCategories: visibleCategories});
  };

  search(forceFilter) {

    this.setState({searching: true});

    const address = this.state.selectedAddress;
    var filters = {};

    // GPS
    if (this.state.gps) {
      filters['gps'] = this.state.gps;
      filters['perimeter'] = true;
    }
    // "Search everywhere" : provide GPS of first users' addresses if any, no limit
    else if (this.state.user && this.state.user.billing_address) {
      filters['gps'] = this.state.user.billing_address.gps;
      filters['perimeter'] = false;
    }

    // Keyword search disables cat/ser/presta filter
    if (this.state.keyword) {
      filters['keyword'] = this.state.keyword;
    } else {
      // Category
      if (this.props.category) {
        filters['category'] = this.props.category;
      }
      // Service
      if (this.props.service) {
        filters['service'] = this.props.service;
      }
      // Prestation
      if (this.props.prestation) {
        filters['prestation'] = this.props.prestation;
      }
    }

    axios.post('/myAlfred/api/serviceUser/search', filters)
      .then(res => {
        let serviceUsers = res.data;
        this.setState({serviceUsers: serviceUsers, serviceUsersDisplay: serviceUsers});
        const categories = this.state.categories;
        var visibleCategories = [];
        categories.forEach(e => {
          serviceUsers.forEach(a => {
            if (a.service.category._id === e._id) {
              visibleCategories.push(e.label);
            }
          });
        });
        var proAlfred = this.state.shops.filter(s => s.is_professional).map(s => s.alfred._id);
        this.setState({visibleCategories: visibleCategories, categories: categories, proAlfred: proAlfred},
          () => {
            if (forceFilter) {
              this.filter();
            }
          });
        this.setState({searching: false});
      })
      .catch(err => {
        console.error(err);
        this.setState({searching: false});
      });
  }






  restrictServices(serviceUsers, category) {
    const nbToDisplay = this.state.catCount[category._id];
    return serviceUsers.filter(s => s.service && s.service.category && s.service.category._id === category._id).slice(0, nbToDisplay);
  }

  hasMoreToDisplay(serviceUsers, category) {
    const nbToDisplay = this.state.catCount[category._id];
    const nbTotal = serviceUsers.filter(s => s.service.category._id === category._id).length;
    return nbTotal > nbToDisplay;
  }

  increaseCount(category) {
    var counts = this.state.catCount;
    counts[category._id] = counts[category._id] + 8;
    this.setState({catCount: counts});
  }




  isSubFilterSet() {
    return this.isStatusFilterSet() || this.isDateFilterSet();
  }

  handleChange = (event) => {
    this.setState({filters: event.target.value})
  };

  render() {
    const {classes, search} = this.props;
    const {user, categories, gps, isAdmin, mounting, searching ,
      address,
      selectedAddress,
      city,
      serviceUsers,
      serviceUsersDisplay,
      shops,
      proAlfred, // Professional Alfred ids
      keyword,
      proSelected,
      individualSelected,
      startDate,
      endDate,
      focusedInput,
      statusFilterVisible,
      dateFilterVisible,
      visibleCategories,
      catCount,
      filters
     } = this.state;



    let resultMessage;
    const res = {mounting, searching, search};

    if (mounting || search != '1') {
      resultMessage =
        <Typography></Typography>;
    } else if (searching) {
      resultMessage =
        <Typography>Recherche en cours</Typography>;
    } else if (serviceUsers.length == 0) {
      resultMessage = this.isSubFilterSet() ?
        <Typography><Button onClick={() => this.resetFilter()}>Aucun résultat, cliquez ici pour supprimer les filtres et
          relancer la recherche</Button></Typography>
        :
        <Typography>Nous n'avons pas trouvé de résultat pour votre recherche</Typography>;
    }

    return (
      <Grid>
        <Grid className={classes.searchNavbarComponentPosition}>
          <InfoBar style={classes} />
        </Grid>
        <Grid>
          <NavBar style={classes} user={user} selectedAddress={selectedAddress}/>
        </Grid>
        <Grid className={classes.searchMenuScrollMenuContainer}>
          <Grid className={classes.searchScrollmenuContainer}>
            <ScrollMenu style={classes} categories={categories} gps={gps}/>
          </Grid>
        </Grid>
        <Grid className={classes.filterMenuDivierContainer}>
          <Divider className={classes.filterMenuDividerStyle}/>
        </Grid>
        <Grid className={classes.searchFilterMenuPosition}>
          <Grid className={classes.searchFilterMenuContent}>
            <FilterMenu style={classes} categories={categories} gps={gps}/>
          </Grid>
        </Grid>
        <Grid className={classes.searchMainConainer}>
          <Grid className={classes.searchMainContainerHeader}>
            <Grid className={classes.searchContainerHeader}>
              <Grid className={classes.searchSecondFilterContainer}>
                <Grid className={classes.searchSecondFilterContainerLeft}>
                  <p>{serviceUsers.length} Alfred disponibles</p>
                </Grid>
                <Grid className={classes.searchFilterRightContainer}>
                  <Grid className={classes.searchFilterRightLabel}>
                    <p>Trier par</p>
                  </Grid>
                  <Grid>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="simple-select-placeholder-label-label"
                        id="simple-select-placeholder-label"
                        value={filters}
                        onChange={this.handleChange}
                        displayEmpty
                        disableUnderline
                        classes={{select: classes.searchSelectPadding}}
                      >
                        {filters.map((res,index) =>{
                          return(
                            <MenuItem value={res}><strong>{res}</strong></MenuItem>
                          )
                        })}

                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.searchMainContainerResult}>
            <Grid className={classes.searchContainerDisplayResult}>
              <Grid container spacing={3}>
              {
                categories.map(cat => (
                  this.restrictServices(serviceUsers, cat).map((su, index) => {
                    return (
                      <Grid item xl={3} lg={3} md={3} key={index}>
                        <CardService style={classes} services={su._id} gps={user ? user.billing_address.gps : this.state.gps}/>
                      </Grid>
                    );
                  })
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            {resultMessage}
          </Grid>
        </Grid>
        <Grid className={classes.mainContainerStyleFooter}>
          <Grid className={classes.generalWidthFooter}>
            <Footer style={classes}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(styles)(SearchPage);
