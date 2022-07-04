import CardTraining from '../components/Card/CardTraining'
import {getDataModel, isMarketplace} from '../config/config'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
import 'react-dates/initialize'
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import InfiniteScroll from 'react-infinite-scroll-component'
import Hidden from '@material-ui/core/Hidden'
import lodash from 'lodash'
import CardServiceUser from
'../components/Card/CardServiceUser/CardServiceUser'
import {setAxiosAuthentication} from '../utils/authentication'
import styles from '../static/css/pages/searchPage/searchStyle'
import FilterMenu from '../components/FilterMenu/FilterMenu'
import CardService from '../components/Card/CardService/CardService'
import Layout from '../hoc/Layout/Layout'
import withSlide from '../hoc/Slide/SlideShow'
import withGrid from '../hoc/Grid/GridCard'
import LayoutMobileSearch from '../hoc/Layout/LayoutMobileSearch'
import withParams from '../components/withParams'
import {SlideGridDataModel} from '../utils/models/SlideGridDataModel'
import {computeDistanceKm} from '../utils/functions'
import {PART} from '../utils/consts'

moment.locale('fr')

class SearchDataModel extends SlideGridDataModel {

  /** Dans chaque grille, la première card est nulle (i.e. CardSrviceInfo)
   => un item de moins par page
  */
  getPageCount() {
    return Math.ceil(this.data.length*1.0/(this.getGridSize()-1))
  }

  /** un item blanc par page => descendre d'un index par page
  */
  getDataIndex(page, col, row) {
    let index = super.getDataIndex(page, col, row)
    index = index - page - 1
    return index
  }

  /**
    Première cellule : null => affichage CardServiceUserInfo
  */
  getData(page, col, row) {
    // return super.getData(page, col, row)
    if (col===0 && row===0) {
      return null
    }
    return super.getData(page, col, row)
  }

}

class SearchPage extends React.Component {

