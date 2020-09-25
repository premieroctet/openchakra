import React from 'react';
import Grid from "@material-ui/core/Grid";
import {HOW_IT_WORKS} from '../../../utils/i18n'

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
            <p className={style.howItWorksLeftText}>{HOW_IT_WORKS.leftText}</p>
          </Grid>
          <Grid className={style.howItWorksRightContainer}>
            <Grid>
              <p className={style.howItWorksRightText}>
                {HOW_IT_WORKS.rightText}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default HowItWorks;
