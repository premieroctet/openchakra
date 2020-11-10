import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
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

class ProfileStatistics extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      totalIncomes: 0,
      totalPrestations: 0,
      totalViewsServices: 0,
      totalReviews: 0,
      serviceUser: [],
      totalYear: 0,
      totalPaid: 0,
      totalComing: 0,
      options: {
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
      },
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

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  handleChange = e => {
    this.setYear(e.target.value);
  };

  setYear(year) {
    this.setState({year: year}, () => {
      axios.get('/myAlfred/api/performances/incomes/' + year)
        .then(resIncome => {
          let bookings = resIncome.data;
          axios.get('/myAlfred/api/performances/incomes/totalComing/' + year)
            .then(resIncomeTotal => {
              const totalComing = parseInt(resIncomeTotal.data);
              /** Compute alfred's total for each month */
              const month_incomes = bookings.map((b, index) => {
                const month_total = b.reduce((total, booking) => total + booking.alfred_amount, 0);
                return month_total;
              });

              const annual_income = month_incomes.reduce((total, month_income) => total + month_income, 0);

              this.setState({
                revenus: [{data: month_incomes, name: 'revenus'}],
                totalPaid: annual_income,
                totalComing: totalComing,
                totalYear: totalComing + annual_income,
              });
            })

        })
        .catch(err => {
          console.error(err);
        });
    });
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
    const newRevenus = [];
    const year = new Date().getFullYear();
    this.setYear(year);

    axios.get('/myAlfred/api/performances/statistics/totalBookings')
      .then(res => {
        this.setState({totalIncomes: res.data.incomes, totalPrestations: res.data.prestations});
      })
      .catch(err => console.error(err));

    axios.get('/myAlfred/api/performances/statistics/totalViewsServices')
      .then(res => {
        this.setState({totalViewsServices: res.data});
      })
      .catch(err => console.error(err));

    axios.get('/myAlfred/api/performances/statistics/totalReviews')
      .then(res => {
        this.setState({totalReviews: res.data});
      })
      .catch(err => console.error(err));

    axios.get('/myAlfred/api/serviceUser/currentAlfred')
      .then(res => {
        let service = res.data;
        console.log(`Got serviceuser:${JSON.stringify(service)}`)
        this.setState({serviceUser: service});
        let arrayCategory = [];
        service.forEach(s => {
          arrayCategory.push(s.service.category);
        });
        service.forEach(s => {
          const obj = {label: s.service.label};
          axios.post('/myAlfred/api/performances/statistics/bookings/service', obj)
            .then(response => {
              this.setState({
                [s.service.label + 'Incomes']: response.data.incomes,
                [s.service.label + 'Prestations']: response.data.prestations,
              });
            })
            .catch(error => console.log(error));

          axios.get('/myAlfred/api/performances/statistics/reviews/' + s._id)
            .then(result => {
              this.setState({[s.service.label + 'Reviews']: result.data});
            })
            .catch(errors => console.log(errors));
        });
      })
      .catch(err => console.error(err));

  }

  render() {
    const {classes, user}=this.props
    const {serviceUser} = this.state

    return (
      <ProfileLayout user={user}>
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
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value={'2019'}>2019</MenuItem>
                <MenuItem value={'2020'}>2020</MenuItem>
                <MenuItem value={'2021'}>2021</MenuItem>
              </TextField>
            </Grid>

              <Chart className={classes.thechart}
                     options={this.state.options}
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
              <Grid container>
              <TextField
                id="outlined-select-currency"
                select
                label="Mois"
                value={this.state.statisticsMonth}
                onChange={this.handleChange}
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
              </Grid>
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
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalIncomes.toFixed(2)}€</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Prestation réalisées</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalPrestations}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Vues du profil</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalViewsServices}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{padding: '40px 0px', margin: '20px 0px'}}>
                    <Typography style={{color: '#7E7E7E', marginBottom: '20px'}}>Commentaires</Typography>
                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalReviews}</Typography>
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
