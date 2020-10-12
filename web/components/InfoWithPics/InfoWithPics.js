import React from "react";
import Grid from "@material-ui/core/Grid";

class InfoWithPics extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{style, data} = this.props;
    return(
      <Grid>
        <Grid>
          <p>my pics</p>
        </Grid>
        <Grid>
          <Grid>
            <h4>{data}</h4>
          </Grid>
          <Grid>
            <h5>Béatrice a besoin de 24H pour préparer son service</h5>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default InfoWithPics
