import React from 'react';
import CompanyDashboard from "../../../components/CompanyDashboard/CompanyDashboard";
import Grid from "@material-ui/core/Grid";
const {MICROSERVICE_MODE, CARETAKER_MODE}=require('../../../utils/consts')

export default class dashboardPage extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      mode: CARETAKER_MODE
    }
  }

  changemode = (mode) =>{
    if(mode === CARETAKER_MODE){
      this.setState({mode: MICROSERVICE_MODE})
    }else{
      this.setState({mode: CARETAKER_MODE})
    }
  }

  render() {
    const{mode}= this.state;

    return(
      <Grid>
        <CompanyDashboard mode={mode} changeMode={this.changemode}/>
      </Grid>
    )
  }
}
