import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import cookie from 'react-cookies';

const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
};

class view extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shopBanner: {},
      label: '',


    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getInitialProps({query: {id}}) {
    return {banner_id: id};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const id = this.props.banner_id;
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/admin/shopBanner/all/${id}`)
      .then(response => {
        let shopBanner = response.data;
        this.setState({shopBanner: shopBanner});

      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/login'});
        }
      });

  }

  onChange = e => {

    const state = this.state.shopBanner;
    state[e.target.name] = e.target.value;
    this.setState({shopBanner: state});
  };

  onSubmit = e => {
    e.preventDefault();

    const {label} = this.state.shopBanner;
    const id = this.props.banner_id;
    axios.put(`/myAlfred/api/admin/shopBanner/all/${id}`, {label})
      .then(res => {

        alert('Image modifiée avec succès');
        Router.push({pathname: '/dashboard/shopBanner/all'});
      })
      .catch(err => {
        console.error(err);
      });


  };

  handleClick() {
    const id = this.props.banner_id;
    axios.delete(`/myAlfred/api/admin/shopBanner/all/${id}`)
      .then(res => {

        alert('Image supprimée avec succès');
        Router.push({pathname: '/dashboard/shopBanner/all'});
      })
      .catch(err => {
        console.error(err);
      });


  };


  render() {
    const {classes} = this.props;
    const {shopBanner} = this.state;


    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{shopBanner.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={shopBanner.label}
                    onChange={this.onChange}

                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Modifier
                  </Button>
                  <Button type="button" variant="contained" color="secondary" style={{width: '100%'}}
                          onClick={this.handleClick}>
                    Supprimer
                  </Button>
                </Grid>
              </form>
              <Link href={`editPicture?id=${this.props.banner_id}`}>
                <Button type="button" variant="contained" color="primary" style={{width: '100%'}}>
                  Modifier la photo
                </Button>
              </Link>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(view);
