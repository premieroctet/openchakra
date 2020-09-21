import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import {INFOBAR_MESSAGE, SHOWMORE} from '../../utils/i18n';

class InfoBar extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
    const {style} = this.props;

    return(
      <Grid container className={style.infoBarMainStyle}>
        <Grid item>
          <p className={style.infoBarColorText}>{INFOBAR_MESSAGE}</p>
        </Grid>
        <Grid item className={style.showmoreContainer}>
          <Link href={"#"}>
            <a href={"#"} className={style.shomoreLink}>{SHOWMORE}</a>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

export default InfoBar
