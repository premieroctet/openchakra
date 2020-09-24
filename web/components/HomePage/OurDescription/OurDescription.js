import React from 'react';
import Grid from '@material-ui/core/Grid';
import {OUR_DESCRIPTION} from '../../../utils/i18n'

class OurDescription extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style} = this.props;
    return(
      <Grid className={style.ourDescriptionMainStyle}>
        <Grid className={style.ourDescriptionMainContainer}>
          <Grid className={style.ourDescriptionContainer}>
            <Grid>
              <q className={style.ourDescriptionContainerText}><cite>{OUR_DESCRIPTION.text}</cite></q>
            </Grid>
            <Grid>
              <p className={style.ourDescriptionContainerSubText}>{OUR_DESCRIPTION.from}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OurDescription;

