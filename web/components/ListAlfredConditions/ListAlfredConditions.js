import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoWithPics from "../InfoWithPics/InfoWithPics";

export default class ListAlfredConditions extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const {style} = this.props;
    return(
      <Grid>
        {
          this.props.wrapperComponentProps.map(res => (
            <InfoWithPics {...this.props} data={res}/>
          ))
        }
      </Grid>
    );
  }
}
