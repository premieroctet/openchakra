import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import cookie from 'react-cookies';
const jwt = require('jsonwebtoken');
const moment = require('moment')
import {Card, Grid, Typography, Checkbox, Avatar} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
const {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, RadialChart}=require('react-vis')
import Layout from '../../hoc/Layout/Layout';

const styles = theme => ({

  signupContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '2%',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
  mediumAvatar: {
    width: 100,
    height: 100,
    marginTop: -10,
    fontSize: 35,
  },
  bigAvatar: {
    width: 200,
    height: 200,
    marginTop: -10,
    fontSize: 70,
  },

});

class statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrations: null,
      ages: null,
      alfred_ages: false,
    };
    this.getCounts = this.getCounts.bind(this);
  }

  getCounts() {

    axios.defaults.headers.common['Authorization'] = cookie.load('token');

    axios.get('/myAlfred/api/admin/statistics')
      .then((response) => {
        this.setState(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401 || error.response.status === 403) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/login'});
        }
      });
    axios.get('/myAlfred/api/admin/registrations')
      .then((response) => {
        this.setState( {registrations: response.data} );
      })
      .catch(error => console.error(error))
    axios.get(`/myAlfred/api/admin/ages?alfred=${this.state.alfred_ages}`)
      .then((response) => {
        this.setState( {ages: response.data} );
      })
      .catch(error => console.error(error))
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const auth = cookie.load('token');
    if (!auth) {
      Router.push('/login');
    } else {
      const token = auth.split(' ')[1];
      const decode = jwt.decode(token);
      this.setState({is_admin: decode.is_admin});
    }
    this.getCounts();
    setInterval(() => this.getCounts(), 30000);
  }

  handleChange = event => {
    this.setState({ alfred_ages : event.target.checked }, () => this.getCounts())
  }

  render() {
    const {classes} = this.props;
    const {alfred_ages} = this.state
    const list =
    <>
      <Grid container className={classes.signupContainer}>
        <Grid item>
          <Typography style={{fontSize: 30}}>Inscrits</Typography>
          <Avatar className={classes.mediumAvatar}>{this.state.users}</Avatar>
        </Grid>
        <Grid item>
          <Typography style={{fontSize: 30}}>Alfred</Typography>
          <Avatar className={classes.mediumAvatar}>{this.state.alfred}</Avatar>
        </Grid>
        <Grid item>
          <Typography style={{fontSize: 30}}>Services</Typography>
          <Avatar className={classes.mediumAvatar}>{this.state.services}</Avatar>
        </Grid>
        <Grid item>
          <Typography style={{fontSize: 30}}>Prestations</Typography>
          <Avatar className={classes.mediumAvatar}>{this.state.prestations}</Avatar>
        </Grid>
        </Grid>
        <Grid container className={classes.signupContainer}>
        { this.state.registrations ?
          <Grid item>
            <Typography style={{fontSize: 30}}>Inscriptions</Typography>
            <XYPlot width={400} height={250} key={1} >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickFormat={d => moment(d).format('MM/YY')} />
              <YAxis />
              <LineSeries data={this.state.registrations} />
            </XYPlot>
          </Grid>
          :
          null
        }
        { this.state.ages ?
          <Grid item>
            <Typography style={{fontSize: 30}}>Tranches d'âges</Typography>
              <FormControlLabel
                control={<Checkbox checked={alfred_ages} label='Alfred seulement' onChange={this.handleChange}/>}
                label={'Alfred seulement'}
              />
            <RadialChart
              width={400}
              height={250}
              key={2}
              data={this.state.ages} showLabels={true}
              labelsStyle={{ fontWeight: 'bold'}}
              />
          </Grid>
          :
          null
        }
      </Grid>
    </>
    const refused = <Grid item style={{display: 'flex', justifyContent: 'center'}}>
      <Typography style={{fontSize: 30}}>Accès refusé</Typography>
    </Grid>;

    return (
      <Layout>
        <Grid container style={{marginTop: 20, width:'90%'}}>
          <Link href={'/dashboard/home'}>
            <Typography className="retour"><HomeIcon className="retour2"/> <span>Retour</span></Typography>
          </Link>
        </Grid>
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card} style={{width:'80%'}}>
            {this.state.is_admin ? list : refused}
          </Card>
        </Grid>
      </Layout>

    );
  };
}

export default withStyles(styles)(statistics);