  // FIX : page blanche quand redirigée depuis home page non connectée
  constructor(props) {
    super(props)
    this.filters=['Plus proche de moi']
    this.state = {
      user: null,
      address: {},
      city: '',
      gps: null,
      categories: [],
      results: [],
      filteredResuls: [],
      shops: [],
      proAlfred: [], // Professional Alfred ids
      keyword: '',
      startDate: null,
      endDate: null,
      focusedInput: null,
      statusFilterVisible: false,
      dateFilterVisible: false,
      logged: false,
      scroll_count: 0,
    }
    this.SCROLL_DELTA=3023
  }

isServiceSearch = () => {
  if (isMarketplace()) {
    return false
  }
  // Simple search => services
  // Search on booking  => providers
  if (this.props.params.booking_id) {
    return false
  }
  return true
}

getFilters = () => {
  if (this.isServiceSearch()) {
    return {category: true, service: true}
  }
  return {date: true, perimeter: true, location: true, category: true, service: true}
}

componentDidMount() {

  // Mount components gets criterion from URL
  // If date in URL then force filter after search

  const {booking_id, keyword, gps, city, category, service, prestation, date,
    selectedAddress}=this.props

  setAxiosAuthentication()

  if (booking_id) {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/booking/${booking_id}`)
      .then(res => {
        this.setState({gps: res.data.address.gps}, () => { this.search() })
      })
      .catch(err => {
        console.error(err)
      })
  }
  else {
    this.setState({
      keyword: keyword || '',
      gps: gps && JSON.parse(gps) || null,
      city: city || '',
      category: category,
      service: service,
      prestation: prestation,
    })
    if (date) {
      this.setState({
        startDate: moment(parseInt(date)).startOf('day'),
        endDate: moment(parseInt(date)).endOf('day'),
      })
    }
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})

        Promise.resolve({data: user})
          .then(res => {
            let allAddresses = {'main': res.data.billing_address.gps}
            res.data.service_address.forEach(addr => {
              allAddresses[addr._id] = {lat: addr.lat, lng: addr.lng}
            })

            let gps=null
            if (selectedAddress !== 'all') {
              gps=allAddresses[selectedAddress]
            }
            if (!selectedAddress && !gps) {
              gps=allAddresses.main
            }
            this.setState({gps: gps}, () => { this.search() })
          })
      })
      .catch(err => {
        console.error(err)
      })
  }

  axios.get(`/myAlfred/api/category/${PART}`)
    .then(res => {
      this.setState({categories: res.data})
    })
    .catch(err => {
      console.error(err)
    })
  axios.get('/myAlfred/api/shop/allStatus')
    .then(res => {
      this.setState({shops: res.data})
    })
    .catch(err => {
      console.error(err)
    })
}

  filter = data => {
    let criterion = data ? data : this.state
    const results = this.state.results
    let filteredResuls = []
    if (criterion.proSelected || criterion.individualSelected) {
      results.forEach(su => {
        if (!su.user) {
          console.warn(`No user for serviceUser:${JSON.stringify(su, null, 2)}`)
          return
        }
        let alfId = su.user._id
        const isPro = this.state.proAlfred.includes(alfId)
        if (isPro && criterion.proSelected || !isPro && criterion.individualSelected) {
          filteredResuls.push(su)
        }
      })
    }
    else {
      filteredResuls = results
    }

    if (criterion.radius && this.state.gps) {
      const radius = criterion.radius
      filteredResuls = filteredResuls.filter(su => computeDistanceKm(this.state.gps, su.service_address.gps) <= radius)
    }

    if (criterion.locations) {
      const locations_filter = criterion.locations
      filteredResuls = filteredResuls.filter(su => {
        const su_locations = Object.keys(su.location).filter(k => Boolean(su.location[k]))
        return lodash.intersection(su_locations, locations_filter).length > 0
      })
    }

    if (data && criterion.categories) {
      const categories = criterion.categories
      filteredResuls = filteredResuls.filter(su => {
        return categories.includes(this.isServiceSearch ? su.category : su.service.category._id)
      })
    }

    if (data && criterion.services) {
      const services = criterion.services
      filteredResuls = filteredResuls.filter(su => {
        return services.includes(this.isServiceSearch ? su._id : su.service._id)
      })
    }

    const start = criterion.startDate
    const end = criterion.endDate

    if (start && end) {
      axios.post('/myAlfred/api/availability/check', {
        start: moment(start).unix(),
        end: moment(end).unix(),
        results: filteredResuls.map(su => su._id),
      })
        .then(response => {
          const filteredServiceUsers = response.data
          filteredResuls = filteredResuls.filter(su => filteredServiceUsers.includes(su._id.toString()))
          this.setFilteredServiceUsers(filteredResuls)
        })
    }
    else {
      this.setFilteredServiceUsers(filteredResuls)
    }
  };

  setFilteredServiceUsers = results => {
    this.setState({filteredResuls: results, scroll_count: Math.min(this.SCROLL_DELTA, results.length)})
  };

  onChange = e => {
    let {name, value} = e.target
    this.setState({[e.target.name]: e.target.value})
    if (name === 'selectedAddress') {
      this.setState({
        gps: value === 'all' ? null : 'gps' in value ? value.gps : {
          'lat': value.lat,
          'lng': value.lng,
        },
      })
    }
  };

  search = forceFilter => {
    this.setState({searching: true})

    const {booking_id, category, service, prestation} = this.props
    let filters = {}

    if (booking_id) {
      filters.booking_id=booking_id
    }

    else {
    // GPS
      if (this.state.gps) {
        filters.gps = this.state.gps
        filters.perimeter = true
      }
      // "Search everywhere" : provide GPS of first users' addresses if any, no limit
      else if (this.state.user && this.state.user.billing_address) {
        filters.gps = this.state.user.billing_address.gps
        filters.perimeter = false
      }

      // Keyword search disables cat/ser/presta filter
      if (this.state.keyword) {
        filters.keyword = this.state.keyword
      }
      else {
      // Category
        if (category) {
          filters.category = category
        }
        // Service
        if (service) {
          filters.service = service
        }
        // Prestation
        if (prestation) {
          filters.prestation = prestation
        }
      }
    }

    filters.status = PART
    console.log(`Filter:${JSON.stringify(filters)}`)
    const search_url=this.isServiceSearch() ? '/myAlfred/api/service/search' : '/myAlfred/api/serviceUser/search'
    axios.post(search_url, filters)
      .then(res => {
        let results = res.data
        this.setState({results: results})
        this.setFilteredServiceUsers(results)
        const categories = this.state.categories
        let proAlfred = this.state.shops.filter(s => s.is_professional).map(s => s.alfred._id)
        this.setState({categories: categories, proAlfred: proAlfred},
          () => {
            if (forceFilter) {
              this.filter()
            }
          })
        this.setState({searching: false})
      })
      .catch(err => {
        console.error(err)
        this.setState({searching: false})
      })
  }

  handleChange = event => {
    this.setState({filters: event.target.value})
  };


  content = classes => {
    let results = this.state.filteredResuls
    const {booking_id}=this.props

    const {gps, scroll_count} = this.state

    const {width, selectedAddress} = this.props

    const [cols, rows]={'xs': [100, 1], 'sm': [2, 3], 'md': [3, 3], 'lg': [4, 4], 'xl': [4, 3]}[width]

    const cardCmp=this.isServiceSearch() ? CardService : getDataModel() == 'aftral' ? CardTraining : CardServiceUser
    const SearchResults=withSlide(withGrid(cardCmp))

    return(
      <Grid>
        <Grid className={classes.searchFilterMenuPosition}>
          <Grid className={classes.searchFilterMenuContent}>
            <FilterMenu
              style={classes}
              categories={this.state.categories}
              gps={this.state.gps}
              filter={this.filter}
              filters={this.getFilters()}
              searching={this.state.searching}
              results={results}
              displayPerimeter={this.state.gps}
            />
          </Grid>
        </Grid>
        <Grid className={`customsearchmain ${classes.searchMainConainer}`}>
          <Grid className={classes.searchMainContainerHeader}>
            <Grid className={classes.searchContainerHeader}>
              <Grid className={classes.searchSecondFilterContainer}>
                <Grid className={classes.searchSecondFilterContainerLeft}>
                  {
                    !this.state.searching &&
                      <Typography>{ReactHtmlParser(this.props.t(results.length ? 'SEARCH.alfred_avail':'SEARCH.no_one', {count: `${results.length} `}))}</Typography>
                  }
                </Grid>
                { gps ? <Grid className={classes.searchFilterRightContainer}>
                  <Grid className={classes.searchFilterRightLabel}>
                    <p>{ReactHtmlParser(this.props.t('SEARCH.sort'))}</p>
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
                        {this.filters.map((res, index) => {
                          return(
                            <MenuItem key={index} value={res}><strong>{res}</strong></MenuItem>
                          )
                        })}

                      </Select>
                    </FormControl>
                  </Grid>
                </Grid> : null
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid className={`customsearchmain ${classes.searchMainContainerResult}`}>
            <Grid className={classes.searchContainerDisplayResult}>
              <Grid className={classes.displayNbAvailable}>
                {
                  this.state.searching ? null :
                    <Typography>
                      {ReactHtmlParser(this.props.t(results.length ? 'SEARCH.alfred_avail':'SEARCH.no_one', {count: `${results.length} `}))}
                    </Typography>
                }
              </Grid>
              <Grid container >
                {
                  this.state.searching ? <Grid className={classes.searchLoadingContainer} item container spacing={2} xl={12} lg={12} md={12} sm={12} xs={12}>
                    {
                      [...Array(8)].map(() => (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                          <CardService loading={true}/>
                        </Grid>

                      ))
                    }
                  </Grid> : results.length===0 ? null : <Grid container className={classes.searchMainContainer} spacing={3}>
                    <Grid item className={classes.hideOnMobile}>
                      <SearchResults
                        key={moment()}
                        model={new SearchDataModel(results.map(su => su._id), cols, rows, false)}
                        style={classes}
                        gps={gps}
                        user={this.state.user}
                        address={selectedAddress}
                        booking_id={booking_id}
                      />
                    </Grid>
                    <Hidden only={['xl', 'lg', 'md', 'sm']} >
                      <InfiniteScroll
                        dataLength={scroll_count}
                        next={() => this.setState({scroll_count: this.state.scroll_count+this.SCROLL_DELTA}) }
                        hasMore={scroll_count<results.length}
                        loader={<CircularProgress/>}
                      >
                        {
                          results.slice(0, scroll_count).map(su => (
                            <CardService
                              key={su._id}
                              item={su._id}
                              gps={gps}
                              user={this.state.user}
                              address={selectedAddress} />
                          ),
                          )
                        }
                      </InfiniteScroll>
                    </Hidden>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes, selectedAddress} = this.props
    const {user, gps, keyword} = this.state

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
    )
  }
}


export default withTranslation('custom', {withRef: true})(withWidth()(withStyles(styles)(withParams(SearchPage))))
