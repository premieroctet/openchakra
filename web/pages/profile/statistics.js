import ReactHtmlParser from 'react-html-parser'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import loadable from 'loadable-components'

import BasePage from '../basePage';
import Topic from '../../hoc/Topic/Topic'
import styles from '../../static/css/pages/profile/statistics/statistics'

const {setAxiosAuthentication}=require('../../utils/authentication')

const Chart = loadable(() => import('react-apexcharts'))
import Router from 'next/router'
import axios from 'axios'
import Box from '../../components/Box/Box'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Divider from '@material-ui/core/Divider'
import AskQuestion from '../../components/AskQuestion/AskQuestion'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import {isEditableUser} from '../../utils/context'
import '../../static/assets/css/custom.css'
import {STATISTICS} from '../../utils/i18n'

const MONTHS=['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const CHART_OPTIONS= {
  chart: {
    toolbar: {
      show: false,
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      color: '#2FBCD3',
      shadeIntensity: 0.65,
    },
  },
  xaxis: {
    categories: MONTHS,
  },
}

class ProfileStatistics extends BasePage {

  constructor(props) {
    super(props)
    this.state = {
      monthIncomes: 0,
      monthPrestations: 0,
      monthViewsServices: 0,
      monthReviews: 0,
      yearIncomes: 0,
      yearPrestations: 0,
      yearViewsServices: 0,
      yearReviews: 0,
      serviceUser: [],
      totalYear: 0,
      totalPaid: 0,
      totalComing: 0,
      revenus: [
        {
          name: 'revenus',
          data: new Array(12).fill(0),
        },
      ],
      year: new Date().getFullYear(),
      statisticsMonth: new Date().getMonth(),
      statisticsYear: new Date().getFullYear(),
    }
  }

  componentDidMount() {

    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()

    this.loadMonthStatistics()
    this.loadYearStatistics()
  }

  histoYearChanged = e => {
    this.setState({year: e.target.value}, () => this.loadHistoYear())
  };

  statisticMonthChanged= event => {
    this.setState({statisticsMonth: event.target.value}, () => this.loadMonthStatistics())
  };

  statisticYearChanged= event => {
    this.setState({statisticsYear: event.target.value}, () => this.loadYearStatistics())
  };

  loadHistoYear = () => {
    const year = this.state.year
    axios.get(`/myAlfred/api/performances/incomes/${ year}`)
      .then(resIncome => {
        let bookings = resIncome.data
        axios.get(`/myAlfred/api/performances/incomes/totalComing/${ year}`)
          .then(resIncomeTotal => {
            const totalComing = parseInt(resIncomeTotal.data)
            const annualIncome = bookings.reduce((total, amount) => total + amount, 0)

            this.setState({
              revenus: [{data: bookings, name: 'revenus'}],
              totalPaid: annualIncome,
              totalComing: totalComing,
              totalYear: totalComing + annualIncome,
            })
          })
      })
      .catch(err => {
        console.error(err)
      })
  }

  loadMonthStatistics() {
    const year = new Date().getFullYear()
    const month=this.state.statisticsMonth
    axios.get(`/myAlfred/api/performances/statistics/${year}/${month}`)
      .then(res => {
        this.setState({
          monthIncomes: res.data.incomes,
          monthPrestations: res.data.prestations,
          monthViewsServices: res.data.totalViews,
          monthReviews: res.data.totalReviews,
        })
      })
      .catch(err => console.error(err))
  }

  loadYearStatistics() {
    const year = this.state.statisticsYear

    axios.get(`/myAlfred/api/performances/statistics/${year}`)
      .then(res => {
        this.setState({
          yearIncomes: res.data.incomes,
          yearPrestations: res.data.prestations,
          yearViewsServices: res.data.totalViews,
          yearReviews: res.data.totalReviews,
        })
      })
      .catch(err => console.error(err))
  }

