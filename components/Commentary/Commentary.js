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
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

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

    axios.get(url)
      .then (res => {
        var reviews = res.data;
        if (service_id) {
          reviews = reviews.filter( r => r.serviceUser._id===service_id);
        }
        this.setState({reviews:reviews})
      })
      .catch (err => console.log(err));
  }

  render(){
    const {owner, reviews} = this.state;
    const {classes, alfred_mode} = this.props;

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

      return (
        <Grid style={{width: '100%'}}>
          <Grid style={{display: 'flex', width: '100%'}}>
            <Grid style={{width: '50%'}}>
              <Grid style={{display:'flex', flexDirection: 'column'}}>
                <Grid>
                  <Grid>
                    <Box component="fieldset" mb={3} borderColor="transparent" className={classes.flexContainer}>
                      <Grid container style={{alignItems: 'center'}}>
                        <Grid>
                          <Typography className={classes.titleSkills} variant={"h3"}>Note générale</Typography>
                        </Grid>
                        <Grid className={classes.marginLeft}>
                          <Badge classes={{badge: classes.badge}} badgeContent={10} color="primary">
                            <StyledRating name="read-only" value={parseInt(notes.prestation_quality)} readOnly className={classes.ratingStyle}/>
                          </Badge>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid style={{width: 290}}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)', margin: 0}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{marginTop: 30}}>
                <Notes alfred_mode={alfred_mode} notes={notes} key={moment()} />
              </Grid>
            </Grid>
            { alfred_mode ?
              <Grid style={{width: '50%', justifyContent :'center', display: 'flex'}}>
                <Skills alfred={owner} skills={skills}/>
              </Grid>
              :
              null
            }
          </Grid>
          {reviews.map( (r) => (
           <Grid style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
             <hr className={classes.hrSeparator}/>
             <Grid style={{display : 'flex', marginTop: 30}}>
               <Grid style={{width: '50%'}}>
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
                   <Grid style={{display:'flex', flexDirection: 'column', width: '50%', marginLeft: 15}}>
                     <Notes alfred_mode={alfred_mode} notes={alfred_mode ? r.note_alfred : r.note_client} key={moment()} />
                   </Grid>
                 </Grid>
               </Grid>
               {alfred_mode ?
                 <Grid item style={{
                   width: '50%',
                   justifyContent: 'center',
                   display: 'flex'
                 }}>
                   <Grid style={{
                     justifyContent: 'center',
                     display: 'flex'
                   }}>
                     <Skills alfred={r.user} skills={r.note_alfred} hideCount={true}/>
                   </Grid>
                 </Grid> : null
               }
             </Grid>

             <Grid style={{marginTop: 30}}>
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
        </Grid>
      )
    }
}}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Commentary);
