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
    const alfred_mode = this.props.alfred_mode;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get('/myAlfred/api/users/users/'+this.props.user_id)
      .then (res => {
        this.setState({owner:res.data})
      }).catch(error =>{
        console.log(error)
    });
    const req = alfred_mode ? 'alfredReviewsCurrent' : 'customerReviewsCurrent'
    axios.get(`/myAlfred/api/reviews/profile/${req}/${this.props.user_id}`)
      .then (res => {
        this.setState({reviews:res.data})
      }).catch(error => {
        console.log(error)
    })
  }

  render(){
    const {owner, reviews} = this.state;
    const {classes, alfred_mode} = this.props;

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

   console.log("Mode alfred:"+alfred_mode);

    return reviews.map( r => (
     <Grid>
       <Grid style={{width: '100%', display:'flex', alignItems: 'center'}}>
         <Grid style={{marginRight:15}}>
           <Avatar className={classes.picsSize}/>
         </Grid>
         <Grid>
           <p style={{color:'#4fbdd7'}}>
             {r.serviceUser.service.label} {alfred_mode ? `par ${r.alfred.firstname}` : `pour ${r.user.firstname}`}
           </p>
           <p style={{color:'#505050'}}>
             {moment(r.date).format('DD/MM/YYYY - HH:mm')}
           </p>
         </Grid>
       </Grid>
       <Grid style={{display:'flex', alignItems :'center'}}>
         <Grid style={{display:'flex', flexDirection: 'column', width: '50%'}}>
         { alfred_mode ?
           <Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
               <p>Qualité</p>
                 <StyledRating name="read-only" value={r.note_alfred.prestation_quality} readOnly className={classes.ratingStyle}/>
               </Box>
             </Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                 <p>Prix</p>
                 <StyledRating name="read-only" value={r.note_alfred.quality_price} readOnly className={classes.ratingStyle} />
               </Box>
             </Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                 <p>Relationnel</p>
                 <StyledRating name="read-only" value={r.note_alfred.relational} readOnly className={classes.ratingStyle}/>
               </Box>
             </Grid>
           </Grid>
           :
           <Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
               <p>Accueil</p>
                 <StyledRating name="read-only" value={r.note_client.reception} readOnly className={classes.ratingStyle}/>
               </Box>
             </Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                 <p>Précision</p>
                 <StyledRating name="read-only" value={r.note_client.accuracy} readOnly className={classes.ratingStyle} />
               </Box>
             </Grid>
             <Grid style={{height: 50}}>
               <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                 <p>Relationnel</p>
                 <StyledRating name="read-only" value={r.note_client.relational} readOnly className={classes.ratingStyle}/>
               </Box>
             </Grid>
           </Grid>
         }
         </Grid>
         { alfred_mode?
         <Grid style={{width: '50%'}}>
           <Grid style={{display:'flex'}}>
             <Skills alfred={owner} skills={r.note_alfred} hideCount={true} />
           </Grid>
         </Grid>
         :
         null
       }
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
