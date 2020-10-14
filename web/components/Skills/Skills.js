import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './SkillsStyle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alfred: [],
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
      },
    };
  }

  render() {
    const {classes, hideCount, onClick, needTitle, alfred, widthHr} = this.props;

    return (
      <Grid>
        <Grid className={classes.shape}>
          <EmojiEmotionsIcon/>
        </Grid>
      </Grid>
    );
  }
}

Skills.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Skills);
