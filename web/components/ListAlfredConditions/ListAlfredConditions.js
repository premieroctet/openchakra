import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoWithPics from "../InfoWithPics/InfoWithPics";
import styles from '../../static/css/components/ListAlfredConditions/ListAlfredConditions'
import withStyles from "@material-ui/core/styles/withStyles";


class ListAlfredConditions extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const{columnsXl, columnsLG, columnsMD, columnsSm, columnsXS, wrapperComponentProps, classes} = this.props;
    return(
      <Grid container className={classes.mainContainerListAlfred}>
        {
          wrapperComponentProps ?
          Object.keys(wrapperComponentProps).map((res, index) => (
            <Grid item xl={columnsXl} lg={columnsLG} md={columnsMD} sm={columnsSm} xs={columnsXS} key={index}>
              <InfoWithPics  {...this.props} data={wrapperComponentProps[res]}/>
            </Grid>
          )) : null
        }
      </Grid>
    );
  }
}

export default withStyles (styles) (ListAlfredConditions)
