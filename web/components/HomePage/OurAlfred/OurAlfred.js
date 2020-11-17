import React from 'react';
import Grid from "@material-ui/core/Grid";
import Router from 'next/router'
import Button from "@material-ui/core/Button";
import CardPreview from "../../Card/CardPreview/CardPreview";
import Hidden from "@material-ui/core/Hidden";
import {CATEGORY} from "../../../utils/i18n";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/OurAlfred/OurAlfred'

class OurAlfred extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const{classes, alfred} = this.props;

    return(
      <Grid className={classes.ourAlfredMainStyle}>
        <Grid className={classes.ourAlfredMainContainer}>
          <Grid className={classes.ourAlfredMainHeader}>
            <Grid className={classes.ourAlfredImgContainer}>
              <img src={'/static/assets/icon/light.png'} alt={'iconStar'} title={'iconStar'}/>
            </Grid>
            <Grid className={classes.ourAlfredTextContainer}>
              <Grid>
                <p className={classes.ourAlfredTitle}>Nos Alfred</p>
              </Grid>
              <Grid>
                <p className={classes.ourAlfredSubtitle}>Découvrez les profils de nos Alfred</p>
              </Grid>
            </Grid>
          </Grid>
          <Hidden only={['xs']}>
            <Grid>
              <Button classes={{root: classes.ourAlfredButton}} onClick={() => Router.push('/search?search=1')}>Tout découvrir</Button>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container className={classes.categorySlideShowContainer} spacing={3} style={{height:'40vh'}}>
          {
            Object.keys(alfred).map(res =>(
              <Grid item>
                <CardPreview item={alfred[res]}/>
              </Grid>
            ))
          }
        </Grid>
        <Hidden only={['xl', 'lg', 'md', 'sm']}>
          <Grid style={{marginTop: '10vh', display: 'flex', justifyContent: 'center'}}>
            <Button variant={'outlined'} classes={{root : classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
              {CATEGORY.button}
            </Button>
          </Grid>
        </Hidden>
      </Grid>

    );
  }
}

export default withStyles(styles)(OurAlfred);
