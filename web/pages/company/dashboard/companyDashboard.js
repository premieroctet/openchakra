import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Layout from "../../../hoc/Layout/Layout";
import LayoutMobileSearch from "../../../hoc/Layout/LayoutMobileSearch";

class companyDashboard extends React.Component{
  constructor(props) {
    super(props);
  }

  content = () => {
    return(
      <Grid>
        <h1>Bonjour</h1>
      </Grid>
    )
  };

  render() {
    const{classes} = this.props;

    return(
      <Grid>
        <React.Fragment>
          <Hidden only={['xs']}>
            <Layout>
              {this.content(classes)}
            </Layout>
          </Hidden>
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <LayoutMobileSearch >
              {this.content(classes)}
            </LayoutMobileSearch>
          </Hidden>
        </React.Fragment>
      </Grid>
    );
  }

}

export default companyDashboard
