import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {BANNER_PRESENTATION, B2B_BANNER_PRESENTATION} from '../../../utils/i18n';
import Link from 'next/link';
import styles from '../../../static/css/components/BannerPresentation/BannerPresentation'
import withStyles from "@material-ui/core/styles/withStyles";
import {is_b2b_style} from "../../../utils/context.js";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

class BannerPresentation extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {classes} = this.props;

    const title = is_b2b_style() ? B2B_BANNER_PRESENTATION.title : BANNER_PRESENTATION.title
    const text = is_b2b_style() ? B2B_BANNER_PRESENTATION.text : BANNER_PRESENTATION.text
    return (
      <Grid container spacing={2} style={{width: '100%', margin:0}}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Grid>
            <h2 className={classes.bannerPresentationTitle}>
              <span className={classes.titleSpan}>{title}</span>
              {is_b2b_style() ?
                <span className={classes.subtitleSpan}>{B2B_BANNER_PRESENTATION.subTitle}</span> : null
              }
            </h2>
          </Grid>
          <Grid>
            <p className={classes.bannerPresentationText}>{text}</p>
          </Grid>
          <Grid className={classes.containerLinkDiscrover}>
            <Link href={'/search?search=1'}>
              <Button
                variant={is_b2b_style() ? 'outlined' : "contained"}
                classes={{root: is_b2b_style() ? classes.bannerPresentationButtonB2b : classes.bannerPresentationButton}}>
                {BANNER_PRESENTATION.button}
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Hidden only={['md', 'sm', 'xs']}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.illuContainer}>
            <img title={'illuB2b'} alt={'illuB2b'} src={`../../../static/assets/img/homePage/${is_b2b_style() ? 'b2bIllu' : 'illuHeader'}.svg`} className={classes.illuStyle}/>
          </Grid>
        </Hidden>
      </Grid>
    );
  }

}

export default withStyles(styles)(BannerPresentation)
