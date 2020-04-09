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
    console.log("Mount, user is:"+this.props.user_id);
    const alfred_mode = this.props.alfred_mode;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get('/myAlfred/api/users/users/'+this.props.user_id)
      .then (res => {
        this.setState({owner:res.data})
      })
      .catch (err => console.log(err));

    const req = alfred_mode ? 'customerReviewsCurrent':'alfredReviewsCurrent';
    const url = `/myAlfred/api/reviews/profile/${req}/${this.props.user_id}`;
    console.log("Request:"+url);
    axios.get(url)
      .then (res => {
        this.setState({reviews:res.data})
        console.log("Got reviews:"+JSON.stringify(res.data, null, 2));
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
    else return reviews.map( r => (
     <Grid>
       <Grid style={{width: '100%', display:'flex', alignItems: 'center'}}>
         <Grid style={{marginRight:15}}>
           <Avatar className={classes.picsSize}/>
         </Grid>
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
           <Notes alfred_mode={alfred_mode} note={alfred_mode ? r.note_alfred : r.note_client} key={moment()} />
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
}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Commentary);
