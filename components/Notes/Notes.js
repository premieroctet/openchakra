import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './NotesStyle'
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';



class Notes extends React.Component{

  render(){
    var {classes, alfred_mode, notes} = this.props;

    console.log("Notes:"+JSON.stringify(notes));
    notes = notes || {};

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    if (alfred_mode) {
      return (
        <>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
          <p>Qualité</p><StyledRating name="read-only" value={parseInt(notes.prestation_quality)} readOnly className={classes.ratingStyle}/>
          </Box>
        </Grid>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
            <p>Prix</p><StyledRating name="read-only" value={parseInt(notes.quality_price)} readOnly className={classes.ratingStyle} />
          </Box>
        </Grid>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
            <p>Relationnel</p><StyledRating name="read-only" value={parseInt(notes.relational)} readOnly className={classes.ratingStyle}/>
          </Box>
        </Grid>
        </>
      )
    }
    else {
      return (
        <>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
          <p>Accueil</p><StyledRating name="read-only" value={parseInt(notes.reception)} readOnly className={classes.ratingStyle}/>
          </Box>
        </Grid>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
            <p>Précision</p><StyledRating name="read-only" value={parseInt(notes.accuracy)} readOnly className={classes.ratingStyle} />
          </Box>
        </Grid>
        <Grid style={{height: 50}}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
            <p>Relationnel</p><StyledRating name="read-only" value={parseInt(notes.relational)} readOnly className={classes.ratingStyle}/>
          </Box>
        </Grid>
        </>
      )
    }

  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Notes);
