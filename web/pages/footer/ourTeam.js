import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/homePage/index';
import LayoutFaq from "../../hoc/Layout/LayoutFaq";
import Typography from "@material-ui/core/Typography";

class OurTeam extends React.Component {
  constructor(props) {
      super(props);
  }

  static getInitialProps({query: {indexFaq}}) {
    return {index: indexFaq};
  }

  render() {
    const {classes, index} = this.props;
      return (
        <LayoutFaq index={index}>
          <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
              <Grid>
                <h2>Notre équipe</h2>
              </Grid>
              <Grid>
                <Typography>Coming soon !</Typography>
              </Grid>
            </Grid>
          </Grid>
        </LayoutFaq>
      )
  }
}

export default withStyles(styles)(OurTeam)
