import React from "react";
import Grid from "@material-ui/core/Grid";


class InfoWithPics extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{data} = this.props;

    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            {data.IconName}
          </Grid>
          <Grid>
            <Grid>
              <h4>{data.title}</h4>
            </Grid>
            <Grid>
              <p>{data.summary}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default InfoWithPics
