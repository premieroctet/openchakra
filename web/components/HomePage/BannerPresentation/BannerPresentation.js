import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
            <h1 className={style.bannerPresentationTitle}>Et si vous pouviez réserver n'importe quel service ?</h1>
          </Grid>
          <Grid className={style.bannerPresentationContainerText}>
            <p>Avec des milliers de services disponibles,
              my Alfred va rendre votre vie plus simple.</p>
          </Grid>
          <Grid>
            <Button variant="contained" classes={{root: style.bannerPresentationButton}}>Découvrir</Button>
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
