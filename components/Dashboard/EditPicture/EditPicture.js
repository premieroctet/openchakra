import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './EditPictureStyle';
import cookie from 'react-cookies';

class EditPicture extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      result: {},
      picture: null,
      id:null
    };
  }

  static getInitialProps ({ query: { id } }) {
    return { prestation_id: id }
  }

  componentDidMount() {
    localStorage.setItem('path',Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token')
    axios.get(`/myAlfred/api/admin/${this.props.type}/all/${this.props.id}`)
      .then(response => {
        console.log(response, ' response');
        let result = response.data;
        this.setState({result: result});
      })
      .catch(err => {
        console.error(err);
        if(err.response.status === 401 || err.response.status === 403) {
          cookie.remove('token', { path: '/' })
          Router.push({pathname: '/login'})
        }
      });
  }

  onChange = e => {
    this.setState({picture:e.target.files[0]})
  };

  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picture',this.state.picture);
    axios.post(`/myAlfred/api/admin/${this.props.type}/editPicture/${this.props.id}`,formData)
      .then(res => {
        alert('Photo modifiée avec succès');
        Router.push({pathname:`/dashboard/${this.props.type}`+`s/all`})
      })
      .catch(err => {
        console.error(err);
      })
  };

  render()  {
    const { classes } = this.props;
    const {result} = this.state;

    return (
      <Grid container className={classes.loginContainer}>
        <Card className={classes.card}>
          <Grid>
            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography style={{ fontSize: 30 }}>{result.label}</Typography>
            </Grid>
            <form onSubmit={this.onSubmit}>
              {result.picture !== "" ?
                <img src={`../../../${result.picture}`} alt='image' width={100}/>
                :null
              }
              <Grid item>
                <input type="file" name="picture" onChange= {this.onChange} accept="image/*" />
              </Grid>
              <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                  Modifier
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    );
  };
}

EditPicture.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default  withStyles(styles, { withTheme: true })(EditPicture);
