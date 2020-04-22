import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
//import ReviewCard from './ReviewCard/ReviewCard';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {StarRate} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import axios from "axios";
import moment from 'moment';
import StarRatings from 'react-star-ratings';
moment.locale('fr');
const _ = require('lodash');

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  title: {
    fontSize: '1.5em',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  reviewCard: {
    padding: '2rem 4rem',
    borderRadius: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarPartContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: '1rem',
  },
  avatar: {
    height: 55,
    width: 55,
  },
  nameAndStarContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  starAndQuickReviewContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  reviewTextContainer: {
    marginTop: '1rem',
  },
  dateContainer: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: 25,
  },
  starContainer: {
    marginRight: '1rem',
  },
  oneWordText: {
    fontSize: 20,
    lineHeight: 1,
  },
});

class review extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      reviews: [],

    };
  }

  componentDidMount() {
    let self = this;

    const id_alfred = self.props.shop;
    axios.get(`/myAlfred/api/shop/alfred/${id_alfred}`)
        .then(function (result) {
          let shop = result.data;
          let idAlfred = shop.alfred._id;

          axios.get(`/myAlfred/api/reviews/alfred/${idAlfred}`)
              .then(function (response) {

                let reviews = response.data;


                self.setState({
                  reviews: _.orderBy(reviews,['date'],['desc']),

                })
              })
              .catch(function (error) {
                console.log(error);
              });
        })
        .catch(function (error) {
          console.log(error)
        });

  }

  render() {
    const {classes} = this.props;
    const {reviews} = this.state;


    const review = reviews.map(e => (
        <Grid item xs={12} sm={6} md={6} key={e._id}>
        <Card className={classes.reviewCard} >
          <Grid container className={classes.reviewContainer}>
            <Grid container className={classes.avatarPartContainer}>
              <Grid item className={classes.avatarContainer}>
                <Avatar alt={e.user.name} src={e.user.picture} className={classes.avatar} />
              </Grid>
              <Grid item style={{ alignSelf: 'flex-end' }}>
                <Grid container className={classes.nameAndStarContainer}>
                  <Grid item>
                    <Typography className={classes.nameText}>{e.user.name} {e.user.firstname}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container className={classes.starAndQuickReviewContainer}>
                      <Grid item className={classes.starContainer}>
                        <StarRatings
                            rating={e.note_alfred.global}
                            starRatedColor={"#2FBCD3"}
                            numberOfStars={5}
                            name='rating'
                            starDimension={'20px'}
                            starHoverColor={'#2FBCD3'}
                            starSpacing={'3px'}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.reviewTextContainer}>
              <Grid item>
                <Typography>
                  {e.content}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.dateContainer}>
              <Grid item>
                <Typography>{moment(e.date).format('L')}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container} spacing={24}>

              {review}

          </Grid>
        </Fragment>
    );
  }
}

export default withStyles(styles)(review);
