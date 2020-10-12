import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoWithPics from "../InfoWithPics/InfoWithPics";

export default class ListAlfredConditions extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <Grid>
        {
          Object.keys(this.props.wrapperComponentProps).map(res => (
            <InfoWithPics {...this.props} data={this.props.wrapperComponentProps[res]}/>
          ))
        }
      </Grid>
    );
  }
}
