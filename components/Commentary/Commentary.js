import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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


class Commentary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 4,
      owner:{},
      reviews:[],
    }
  }

  componentDidMount() {
    const user_id = this.props.user_id;
    const service_id = this.props.service_id;
    const alfred_mode = this.props.alfred_mode;
    console.log("Mount, user is:"+user_id);
    console.log("Mount, service is:"+service_id);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    if (user_id) {
      axios.get('/myAlfred/api/users/users/'+user_id)
        .then (res => {
          this.setState({owner:res.data})
        })
        .catch (err => console.log(err));
    }

    const req = alfred_mode ? 'customerReviewsCurrent':'alfredReviewsCurrent';
    const url = `/myAlfred/api/reviews/profile/${req}/${this.props.user_id}`;
    console.log("Request:"+url);
    axios.get(url)
      .then (res => {
        var reviews = res.data;
        console.log("Got reviews:"+JSON.stringify(reviews.map( r => r._id)));
        if (service_id) {
          reviews = reviews.filter( r => r.serviceUser._id=service_id);
        }
        console.log("Reviews count:"+reviews.length);
        this.setState({reviews:res.data})
      })
      .catch (err => console.log(err));
  }

  render(){
    const {owner, reviews} = this.state;
    const {classes, user_id, alfred_mode} = this.props;

  const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    if (!reviews.length) {
      return (
        <div>Aucun commentaire ni note actuellement</div>
    )
    }
    else {
      const notes = computeAverageNotes(reviews.map( r => alfred_mode ? r.note_alfred : r.note_client));
      const skills = computeSumSkills(reviews.map( r => alfred_mode ? r.note_alfred : r.note_client));
      console.log("Got notes:"+JSON.stringify(notes));
      return (
        <>
        <Notes alfred_mode={alfred_mode} notes={notes} key={moment()} />
        { alfred_mode ? <Skills alfred={owner} skills={skills}/> : null }
        {reviews.map( r => (
         <Grid>
           <Grid style={{width: '100%', display:'flex', alignItems: 'center'}}>
             <Grid style={{marginRight:15}}> <Avatar className={classes.picsSize}/> </Grid>
             <Grid>
               <p style={{color:'#4fbdd7'}}>
                 {r.serviceUser.service.label} {alfred_mode ? `pour ${r.user.firstname}` : `par ${r.alfred.firstname}`}
               </p>
               <p style={{color:'#505050'}}>
                 {moment(r.date).format('DD/MM/YYYY - HH:mm')}
               </p>
             </Grid>
           </Grid>
           <Grid style={{display:'flex', alignItems :'center'}}>
             <Grid style={{display:'flex', flexDirection: 'column', width: '50%'}}>
             { console.log('sending notes:'+JSON.stringify(alfred_mode ? r.note_alfred : r.note_client))}
               <Notes alfred_mode={alfred_mode} notes={alfred_mode ? r.note_alfred : r.note_client} key={moment()} />
               </Grid>
           </Grid>
           <Grid>
             <TextField
               disabled
               id="outlined-multiline-static"
               label="Commentaire"
               multiline
               rows="4"
               value={r.content}
               className={classes.textField}
               margin="normal"
               variant="outlined"
             />
           </Grid>
         </Grid>
         ))
        }
        </>
      )
    }
}}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Commentary);
