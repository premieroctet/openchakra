const {setAxiosAuthentication}=require('../utils/authentication')
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import 'react-dates/initialize';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import styles from '../static/css/pages/searchPage/searchStyle';

import FilterMenu from "../components/FilterMenu/FilterMenu";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardService from "../components/Card/CardService/CardService";
import SearchByHashtag from "../components/SearchByHashtag/SearchByHashtag";
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from "../hoc/Layout/Layout";
import withSlide from '../hoc/Slide/SlideShow'
import withGrid from '../hoc/Grid/GridCard'
import Hidden from "@material-ui/core/Hidden";
import LayoutMobileSearch from "../hoc/Layout/LayoutMobileSearch";
import Typography from "@material-ui/core/Typography";
const {SlideGridDataModel}=require('../utils/models/SlideGridDataModel');
const {getLoggedUserId}=require('../utils/functions')
import withWidth from '@material-ui/core/withWidth';
import InfiniteScroll from 'react-infinite-scroll-component'
const SearchResults=withSlide(withGrid(CardService));
const {is_b2b_style, is_b2b_admin, is_b2b_manager} =require('../utils/context')
const {PRO, PART}=require('../utils/consts')

moment.locale('fr');

class SearchDataModel extends SlideGridDataModel {

  /** Dans chaque grille, la première card est nulle (i.e. CardSrviceInfo)
   => un item de moins par page
  */
  getPageCount() {
    return Math.floor(this.data.length*1.0/(this.getGridSize()-1))
  }

  /** un item blanc par page => descendre d'un index par page
  */
  getDataIndex(page, col, row) {
    var index = super.getDataIndex(page, col, row);
    index = index - page - 1;
    return index
  }

  /**
    Première cellule : null => affichage CardServiceInfo
  */
  getData(page, col, row) {
    //return super.getData(page, col, row)
    if (col===0 && row===0) {
      return null
    }
    return super.getData(page, col, row)
  }

}

class SearchPage extends React.Component {

