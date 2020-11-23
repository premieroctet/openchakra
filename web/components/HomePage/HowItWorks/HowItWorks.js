import React from 'react';
import Grid from "@material-ui/core/Grid";
import {HOW_IT_WORKS} from '../../../utils/i18n'
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/HowItWorks/HowItWorks'

class HowItWorks extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{classes} = this.props;
    return (
      <Grid className={classes.howItWorksMainStyle}>
        <Grid className={classes.howItWorksMainContainer}>
          <Grid className={classes.howItWorksLeftContainer}>
            <Typography className={classes.howItWorksLeftText}>{HOW_IT_WORKS.leftText}</Typography>
          </Grid>
          <Hidden only={['xs', 'sm']}>
            <Grid className={classes.howItWorksRightContainer}>
              <Grid>
                <Typography className={classes.howItWorksRightText}>
                  {HOW_IT_WORKS.rightText}
                </Typography>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles (styles)(HowItWorks);
