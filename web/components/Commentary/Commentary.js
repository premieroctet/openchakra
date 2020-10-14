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
    const user_id = this.props.user_id;
    const service_id = this.props.service_id;
    const alfred_mode = this.props.alfred_mode;

    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    if (user_id) {
      axios.get('/myAlfred/api/users/users/' + user_id)
        .then(res => {
          this.setState({owner: res.data});
        })
        .catch(err => console.error(err));
    }

    if (this.props.user_id) {
      const req = alfred_mode ? 'customerReviewsCurrent' : 'alfredReviewsCurrent';
      const url = `/myAlfred/api/reviews/profile/${req}/${this.props.user_id}`;

      axios.get(url)
        .then(res => {
          var reviews = res.data;
          if (service_id) {
            reviews = reviews.filter(r => r.serviceUser._id === service_id);
          }
          this.setState({reviews: reviews});
        })
        .catch(err => console.error(err));
    }
  }


  render() {
    const {owner, reviews, filter} = this.state;
    const {classes, alfred_mode, styleComponent} = this.props;

      const notes = computeAverageNotes(reviews.map(r => alfred_mode ? r.note_alfred : r.note_client));
      const skills = computeSumSkills(reviews.map(r => alfred_mode ? r.note_alfred : r.note_client));

      return (
        <Grid style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <p>illona</p>
            </Grid>
            <Grid>
              <p>17/09/20</p>
            </Grid>
            <Grid>
              <p>garde chien</p>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
            </Grid>
            <Grid>
              <p>le rating</p>
            </Grid>
            <Grid>
              <p>la description</p>
            </Grid>
            <Grid>
              <Button>je recommande illona</Button>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'row'}}>
              {
                [...Array(3)].map( (res, index) => (
                  <Grid key={index}>
                    <Skills/>
                  </Grid>
                ))
              }
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
