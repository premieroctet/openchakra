import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {INFOBARMOBILE_MESSAGE} from "../../utils/i18n";
import styles from '../../static/css/components/InfoBar/InfoBar'
import withStyles from "@material-ui/core/styles/withStyles";

class InfoBarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.infoBarMainStyle}>
        <Grid item className={classes.infoBarLinkContainer}>
          <Grid style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Grid style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Grid className={classes.infoBarPicsContainer}>
                <img src={'/static/assets/img/warning.svg'} alt={'warning'} title={'warning'} width={'100%'}
                     height={'100%'}/>
              </Grid>
              <Grid>
                <Typography className={classes.infoBarColorText}>{INFOBARMOBILE_MESSAGE.message}</Typography>
              </Grid>
            </Grid>
            <Grid style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Grid item className={classes.showmoreContainer}>
                <Grid>
                  <a href={"https://play.google.com/store/apps/details?id=com.myalfred"}
                     className={classes.shomoreLink}><img style={{height: '48pt'}}
                                                          src="../../static/assets/icon/google-play-badge.png"
                                                          alt=""/></a>
                </Grid>
              </Grid>
              <Grid item className={classes.showmoreContainer}>
                <Grid>
                  <a href={"https://apps.apple.com/fr/app/my-alfred/id1544073864"} className={classes.shomoreLink}>
                    <img style={{height: '48pt'}} src="../../static/assets/icon/appstore-badge.png" alt=""/></a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    )
  }
}

export default withStyles(styles)(InfoBarMobile);

