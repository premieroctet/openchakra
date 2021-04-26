import React from 'react';
import CompanyDashboard from "../../../components/CompanyDashboard/CompanyDashboard";
import Grid from "@material-ui/core/Grid";

class dashboardPage extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <Grid>
        <CompanyDashboard mode={'microservice'}/>
      </Grid>
    )
  }

}

export default dashboardPage;
