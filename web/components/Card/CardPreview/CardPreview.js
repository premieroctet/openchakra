import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Avatar from "@material-ui/core/Avatar";
const {circular_get}=require('../../../utils/functions');
import styles from '../../../static/css/components/Card/CardPreview/CardPreview'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

class CardPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {item, classes} = this.props;

    if (!item) {
      return null
    }
    return(
      <Grid style={{height: '100%'}}>
        <Grid style={{height: '20%', position:'relative'}}>
          <Grid style={{position: 'absolute', bottom: 0, left: '50%', transform:'translate(-50%,50%)',zIndex: 1}}>
            <Grid className={classes.cardPreviewContainerAvatar}>
              <Avatar alt="Remy Sharp" src={item.user.picture} className={classes.cardPreviewLarge} />
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{height: '80%'}}>
          <Grid className={classes.cardPreviewBoxContentContainer}>
            <Grid className={classes.cardPreviewBoxContentPosition}>
              <Grid className={classes.cardPreviewContentIdentity}>
                <Grid>
                  <Typography className={classes.cardPreviewNameAlfred}>{item.user.firstname}</Typography>
                </Grid>
                <Grid>
                  <Typography className={classes.cardPreviewLabelService}>{item.service.label}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.cardPreviewServiceContent}>
                <Grid>
                  <Typography>Lieux</Typography>
                </Grid>
                <Grid>
                  <Box component="fieldset" mb={item.user.score} borderColor="transparent" classes={{root: classes.cardPreviewRatingBox}}>
                    <Rating
                      name="simple-controlled"
                      value={item.user.score}
                      max={1}
                      readOnly
                    />
                    <Typography>({item.user.score})</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles (styles)(CardPreview);
