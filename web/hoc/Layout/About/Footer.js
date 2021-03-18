import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Link from '../../../components/Link/Link';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../../static/css/components/Layout/About/Footer/Footer';
import Typography from "@material-ui/core/Typography";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
    const {classes}= this.props;
      return (
        <Grid container className={classes.mainContainerFooter}>
          <Grid className={classes.mainContainerWidth}>
            <Grid item>
              <Link href={'/footer/apropos'}>
                <Typography>&Agrave; propos de nous</Typography>
              </Link>
            </Grid>
            <Grid item className={classes.rightMainContainerFooter}>
              { true ? null:
                <Grid item>
                  <Link href={'/'}>
                    <Typography>Sécurité</Typography>
                  </Link>
                </Grid>
              }
              <Grid item className={classes.marginLink}>
                <Link href={'/cgu'}>
                  <Typography>Informations légales</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    }
}

export default withStyles(styles)(Footer)
