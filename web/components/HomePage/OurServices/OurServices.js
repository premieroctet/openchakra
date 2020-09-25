import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {OUR_SERVICES} from '../../../utils/i18n';

class OurServices extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {style} = this.props;
    return(
      <Grid>
        <Grid className={style.ourServicesMainStyle}>
          <Grid>
            <img src={'../../../static/assets/img/homePage/illuSearch.png'} alt={'illuServices'} title={'illuServices'} width={'100%'} style={{height:'40vh'}}/>
          </Grid>
          <Grid className={style.ourServicesRightContainer}>
            <Grid>
              <p className={style.ourServicesTitle}>{OUR_SERVICES.title}</p>
            </Grid>
            <Grid>
              <p className={style.ourServicesText}>{OUR_SERVICES.text}</p>
            </Grid>
            <Grid>
              <Button variant={'outlined'} className={style.ourServicesButton}>{OUR_SERVICES.button}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OurServices;
