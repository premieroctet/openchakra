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
      alfred:[],
      dense: false,
      secondary: false,
      valueRating: 3,
      isChecked: false,
      skills: {
        skillOne: {
          label: 'Travail soigneux',
          picsLabel: 'careful_work'
        },
        skillTwo: {
          label: 'Ponctualité',
          picsLabel: 'punctuality'
        },
        skillThree: {
          label: 'Flexibilité',
          picsLabel: 'flexibility'
        },
        skillFive: {
          label: 'Réactivité',
          picsLabel: 'reactivity'
        },
      }

    }
  }
  render(){
    const {classes, alfred, widthHr} = this.props;

    return (
      <Grid>
        <Grid item>
          <Typography variant="h3" className={classes.titleSkills}>
            Les compliments reçus par {alfred.firstname}
          </Typography>
          <Grid className={ widthHr === 500 ? classes.bigWidth : classes.middleWidth}>
            <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
          </Grid>
          <Grid container className={classes.mainContainer}>
            {
              Object.keys(this.state.skills).map(result =>{
                return(
                  <Grid className={classes.cardSkills}>
                    <Avatar alt="careful_work" src={'/static/assets/img/skillsAlfred/' + this.state.skills[result].picsLabel + '.svg'} className={classes.avatarSize}/>
                    <Chip label="0" className={classes.chipStyle} />
                    <Typography>{this.state.skills[result].label}</Typography>
                  </Grid>
                )
              })
            }
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
