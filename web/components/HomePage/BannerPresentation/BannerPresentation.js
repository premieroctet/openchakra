import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {BANNER_PRESENTATION} from '../../../utils/i18n';

class BannerPresentation extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    const {style} = this.props;
    return (
      <Grid className={style.bannerPresentationMainStyle}>
        <Grid className={style.bannerPresentationContainerDescription}>
          <Grid>
            <p className={style.bannerPresentationTitle}>{BANNER_PRESENTATION.title}</p>
          </Grid>
          <Grid className={style.bannerPresentationContainerText}>
            <p className={style.bannerPresentationText}>{BANNER_PRESENTATION.text}</p>
          </Grid>
          <Grid>
            <Button variant="contained" classes={{root: style.bannerPresentationButton}}>{BANNER_PRESENTATION.button}</Button>
          </Grid>
        </Grid>
        <Grid className={style.bannerPresentationContainerIllustration}>
          <Grid>
            <p>mon illu</p>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default BannerPresentation
