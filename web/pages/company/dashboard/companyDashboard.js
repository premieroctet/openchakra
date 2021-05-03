import React from 'react';
import CompanyDashboard from "../../../components/CompanyDashboard/CompanyDashboard";
import Grid from "@material-ui/core/Grid";
const {MICROSERVICE_MODE, CARETAKER_MODE}=require('../../../utils/consts')

export default class dashboardPage extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid>
        <CompanyDashboard mode={CARETAKER_MODE}/>
      </Grid>
    )
  }
}
