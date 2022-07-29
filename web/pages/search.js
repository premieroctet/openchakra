import React, {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
import 'react-dates/initialize'
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import InfiniteScroll from 'react-infinite-scroll-component'
import Hidden from '@material-ui/core/Hidden'
import lodash from 'lodash'
import {useRouter} from 'next/router'
import {useDebouncedCallback} from 'use-debounce'
import {isMarketplace} from '../config/config'
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
import {useUserContext} from '../contextes/user.context'

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

const SearchPage = ({classes, width, t}) => {

  const {booking_id, keyword, gps, city, category, service, prestation, date,
    selectedAddress}=useRouter().query

  // const [user, setUser]=useState(null)
  const [address, setAddress]=useState({})
  const [categories, setCategories]=useState([])
  const [results, setResults]=useState([])
  const [filteredResults, setFilteredResults]=useState([])
  const [filter, setFilter]=useState([])
  const [shops, setShops]=useState([])
  const [proAlfred, setProAlfred]=useState([])
  const [startDate, setStartDate]=useState(null)
  const [endDate, setEndDate]=useState(null)
  const [focusedInput, setFocusedInput]=useState(null)
  const [statusFilterVisible, setStatusFilterVisible]=useState(false)
  const [dateFilterVisible, setDateFilterVisible]=useState(false)
  const [logged, setLogged]=useState(false)
  const [scroll_count, setScroll_count]=useState(0)
  const [criterion, setCriterion]=useState({})
  const [searching, setSearching]=useState(false)

  const {user}=useUserContext()

  const SCROLL_DELTA=3023

  const launchSearch = useDebouncedCallback(
    forceFilter => {
      search(forceFilter)
    }
    , 500)

  useEffect(() => {
    if (!user) { return }
    let allAddresses = {'main': user.billing_address.gps}
    user.service_address.forEach(addr => {
      allAddresses[addr._id] = {lat: addr.lat, lng: addr.lng}
    })

    if (selectedAddress !== 'all') {
      setGps(allAddresses[selectedAddress])
    }
    if (!selectedAddress && !gps) {
      setGps(allAddresses.main)
    }

  }, [user])

  const isServiceSearch = () => {
    if (isMarketplace()) {
      return false
    }
    // Simple search => services
    // Search on booking  => providers
    if (booking_id) {
      return false
    }
    return true
  }

  const getFilters = () => {
    if (isServiceSearch()) {
      return {category: true, service: true}
    }
    return {date: true, perimeter: true, location: true, category: true, service: true}
  }

  const setGps = value => {
    // TODO: implement
    console.error('Not implemented')
  }

  useEffect(() => {
    launchSearch()
  }, [keyword])

  useEffect(() => {
    filterResults()
  }, [criterion])

  useEffect(() => {

    // Mount components gets criterion from URL
    // If date in URL then force filter after search
    setAxiosAuthentication()

    if (booking_id) {
      setAxiosAuthentication()
      axios.get(`/myAlfred/api/booking/${booking_id}`)
        .then(res => {
          setGps(res.data.address.gps)
          launchSearch()
        })
        .catch(err => {
          console.error(err)
        })
    }
    if (date) {
      setStartDate(moment(parseInt(date)).startOf('day'))
      setEndDate(moment(parseInt(date)).endOf('day'))
    }
    axios.get(`/myAlfred/api/category/${PART}`)
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    axios.get('/myAlfred/api/shop/allStatus')
      .then(res => {
        setShops(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    filterResults()
  }, [results])

  const filterResults = () => {
    let filters=[]
    if (criterion.proSelected || criterion.individualSelected) {
      filters.push(su =>
        criterion.proSelected && proAlfred.includes(su.user._id)
        ||
        criterion.individualSelected && !proAlfred.includes(su.user._id),
      )
    }

    if (criterion.radius && this.state.gps) {
      filters.push(su => computeDistanceKm(this.state.gps, su.service_address.gps) <= radius)
    }

    if (criterion.locations) {
      filters.push(su => {
        const su_locations = Object.keys(su.location).filter(k => Boolean(su.location[k]))
        return lodash.intersection(su_locations, criterion.locations).length > 0
      })
    }

    if (criterion.categories) {
      filters.push(su => criterion.categories.includes(su.service.category._id))
    }

    if (criterion.services) {
      filters.push(su => criterion.services.includes(su.service._id))
    }

    // TODO: make this async !!
    /**
    if (criterion.startDate && criterion.endDate) {
      axios.post('/myAlfred/api/availability/check', {
        start: moment(criterion.startDate).unix(),
        end: moment(criterion.startDate).unix(),
        results: filteredResults.map(su => su._id),
      })
        .then(response => {
          const filteredServiceUsers = response.data
          filteredResults = filteredResults.filter(su => filteredServiceUsers.includes(su._id.toString()))
          setFilteredServiceUsers(filteredResults)
        })
    }
    else {
      setFilteredServiceUsers(filteredResults)
    }
    */
    console.log(results.filter(su => filters.every(f => f(su))).length)
    setFilteredResults(results.filter(su => filters.every(f => f(su))))
  }

  useEffect(() => {
    setScroll_count(Math.min(SCROLL_DELTA, filteredResults.length))
  }, [filteredResults])

  const onChange = e => {
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
  }

  const search = () => {
    setSearching(true)
    let fltrs = {}
    if (booking_id) {
      fltrs.booking_id=booking_id
    }

    else {
    // GPS
      if (gps) {
        fltrs.gps = gps
        fltrs.perimeter = true
      }
      // "Search everywhere" : provide GPS of first users' addresses if any, no limit
      else if (user?.billing_address) {
        fltrs.gps = user.billing_address.gps
        fltrs.perimeter = false
      }

      // Keyword search disables cat/ser/presta filter
      if (keyword) {
        fltrs.keyword = keyword
      }
      if (category) {
        fltrs.category = category
      }
      // Service
      if (service) {
        fltrs.service = service
      }
      // Prestation
      if (prestation) {
        fltrs.prestation = prestation
      }
    }

    fltrs.status = PART
    const search_url=isServiceSearch() ? '/myAlfred/api/service/search' : '/myAlfred/api/serviceUser/search'
    axios.post(search_url, fltrs)
      .then(res => {
        setResults(res.data)
        setProAlfred(shops.filter(s => s.is_professional).map(s => s.alfred._id))
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setSearching(false)
      })
  }

  const content = classes => {
    const [cols, rows]={'xs': [100, 1], 'sm': [2, 3], 'md': [3, 3], 'lg': [4, 4], 'xl': [4, 3]}[width]

    const cardCmp=isServiceSearch() ? CardService : CardServiceUser
    const SearchResults=withSlide(withGrid(cardCmp))

    return(
      <Grid>
        <Grid className={classes.searchFilterMenuPosition}>
          <Grid className={classes.searchFilterMenuContent}>
            <FilterMenu
              style={classes}
              categories={categories}
              gps={gps}
              filter={setCriterion}
              filters={getFilters()}
              searching={searching}
              results={filteredResults}
              displayPerimeter={gps}
            />
          </Grid>
        </Grid>
        <Grid className={`customsearchmain ${classes.searchMainConainer}`}>
          <Grid className={classes.searchMainContainerHeader}>
            <Grid className={classes.searchContainerHeader}>
              <Grid className={classes.searchSecondFilterContainer}>
                <Grid className={classes.searchSecondFilterContainerLeft}>
                  {
                    !searching &&
                      <Typography>{ReactHtmlParser(t(filteredResults.length ? 'SEARCH.alfred_avail':'SEARCH.no_one', {count: `${filteredResults.length} `}))}</Typography>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={`customsearchmain ${classes.searchMainContainerResult}`}>
            <Grid className={classes.searchContainerDisplayResult}>
              <Grid className={classes.displayNbAvailable}>
                {
                  searching ? null :
                    <Typography>
                      {ReactHtmlParser(t(filterResults.length ? 'SEARCH.alfred_avail':'SEARCH.no_one', {count: `${filteredResults.length} `}))}
                    </Typography>
                }
              </Grid>
              <Grid container >
                {
                  searching ? <Grid className={classes.searchLoadingContainer} item container spacing={2} xl={12} lg={12} md={12} sm={12} xs={12}>
                    {
                      [...Array(8)].map(() => (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                          <CardService loading={true}/>
                        </Grid>

                      ))
                    }
                  </Grid> : filteredResults.length===0 ? null : <Grid container className={classes.searchMainContainer} spacing={3}>
                    <Grid item className={classes.hideOnMobile}>
                      <SearchResults
                        key={moment()}
                        model={new SearchDataModel(filteredResults.map(su => su._id), cols, rows, false)}
                        style={classes}
                        gps={gps}
                        user={user}
                        address={selectedAddress}
                        booking_id={booking_id}
                      />
                    </Grid>
                    <Hidden only={['xl', 'lg', 'md', 'sm']} >
                      <InfiniteScroll
                        dataLength={scroll_count}
                        next={() => setScroll_count(this.state.scroll_count+this.SCROLL_DELTA)}
                        hasMore={scroll_count<results.length}
                        loader={<CircularProgress/>}
                      >
                        {
                          filteredResults.slice(0, scroll_count).map(su => (
                            <CardService
                              key={su._id}
                              item={su._id}
                              gps={gps}
                              user={user}
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
  }

  return (
    <React.Fragment>
      <Hidden only={['xs']}>
        <Layout key={selectedAddress||gps||keyword} user={user} keyword={keyword} selectedAddress={selectedAddress} gps={gps}>
          {content(classes)}
        </Layout>
      </Hidden>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <LayoutMobileSearch filter={criterion} currentIndex={1}>
          {content(classes)}
        </LayoutMobileSearch>
      </Hidden>

    </React.Fragment>
  )
}


export default withTranslation(null, {withRef: true})(withWidth()(withStyles(styles)(withParams(SearchPage))))