  // FIX : page blanche quand redirigée depuis home page non connectée
  constructor(props) {
    super(props);
    this.filterMenuComponent = React.createRef();
    this.filters=['Plus proche de moi']
    this.state = {
      user: null,
      address: {},
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
      isAdmin: false,
      mounting: true,
      searching: false,
      logged: false,
      scroll_count: 0,
    };
    this.SCROLL_DELTA=30
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
    if (getLoggedUserId()) {
      this.setState({logged: true});
    }
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
    if ('selectedAddress' in this.props) {
      st['selectedAddress'] = this.props.selectedAddress;
    }
    setAxiosAuthentication()

    axios.get(`/myAlfred/api/category/${is_b2b_style() ? PRO : PART}`)
      .catch(err => {
        console.error(err);
        this.setState({mounting: false});
      })
      .then(res => {
        st['categories'] = res.data;
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

                const promise = is_b2b_admin(user)||is_b2b_manager(user) ? axios.get('/myAlfred/api/companies/current') : emptyPromise({ data : user})
                promise
                  .then(res => {
                    var allAddresses = {'main': res.data.billing_address.gps};
                    res.data.service_address.forEach(addr => {
                      allAddresses[addr._id] = {lat: addr.lat, lng: addr.lng}
                    });
                    st['allAddresses']=allAddresses
                    if ('selectedAddress' in this.props && this.props['selectedAddress'] !== 'all') {
                      st['gps'] = allAddresses[this.props.selectedAddress];
                    }
                    if (!this.props['selectedAddress'] && !this.props['gps']) {
                      st['gps'] = allAddresses['main'];
                      st['selectedAddress'] = 'main';
                    }
                    this.setState(st, () => {
                      if (this.props.search) {
                        this.search('date' in this.props)
                      }
                      this.setState({mounting: false});
                    });
                  })
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

  filter = (data) => {
    let filterComponentstate = data ? data : this.filterMenuComponent.current ? this.filterMenuComponent.current.state : this.state;

    const serviceUsers = this.state.serviceUsers;
    let serviceUsersDisplay = [];
    if (filterComponentstate.proSelected || filterComponentstate.individualSelected) {
      serviceUsers.forEach(su => {
        let alfId = su.user._id;
        const isPro = this.state.proAlfred.includes(alfId);
        if (isPro && filterComponentstate.proSelected || !isPro && filterComponentstate.individualSelected) {
          serviceUsersDisplay.push(su);
        }
      });
    } else {
      serviceUsersDisplay = serviceUsers;
    }

    const start = filterComponentstate.startDate;
    const end = filterComponentstate.endDate;

    if (start && end) {
      axios.post('/myAlfred/api/availability/check', {
        start: moment(start).unix(),
        end: moment(end).unix(),
        serviceUsers: serviceUsersDisplay.map(su => su._id),
      })
        .then(response => {
          const filteredServiceUsers = response.data;
          serviceUsersDisplay = serviceUsersDisplay.filter(su => filteredServiceUsers.includes(su._id.toString()));
          this.setFilteredServiceUsers(serviceUsersDisplay);
        });
    } else {
      this.setFilteredServiceUsers(serviceUsersDisplay);
    }
  };

  setFilteredServiceUsers = serviceUsers => {
    this.setState({serviceUsersDisplay: serviceUsers, scroll_count: Math.min(this.SCROLL_DELTA, serviceUsers.length)});
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

  search(forceFilter) {
    const {user} = this.state
    this.setState({searching: true});

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

    filters.status = is_b2b_style() ? PRO : PART

    axios.post('/myAlfred/api/serviceUser/search', filters)
      .then(res => {
        let serviceUsers = res.data;
        this.setState({serviceUsers: serviceUsers});
        this.setFilteredServiceUsers(serviceUsers)
        const categories = this.state.categories;
        var proAlfred = this.state.shops.filter(s => s.is_professional).map(s => s.alfred._id);
        this.setState({categories: categories, proAlfred: proAlfred},
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

  isStatusFilterSet = () => {
    return this.state.proSelected || this.state.individualSelected;
  };

  isDateFilterSet = () => {
    return this.state.startDate != null || this.state.endDate != null;
  };

  isSubFilterSet = () => {
    return this.isStatusFilterSet() || this.isDateFilterSet();
  };

  handleChange = (event) => {
    this.setState({filters: event.target.value})
  };


  content = (classes ) => {
    var serviceUsers = this.state.serviceUsersDisplay
    const {gps, selectedAddress, scroll_count} = this.state

    const {width} = this.props

    const [cols,rows]={ 'xs': [100,1], 'sm': [2,3], 'md': [3,3], 'lg': [4,4], 'xl':[4,3]}[width]

    return(
      <Grid>
        <Hidden only={['xs']}>
          <Grid className={classes.searchFilterMenuPosition}>
            <Grid className={classes.searchFilterMenuContent}>
              <FilterMenu
                ref={this.filterMenuComponent}
                style={classes}
                categories={this.state.categories}
                gps={this.state.gps}
                filter={this.filter}
                mounting={this.state.mounting}
                search={this.props.search}
                searching={this.state.searching}
                serviceUsers={serviceUsers}
                resetFilter={this.resetFilter}
                isSubFilterSet={this.isSubFilterSet}
              />
            </Grid>
          </Grid>
        </Hidden>
        <Grid className={classes.searchMainConainer}>
          <Hidden only={['xs']}>
            <Grid className={classes.searchMainContainerHeader}>
              <Grid className={classes.searchContainerHeader}>
                <Grid className={classes.searchSecondFilterContainer}>
                  <Grid className={classes.searchSecondFilterContainerLeft}>
                    {
                      this.state.searching || serviceUsers.length===0  ? null : <Typography>{serviceUsers.length} Alfred disponibles</Typography>
                    }
                  </Grid>
                  { gps ?
                    <Grid className={classes.searchFilterRightContainer}>
                      <Grid className={classes.searchFilterRightLabel}>
                        <p>Trier par</p>
                      </Grid>
                      <Grid>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="simple-select-placeholder-label-label"
                            id="simple-select-placeholder-label"
                            value={this.filters}
                            onChange={this.handleChange}
                            displayEmpty
                            disableUnderline
                            classes={{select: classes.searchSelectPadding}}
                          >
                            {this.filters.map((res,index) =>{
                              return(
                                <MenuItem key={index} value={res}><strong>{res}</strong></MenuItem>
                              )
                            })}

                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    :
                    null
                  }
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid className={classes.searchMainContainerResult}>
            <Grid className={classes.searchContainerDisplayResult}>
              <Hidden only={['sm','md', 'lg', 'xl']}>
                <Grid style={{display: 'flex', justifyContent: 'center' , marginTop: '5vh', marginBottom: '5vh'}}>
                  {
                    this.state.searching || serviceUsers.length===0  ? null : <Typography>{serviceUsers.length} Alfred disponibles</Typography>
                  }
                </Grid>
              </Hidden>
              <Grid container >
                {
                  this.state.searching ?
                    <Grid className={classes.searchLoadingContainer} item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <CircularProgress/>
                    </Grid>
                    :
                    serviceUsers.length===0 ? null :
                      <Grid container className={classes.searchMainContainer} spacing={3}>
                        <Hidden only={['xs']}>
                          <SearchResults
                            key={moment()}
                            model={new SearchDataModel(serviceUsers.map(su => su._id), cols, rows, false)}
                            style={classes}
                            gps={gps}
                            user={this.state.user}
                            address={selectedAddress}
                          />
                        </Hidden>
                        <Hidden only={['sm', 'md', 'lg', 'xl']}>
                        <Grid item xs={12}>
                          <InfiniteScroll
                            dataLength={scroll_count}
                            next={() => this.setState({scroll_count : this.state.scroll_count+this.SCROLL_DELTA}) }
                            hasMore={scroll_count<serviceUsers.length}
                            loader={<CircularProgress/>}
                          >
                            {
                            serviceUsers.slice(0, scroll_count).map((su, index) =>(
                              <CardService
                                key={su._id}
                                item={su._id}
                                gps={gps}
                                user={this.state.user}
                                address={selectedAddress} />
                              )
                              )
                            }
                            </InfiniteScroll>
                            </Grid>
                        </Hidden>
                      </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*TODO HASTAG
        <Grid className={classes.filterMenuDivierContainer}>
          <Divider className={classes.filterMenuDividerStyle}/>
        </Grid>
        <Grid className={classes.searchSearchByHastagMainStyle}>
          <Grid className={classes.searchSearchByHastagContainer}>
            <SearchByHashtag style={classes}/>
          </Grid>
        </Grid>
        */}
      </Grid>
    )
  };



  render() {
    const {classes} = this.props;
    const {user, gps, selectedAddress, keyword} = this.state;

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <Layout key={selectedAddress||gps||keyword} user={user} keyword={keyword} selectedAddress={selectedAddress} gps={gps}>
            {this.content(classes)}
          </Layout>
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <LayoutMobileSearch filter={this.filter} currentIndex={1}>
            {this.content(classes)}
          </LayoutMobileSearch>
        </Hidden>

      </React.Fragment>
    );
  }
}


export default withWidth()(withStyles(styles)(SearchPage))
