import React from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from '@material-ui/core/Grid';
import styles from './creaShopStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreaShopPresentation from '../../components/CreaShop/CreaShopPresentation/CreaShopPresentation';

class creaShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {
    const {classes} = this.props;

    return(
      <Layout>
        <Grid className={classes.spacer}/>
        <Grid className={classes.mainContainer}>
          <Grid>
            <CreaShopPresentation/>
          </Grid>
        </Grid>
      </Layout>
    )
  }

}

creaShop.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (creaShop);
