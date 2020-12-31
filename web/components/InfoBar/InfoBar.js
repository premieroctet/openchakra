import React from 'react';
import Grid from '@material-ui/core/Grid';
import {INFOBAR_MESSAGE} from '../../utils/i18n';
import Link from 'next/link';
import {Typography} from '@material-ui/core';
import styles from '../../static/css/components/InfoBar/InfoBar'
import withStyles from "@material-ui/core/styles/withStyles";


class InfoBar extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
    const {classes} = this.props;

    return(
      <Grid container className={classes.infoBarMainStyle}>
        <Grid item className={classes.infoBarLinkContainer}>
          <Grid className={classes.infoBarPicsContainer}>
            <img src={'/static/assets/img/warning.svg'} alt={'warning'} title={'warning'} width={'100%'} height={'100%'}/>
          </Grid>
          <Grid>
            <Typography className={classes.infoBarColorText}>{INFOBAR_MESSAGE.message}</Typography>
          </Grid>
          <Grid item className={classes.showmoreContainer}>
            <Link href={"#"}>
              <a href={"#"} className={classes.shomoreLink}>{INFOBAR_MESSAGE.showMore}</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(InfoBar);
