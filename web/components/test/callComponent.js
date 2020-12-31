import React from 'react';
import Grid from "@material-ui/core/Grid";

class CallComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, 'myprops');
    return(
      <Grid>

      </Grid>
    );
  }
}
export default CallComponent;
