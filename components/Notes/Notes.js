import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './NotesStyle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

class Notes extends React.Component{

  render(){
    var {classes, alfred_mode, notes, styleComponent} = this.props;

    notes = notes || {};

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    if (alfred_mode) {
      return (
        <Grid className={classes.mainContainerNotes}>
          <Grid>
            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
              <Grid container className={classes.centerLabelandRating}>
                <Grid className={classes.widthContainerText}>
                  <Typography>Qualité</Typography>
                </Grid>
                <Grid>
                  <StyledRating name="read-only" value={parseInt(notes.prestation_quality)} readOnly className={classes.ratingStyle}/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid className={styleComponent ? classes.noMarginContainerNotes : classes.marinContainerNotes}>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid container className={classes.centerLabelandRating}>
                  <Grid className={classes.widthContainerText}>
                    <Typography>Prix</Typography>
                  </Grid>
                  <Grid>
                    <StyledRating name="read-only" value={parseInt(notes.quality_price)} readOnly className={classes.ratingStyle} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid className={styleComponent ? classes.noMarginContainerNotes : classes.marinContainerNotes}>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid container className={classes.centerLabelandRating}>
                  <Grid className={classes.widthContainerText}>
                    <Typography>Relationnel</Typography>
                  </Grid>
                  <Grid>
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
                <Grid className={classes.widthContainerText}>
                  <Typography>Accueil</Typography>
                </Grid>
                <Grid>
                  <StyledRating name="read-only" value={parseInt(notes.reception)} readOnly className={classes.ratingStyle}/>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid className={styleComponent ? classes.noMarginContainerNotes : classes.marinContainerNotes}>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid className={classes.widthContainerText}>
                  <Typography>Précision</Typography>
                </Grid>
                <Grid>
                  <StyledRating name="read-only" value={parseInt(notes.accuracy)} readOnly className={classes.ratingStyle} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid className={styleComponent ? classes.noMarginContainerNotes : classes.marinContainerNotes}>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent" className={classes.labelRating}>
                <Grid className={classes.widthContainerText}>
                  <Typography>Relationnel</Typography>
                </Grid>
                <Grid>
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
