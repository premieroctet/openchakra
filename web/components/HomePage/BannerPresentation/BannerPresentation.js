import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {BANNER_PRESENTATION, B2B_BANNER_PRESENTATION} from '../../../utils/i18n';
import Link from 'next/link';
import styles from '../../../static/css/components/BannerPresentation/BannerPresentation'
import withStyles from "@material-ui/core/styles/withStyles";
import {is_b2b_site} from "../../../utils/context.js";

class BannerPresentation extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {classes} = this.props;
    console.log(is_b2b_site())
    return (
      <Grid className={classes.bannerPresentationMainStyle}>
        {
          is_b2b_site() ?
            <Grid className={classes.bannerPresentationContainerDescription}>
              <Grid>
                <h1 className={classes.bannerPresentationTitle}>{B2B_BANNER_PRESENTATION.title}</h1>
              </Grid>
              <Grid className={classes.bannerPresentationContainerText}>
                <h2 className={classes.bannerPresentationText}>{B2B_BANNER_PRESENTATION.text}</h2>
              </Grid>
              <Grid>
                <Link href={'/search?search=1'}>
                  <Button variant="contained"
                          classes={{root: classes.bannerPresentationButton}}>{BANNER_PRESENTATION.button}</Button>
                </Link>
              </Grid>
            </Grid> :
            <Grid className={classes.bannerPresentationContainerDescription}>
              <Grid>
                <h1 className={classes.bannerPresentationTitle}>{BANNER_PRESENTATION.title}</h1>
              </Grid>
              <Grid className={classes.bannerPresentationContainerText}>
                <h2 className={classes.bannerPresentationText}>{BANNER_PRESENTATION.text}</h2>
              </Grid>
              <Grid>
                <Link href={'/search?search=1'}>
                  <Button variant="contained"
                          classes={{root: classes.bannerPresentationButton}}>{BANNER_PRESENTATION.button}</Button>
                </Link>
              </Grid>
            </Grid>
        }
      </Grid>
    );
  }

}

export default withStyles(styles)(BannerPresentation)