  content = (classes, user) => {
    const editable = isEditableUser(user)

    return(
      <Grid container stylerr={{width: '100%'}} spacing={3}>
        <Grid item xs={12} className={'customstatincomecont'}>
          <Box>
            <Topic underline={true} titleTopic={ReactHtmlParser(this.props.t('STATISTICS.title_topic_incomes'))} titleSummary={ReactHtmlParser(this.props.t('STATISTICS.subtitle_topic_incomes'))}>
              <Grid>
                <Grid>
                  <Grid className={classes.statContainer}>
                    <Grid className={classes.statContainerLabel}>
                      <Typography className={'customstatyearincomestitle'}>{ReactHtmlParser(this.props.t('STATISTICS.year'))}</Typography>
                    </Grid>
                    <Grid>
                      <FormControl>
                        <Select
                          labelId="simple-select-placeholder-label-label"
                          id="simple-select-placeholder-label"
                          value={this.state.year}
                          onChange={this.histoYearChanged}
                          displayEmpty
                          disableUnderline
                          classes={{select: classes.searchSelectPadding}}
                        >
                          {[2019, 2020, 2021].map(year => {
                            return (
                              <MenuItem value={year}>{year}</MenuItem>
                            )
                          })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Chart
                    options={CHART_OPTIONS}
                    series={this.state.revenus}
                    type="bar"
                    style={{width: '100%'}}
                  />
                </Grid>
                <Grid container className={`customstatgenriccont ${classes.statResultContainer}`}>
                  <Grid container className={classes.statResultData}>
                    <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                      <Typography className={'customstatincomestotal'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.incomes_get'))}</strong></Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                      <Typography><strong>{this.state.totalPaid}€</strong></Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Divider orientation="vertical"/>
                  </Grid>
                  <Grid container className={classes.statResultData}>
                    <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                      <Typography className={'customstatincomeswilltotal'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.incomes_will'))}</strong></Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                      <Typography><strong>{this.state.totalComing}€</strong></Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Divider orientation="vertical" />
                  </Grid>
                  <Grid container className={classes.statResultData}>
                    <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                      <Typography className={'customstatincomeswillyeartotal'}><strong>{STATISTICS.incomes_previ + this.state.year}</strong></Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                      <Typography><strong>{`${this.state.totalYear}€`}</strong></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Topic>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Topic underline={true} titleTopic={ReactHtmlParser(this.props.t('STATISTICS.my_stat'))} titleSummary={ReactHtmlParser(this.props.t('STATISTICS.my_stat_subtitle'))}>
              <Grid item style={{width: '100%'}}>
                <Grid container style={{width: '100%'}}>
                  <Grid container style={{width: '100%'}}>
                    <Grid className={classes.statContainer}>
                      <Grid className={classes.statContainerLabel}>
                        <Typography>{ReactHtmlParser(this.props.t('STATISTICS.month'))}</Typography>
                      </Grid>
                      <Grid>
                        <FormControl>
                          <Select
                            labelId="simple-select-placeholder-label-label"
                            id="simple-select-placeholder-label"
                            value={this.state.statisticsMonth}
                            onChange={this.statisticMonthChanged}
                            displayEmpty
                            disableUnderline
                            classes={{select: classes.searchSelectPadding}}
                          >
                            { MONTHS.map((month, idx) => {
                              return (
                                <MenuItem value={idx+1}>{month}</MenuItem>
                              )
                            })
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={`customstatgenriccont ${classes.statResultContainer}`}>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstattotalstatmonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.incomes_total'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.monthIncomes.toFixed(2)}€</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatdonemonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.services_done'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.monthPrestations}</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatviewmonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.view_profil'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.monthViewsServices}</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatcommentarymonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.commentary'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.monthReviews}</strong></Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{width: '100%'}}>
                  <Grid container style={{width: '100%'}}>
                    <Grid className={classes.statContainer}>
                      <Grid className={classes.statContainerLabel}>
                        <Typography>{ReactHtmlParser(this.props.t('STATISTICS.year'))}</Typography>
                      </Grid>
                      <Grid>
                        <FormControl>
                          <Select
                            labelId="simple-select-placeholder-label-label"
                            id="simple-select-placeholder-label"
                            value={this.state.statisticsYear}
                            onChange={this.statisticYearChanged}
                            displayEmpty
                            disableUnderline
                            classes={{select: classes.searchSelectPadding}}
                          >
                            { [2019, 2020, 2021].map(year => {
                              return (
                                <MenuItem value={year}>{year}</MenuItem>
                              )
                            })
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={`customstatgenriccont ${classes.statResultContainer}`}>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstattotalstatmonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.incomes_total'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{`${this.state.yearIncomes.toFixed(2)}€`}</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatdonemonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.services_done'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.yearPrestations}</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatviewmonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.view_profil'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.yearViewsServices}</strong></Typography>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical"/>
                      </Grid>
                      <Grid container className={classes.statResultData}>
                        <Grid item xl={12} lg={12} md={12} sm={9} xs={9} className={classes.statResultLabel}>
                          <Typography className={'customstatcommentarymonth'}><strong>{ReactHtmlParser(this.props.t('STATISTICS.commentary'))}</strong></Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={3} xs={3} className={classes.statData}>
                          <Typography><strong>{this.state.yearReviews}</strong></Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Topic>
          </Box>
        </Grid>
        {
          !editable ?
            <Grid className={classes.containerAskQuestion} item>
              <Grid style={{width: '70%'}}>
                <AskQuestion user={user}/>
              </Grid>
            </Grid>
            : null
        }
      </Grid>
    )
  };

  render() {
    const {classes}=this.props
    const {user}=this.getURLProps()


    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Grid className={classes.profileLayoutContainer}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.layoutMobileProfileContainer}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}
export default withTranslation('custom', {withRef: true})(withStyles(styles)(ProfileStatistics))
