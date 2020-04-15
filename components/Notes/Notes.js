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

    notes = notes || {};

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    if (alfred_mode) {
      return (
        <Grid>
          <Grid>
            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
              <Grid container style={{alignItems:'center'}}>
                <Grid className={classes.widthP}>
                  <p>Qualité</p>
                </Grid>
                <Grid className={classes.marginLeft}>
                  <StyledRating name="read-only" value={parseInt(notes.prestation_quality)} readOnly className={classes.ratingStyle}/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid container style={{alignItems:'center'}}>
                  <Grid className={classes.widthP}>
                    <p>Prix</p>
                  </Grid>
                  <Grid className={classes.marginLeft}>
                    <StyledRating name="read-only" value={parseInt(notes.quality_price)} readOnly className={classes.ratingStyle} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid container style={{alignItems:'center'}}>
                  <Grid className={classes.widthP}>
                    <p>Relationnel</p>
                  </Grid>
                  <Grid className={classes.marginLeft}>
                    <StyledRating name="read-only" value={parseInt(notes.relational)} readOnly className={classes.ratingStyle}/>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )
    }
    else {
      return (
        <Grid>
          <Grid>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid className={classes.widthP}>
                  <p>Accueil</p>
                </Grid>
                <Grid className={classes.marginLeft}>
                  <StyledRating name="read-only" value={parseInt(notes.reception)} readOnly className={classes.ratingStyle}/>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid className={classes.widthP}>
                  <p>Précision</p>
                </Grid>
                <Grid className={classes.marginLeft}>
                  <StyledRating name="read-only" value={parseInt(notes.accuracy)} readOnly className={classes.ratingStyle} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid className={classes.widthP}>
                  <p>Relationnel</p>
                </Grid>
                <Grid className={classes.marginLeft}>
                  <StyledRating name="read-only" value={parseInt(notes.relational)} readOnly className={classes.ratingStyle}/>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )
    }

  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Notes);
