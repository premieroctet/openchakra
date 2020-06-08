import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SkillsStyle'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

class Skills extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alfred:[],
      dense: false,
      secondary: false,
      valueRating: 3,
      isChecked: false,
      skills: {
        careful: {
          label: 'Travail soigneux',
          picsLabel: 'careful_work',
        },
        punctual: {
          label: 'Ponctualité',
          picsLabel: 'punctuality',
        },
        flexible: {
          label: 'Flexibilité',
          picsLabel: 'flexibility',
        },
        reactive: {
          label: 'Réactivité',
          picsLabel: 'reactivity',
        },
      }

    }
  }

  render(){
    const {classes, skills, alfred, widthHr, hideCount, onClick} = this.props;

    const skillClicked = (e, name) => {
      e.stopPropagation();
      if (onClick) { onClick(name)}
    }

    return (
      <Grid>
        <Grid item>
          <Grid container className={classes.mainContainer}>
            {
              Object.entries(this.state.skills).map(result =>{
                const name=result[0];
                const value=result[1];
                const skillCount=this.props.skills[name];
                const picLabel = skillCount || !hideCount ? value.picsLabel : value.picsLabel+'_disabled';
                return(
                  <Grid className={classes.cardSkills}>
                    <div onClick={(e) => skillClicked(e, name)} >
                    <Avatar alt="careful_work" src={'/static/assets/img/skillsAlfred/' + picLabel + '.svg'} className={classes.avatarSize} />
                    </div>
                    { hideCount ?
                      null
                      :
                      <Chip label={skillCount} className={classes.chipStyle} />
                    }
                    <Typography >{value.label}</Typography>
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

Skills.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Skills);
