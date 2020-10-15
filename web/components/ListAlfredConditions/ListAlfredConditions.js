import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoWithPics from "../InfoWithPics/InfoWithPics";

export default class ListAlfredConditions extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const{columnsXl} = this.props;
    return(
      <Grid container justifyContent={'center'} style={{padding: '5%'}}>
        {
          this.props.wrapperComponentProps ?
          Object.keys(this.props.wrapperComponentProps).map(res => (
            <Grid item xl={columnsXl}>
              <InfoWithPics  {...this.props} data={this.props.wrapperComponentProps[res]}/>
            </Grid>
          )) : null
        }
      </Grid>
    );
  }
}
