import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';
import {toast} from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Skills from '../components/Skills/Skills';
import cookie from 'react-cookies';
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../hoc/Layout/LayoutMobile";
import LayoutEvaluate from "../hoc/Layout/LayoutEvaluate";
import styles from '../static/css/pages/evaluate/evaluate';


class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      service: {},
      prestation: 0,
      price: 0,
      relational: 0,
      content: '',
      careful: false,
      punctual: false,
      flexible: false,
      reactive: false,
      alfred: {},
    };
  }

  static getInitialProps({query: {booking, id}}) {
    return {booking: booking, service_id: id};

  }


  componentDidMount() {
    const id = this.props.service_id;
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/'});
          }
        },
      );

    axios.get('/myAlfred/api/serviceUser/' + id)
      .then(res => {
        let service = res.data;
        this.setState({service: service});
      }).catch(err => console.error(err))

  }

  onComplimentChanged = (name) => {
    const org = this.state[name];
    console.log(name + ' was ' + org);
    this.setState({[name]: !org});
  };

  changeRating = (newRating, name) => {
    this.setState({
      prestation: newRating,
    });
  };

  changeRating2 = (newRating, name) => {
    this.setState({
      price: newRating,
    });
  };

  changeRating3 = (newRating, name)=> {
    this.setState({
      relational: newRating,
    });
  };

  back() {
    Router.back();
  }

  evaluate = () => {
    const id = this.props.service_id;
    const booking = this.props.booking;
    const service = this.state.service;
    const alfred = service.user._id;
    const content = this.state.content;
    const prestation_quality = this.state.prestation;
    const quality_price = this.state.price;
    const relational = this.state.relational;

    const obj = {
      alfred: alfred,
      service: id,
      booking: booking,
      prestation_quality: prestation_quality,
      quality_price: quality_price,
      relational: relational,
      content: content,
      careful: this.state.careful,
      punctual: this.state.punctual,
      flexible: this.state.flexible,
      reactive: this.state.reactive,
    };

    axios.post('/myAlfred/api/reviews/add/alfred', obj)
      .then(() => {
        toast.info('Commentaire enregistré');
        //Router.push('/merci')
        Router.push(`/reservations/detailsReservation?id=${booking}`);
      })
      .catch(err => {
       console.error(err)
      });

  };

  content = (classes) =>{
    return(
      <Grid container className={classes.bigContainer}>
        <Grid style={{width: '100%'}}>
          <Grid style={{width: '100%',display: 'flex', flexDirection: 'column'}}>
            <Grid item>
              <h3>Qu’avez-vous pensé de la prestation de votre Alfred ?</h3>
            </Grid>
            <Grid container style={{marginTop: '5vh'}} spacing={3}>
              <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex'}}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>Qualité de la prestation</Typography>
                </Grid>
                <Grid  item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <StarRatings
                    rating={this.state.prestation}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                />
                </Grid>
              </Grid>
              <Grid  item container xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid  item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>Qualité - Prix</Typography>
                </Grid>
                <Grid  item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <StarRatings
                    rating={this.state.price}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating2}
                    numberOfStars={5}
                    name='rating2'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                />
                </Grid>
              </Grid>
              <Grid  item container xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid  item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>Relationnel</Typography>
                </Grid>
                <Grid  item xl={6} lg={6} md={6} sm={6} xs={6} >
                  <StarRatings
                    rating={this.state.relational}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating3}
                    numberOfStars={5}
                    name='rating3'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '10vh'}}>
          <Skills
            alfred={this.state.alfred}
            skills={this.state}
            widthHr={'100%'}
            hideCount={true}
            onClick={this.onComplimentChanged}
          />
        </Grid>
        <Grid style={{marginTop: '10vh'}}>
          <Grid>
            <h3>Votre commentaire</h3>
          </Grid>
          <Grid>
            <TextField
              id="outlined-multiline-static"
              style={{width: '100%'}}
              multiline
              rows="6"
              variant="outlined"
              onChange={(e) => this.setState({content: e.target.value})}
            />
          </Grid>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'space-between', marginTop: '10vh'}}>
          <Grid>
            <Button
              onClick={this.back}
              variant={'outlined'}
              classes={{root: classes.buttonBack}}
            >
              Retour
            </Button>
          </Grid>
          <Grid>
            <Button
              disabled={this.state.prestation === 0 || this.state.price === 0 || this.state.relational === 0 || !this.state.content.trim()}
              onClick={this.evaluate}
              variant={'contained'}
              classes={{root: classes.buttonSend}}
              color={'primary'}
            >
              Terminé
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes} = this.props;
    const {user} = this.state;

    return (
      <React.Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutEvaluate user={user}>
            {this.content(classes)}
          </LayoutEvaluate>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile currentIndex={null}>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    );
  };
}


export default withStyles(styles)(Evaluate);
