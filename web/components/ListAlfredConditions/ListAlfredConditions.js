import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoWithPics from "../InfoWithPics/InfoWithPics";

export default class ListAlfredConditions extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const{columnsXl, columnsLG, columnsMD, columnsSM, columnsXS, wrapperComponentProps} = this.props;
    return(
      <Grid container justifyContent={'center'} style={{padding: '5%'}}>
        {
          wrapperComponentProps ?
          Object.keys(wrapperComponentProps).map(res => (
            <Grid item xl={columnsXl} lg={columnsLG} md={columnsMD} sm={columnsSM} xs={columnsXS}>
              <InfoWithPics  {...this.props} data={wrapperComponentProps[res]}/>
            </Grid>
          )) : null
        }
      </Grid>
    );
  }
}
