import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './CommentaryStyle';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import moment from 'moment';
import Skills from '../Skills/Skills';
import Notes from '../Notes/Notes';
import {computeAverageNotes, computeSumSkills} from '../../utils/functions';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import cookie from 'react-cookies';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

class Commentary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 4,
      owner: {},
      reviews: [],
    };
  }

  componentDidMount() {
    const review_id = this.props.review

    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/reviews/review/${review_id}`)
      .then(res => {
        this.setState({review: res.data});
      })
      .catch(err => console.error(err));
  }


  render() {
    const {review, filter} = this.state;
    const {user, classes, styleComponent} = this.props;

    if (!review) {
      return null
    }

    const globalNote = (review.note_alfred ? review.note_alfred : review.note_client).global
    const name = (review.alfred.id==user ? review.user : review.alfred).firstname
      return (
        <Grid container style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
          <Grid item xl={3} style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Typography><strong>{name}</strong></Typography>
            </Grid>
            <Grid>
              <Typography><strong>{moment(review.date).format('L')}</strong></Typography>
            </Grid>
            <Grid>
              <Typography>{review.serviceUser.service.label}</Typography>
            </Grid>
          </Grid>
          <Grid xl={4} item>
            <Grid>
              <Rating name="half-rating-read" value={globalNote} precision={0.5} readOnly />
            </Grid>
            <Grid style={{marginTop: '2%'}}>
              <Typography>{review.content}</Typography>
            </Grid>
            {
              false ?
                <Grid>
                  <Button classes={{root: classes.buttonRecommendation}} startIcon={<ThumbUpIcon />}>je recommande illona</Button>
                </Grid> : true
            }

            <Grid style={{ marginTop: '3%'}}>
              <Skills review={review._id} hideCount={true}/>
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Commentary);
