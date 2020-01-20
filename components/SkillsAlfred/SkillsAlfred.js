import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SkillsAlfredStyle'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

class SkillsAlfred extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dense: false,
      secondary: false,
      valueRating: 3,
      isChecked: false
    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item>
          <Grid className={classes.mainContainer}>
            <Grid className={classes.cardSkills}>
              <Avatar alt="careful_work" src="../../static/assets/img/skillsAlfred/careful_work.svg" className={classes.avatarSize}/>
              <Chip label="3" className={classes.chipStyle} />
              <Typography>Travail soigneux</Typography>
            </Grid>
            <Grid className={classes.cardSkills}>
              <Avatar alt="punctuality" src="../../static/assets/img/skillsAlfred/punctuality.svg" className={classes.avatarSize}/>
              <Chip label="3" className={classes.chipStyle}/>
              <Typography>Ponctualité</Typography>
            </Grid>
            <Grid className={classes.cardSkills}>
              <Avatar alt="flexibility" src="../../static/assets/img/skillsAlfred/flexibility.svg" className={classes.avatarSize}/>
              <Chip label="3" className={classes.chipStyle}/>
              <Typography>Flexibilité</Typography>
            </Grid>
            <Grid className={classes.cardSkills}>
              <Avatar alt="attentive" src="../../static/assets/img/skillsAlfred/attentive.svg" className={classes.avatarSize}/>
              <Chip label="3" className={classes.chipStyle}/>
              <Typography>Attentive</Typography>
            </Grid>
            <Grid className={classes.cardSkills}>
              <Avatar alt="reactivity" src="../../static/assets/img/skillsAlfred/reactivity.svg" className={classes.avatarSize}/>
              <Chip label="3" className={classes.chipStyle}/>
              <Typography>reactivity</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

SkillsAlfred.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(SkillsAlfred);
