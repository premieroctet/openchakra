import React from 'react';
import Grid from '@material-ui/core/Grid';
import {INFOBAR_MESSAGE} from '../../utils/i18n';

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
            <img src={'../../static/assets/icon/warning.svg'} alt={'warning'} title={'warning'} width={'100%'} height={'100%'}/>
          </Grid>
          <Grid>
            <a href={'#'} className={style.infoBarColorText}>{INFOBAR_MESSAGE}</a>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default InfoBar
