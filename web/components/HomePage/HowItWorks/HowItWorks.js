import React from 'react';
import Grid from "@material-ui/core/Grid";
import {HOW_IT_WORKS} from '../../../utils/i18n'
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

class HowItWorks extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{style} = this.props;
    return (
      <Grid className={style.howItWorksMainStyle}>
        <Grid className={style.howItWorksMainContainer}>
          <Grid className={style.howItWorksLeftContainer}>
            <Typography className={style.howItWorksLeftText}>{HOW_IT_WORKS.leftText}</Typography>
          </Grid>
          <Hidden only={['xs']}>
            <Grid className={style.howItWorksRightContainer}>
              <Grid>
                <Typography className={style.howItWorksRightText}>
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

export default HowItWorks;
