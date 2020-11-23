import React from 'react';
import Grid from '@material-ui/core/Grid';
import {INFOBAR_MESSAGE} from '../../utils/i18n';
import Link from 'next/link';
import {Typography} from '@material-ui/core';


class InfoBar extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
    const {style} = this.props;

    return(
      <Grid container className={style.infoBarMainStyle}>
        <Grid item className={style.infoBarLinkContainer}>
          <Grid className={style.infoBarPicsContainer}>
            <img src={'/static/assets/img/warning.svg'} alt={'warning'} title={'warning'} width={'100%'} height={'100%'}/>
          </Grid>
          <Grid>
            <Typography className={style.infoBarColorText}>{INFOBAR_MESSAGE.message}</Typography>
          </Grid>
          <Grid item className={style.showmoreContainer}>
            <Link href={"#"}>
              <a href={"#"} className={style.shomoreLink}>{INFOBAR_MESSAGE.showMore}</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default InfoBar
