import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CommentaryStyle';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

class Commentary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 4
    }
  }

  render(){
    const {classes} = this.props;

    return (
     <Grid>
       <Grid style={{width: '100%', display:'flex', alignItems: 'center'}}>
         <Grid style={{marginRight:15}}>
           <Avatar className={classes.picsSize}/>
         </Grid>
         <Grid>
           <p style={{color:'#4fbdd7'}}>
             Coiffure pour Maëlis
           </p>
           <p style={{color:'#505050'}}>
             Date - Heure
           </p>
         </Grid>
       </Grid>
       <Grid style={{display:'flex', alignItems :'center'}}>
         <Grid style={{display:'flex', flexDirection: 'column', width: '50%'}}>
           <Grid style={{height: 50}}>
             <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
             <p>Accueil</p>
               <Rating name="read-only" value={this.state.value} readOnly className={classes.ratingStyle}/>
             </Box>
           </Grid>
           <Grid style={{height: 50}}>
             <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
               <p>Qualité-prix</p>
               <Rating name="read-only" value={this.state.value} readOnly className={classes.ratingStyle} />
             </Box>
           </Grid>
           <Grid style={{height: 50}}>
             <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
               <p>Communication</p>
               <Rating name="read-only" value={this.state.value} readOnly className={classes.ratingStyle}/>
             </Box>
           </Grid>
         </Grid>
         <Grid style={{width: '50%'}}>
           <Grid>
             <h4>Compliments</h4>
           </Grid>
           <Grid style={{display:'flex'}}>
             <Grid className={classes.cardSkills}>
               <Avatar alt="careful_work" src="../../static/assets/img/skillsAlfred/careful_work.svg" className={classes.avatarSize}/>
               <p>Travail soigneux</p>
             </Grid>
             <Grid className={classes.cardSkills}>
               <Avatar alt="punctuality" src="../../static/assets/img/skillsAlfred/punctuality.svg" className={classes.avatarSize}/>
               <p>Ponctualité</p>
             </Grid>
           </Grid>
         </Grid>
       </Grid>
       <Grid>
         <TextField
           disabled
           id="outlined-multiline-static"
           label="Commentaire"
           multiline
           rows="4"
           defaultValue="Commentaire"
           className={classes.textField}
           margin="normal"
           variant="outlined"
         />
       </Grid>
     </Grid>
    )
  }
}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Commentary);
