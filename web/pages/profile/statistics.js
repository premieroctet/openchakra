import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import Topic from '../../hoc/Topic/Topic'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import loadable from 'loadable-components';
const Chart = loadable(() => import('react-apexcharts'));
import Router from 'next/router'
import axios from 'axios'
import cookie from 'react-cookies'
const _ = require('lodash');
import Link from 'next/link';

const MONTHS=['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const CHART_OPTIONS= {
  chart: {
    toolbar: {
      show: false
    }
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

class ProfileStatistics extends React.Component {

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
    };
  }

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount};
  }

  componentDidMount() {

    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    const revenus1layer = this.state.revenus;
    revenus1layer.forEach((revenus1layerbis) => {
      const revenus2layer = revenus1layerbis.data;
      revenus2layer.forEach((revenus2layerbis) => {
        const revenusall = revenus2layerbis.x;

      });
    });

    this.loadHistoYear()
    this.loadMonthStatistics()
    this.loadYearStatistics()
  }

  histoYearChanged = e => {
    this.setState({year: e.target.value}, () => loadHistoYear());
  };


  statisticMonthChanged= event => {
    this.setState({statisticsMonth: event.target.value}, () => this.loadMonthStatistics())
  }

  statisticYearChanged= event => {
    this.setState({statisticsYear: event.target.value}, () => this.loadYearStatistics())
  }


  loadHistoYear() {
    const year = this.state.year
    axios.get('/myAlfred/api/performances/incomes/' + year)
      .then(resIncome => {
        let bookings = resIncome.data;
        axios.get('/myAlfred/api/performances/incomes/totalComing/' + year)
          .then(resIncomeTotal => {
            const totalComing = parseInt(resIncomeTotal.data);
            const annualIncome = bookings.reduce((total, amount) => total + amount, 0);

            this.setState({
              revenus: [{data: bookings, name: 'revenus'}],
              totalPaid: annualIncome,
              totalComing: totalComing,
              totalYear: totalComing + annualIncome
            });
          })

      })
      .catch(err => {
        console.error(err);
      });
  }

  loadMonthStatistics() {
    const year = new Date().getFullYear();
    const month=this.state.statisticsMonth
    axios.get(`/myAlfred/api/performances/statistics/${year}/${month}`)
      .then(res => {
        this.setState({
          monthIncomes: res.data.incomes,
          monthPrestations: res.data.prestations,
          monthViewsServices: res.data.totalViews,
          monthReviews: res.data.totalReviews,
        });
      })
      .catch(err => console.error(err));
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
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const {classes, user, index}=this.props
    const {serviceUser} = this.state

    return (
      <ProfileLayout user={user} index={index}>
        <Grid container stylerr={{width: '100%'}}>
          <Grid item xs={12}>
          <Topic underline={true} titleTopic={'Mes revenus'} titleSummary={"Ici, vous pouvez suivre l'évolution de vos revenus et vos statistiques prévisionnelles"}>
          <Grid item className={classes.myRevenu}>
            <Grid container>
            <Grid container>
              <TextField
                id="outlined-select-currency"
                select
                label="Année"
                value={this.state.year}
                onChange={this.histoYearChanged}
                margin="normal"
                variant="outlined"
              >
              {[2019, 2020, 2021].map((year, idx) => {
                  return (
                    <MenuItem value={year}>{year}</MenuItem>
                  )
                })
              }
              </TextField>
            </Grid>

              <Chart className={classes.thechart}
                     options={CHART_OPTIONS}
                     series={this.state.revenus}
                     type="bar"
                     style={{width: '100%'}}
              />
            </Grid>
            <Grid className={classes.therevenus} container style={{textAlign: 'center', marginTop: '50px', borderTop: 'dimgray solid 1px', borderBottom: 'dimgray solid 1px', marginBottom: '30px' }}>
              <Grid item xs={4} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Revenus perçus</Typography>
                <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalPaid}€</Typography>
              </Grid>
              <Grid item xs={4} style={{padding: '40px 0px', margin: '20px 0px'}}>
                <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Revenus à venir</Typography>
                <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalComing}€</Typography>
              </Grid>
              <Grid item xs={4} style={{padding: '40px 0px', borderLeft: 'dimgray solid 1px', margin: '20px 0px'}}>
                <Typography style={{ color: '#7E7E7E', marginBottom: '20px'}}>{`Revenus prévisionnels ${this.state.year}`}</Typography>
                <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalYear}€</Typography>
              </Grid>
            </Grid>
          </Grid>
          </Topic>
          </Grid>
          <Topic underline={true} titleTopic={'Mes statistiques'} titleSummary={'Retrouvez vos nombres de vues, de commentaires ou encore de prestations réalisées'}>
          <Grid item className={classes.myStat} style={{width: '100%'}}>
            <Grid container className={classes.mainContainer} style={{width: '100%'}}>
              <Grid container className={classes.containerStatistique} style={{width: '100%'}}>
              <TextField
                id="outlined-select-currency"
                select
                label="Mois"
                value={this.state.statisticsMonth}
                onChange={this.statisticMonthChanged}
                margin="normal"
                variant="outlined"
              >
              { MONTHS.map((month, idx) => {
                  return (
                    <MenuItem value={idx+1}>{month}</MenuItem>
                  )
                })
              }
              </TextField>
                <Grid item className={classes.webview} style={{width: '100%'}}/>

                <Grid className={classes.therevenus} container style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  borderTop: 'dimgray solid 1px',
                  borderBottom: 'dimgray solid 1px',
                  marginBottom: '30px',
                }}>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Revenu total</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.monthIncomes.toFixed(2)}€</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Prestations réalisées</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.monthPrestations}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Vues du profil</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.monthViewsServices}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Commentaires</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.monthReviews}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.mainContainer} style={{width: '100%'}}>
              <Grid container className={classes.containerStatistique} style={{width: '100%'}}>
              <TextField
                id="outlined-select-currency"
                select
                label="Année"
                value={this.state.statisticsYear}
                onChange={this.statisticYearChanged}
                margin="normal"
                variant="outlined"
              >
              { [2019, 2020, 2021].map((year, idx) => {
                  return (
                    <MenuItem value={year}>{year}</MenuItem>
                  )
                })
              }
              </TextField>
                <Grid item className={classes.webview} style={{width: '100%'}}/>

                <Grid className={classes.therevenus} container style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  borderTop: 'dimgray solid 1px',
                  borderBottom: 'dimgray solid 1px',
                  marginBottom: '30px',
                }}>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Revenu total</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.yearIncomes.toFixed(2)}€</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Prestations réalisées</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.yearPrestations}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Vues du profil</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.yearViewsServices}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Commentaires</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.yearReviews}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Topic>

        </Grid>
      </ProfileLayout>
    )
  }

}
export default withStyles(styles)(ProfileStatistics)
