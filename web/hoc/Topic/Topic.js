import Grid from "@material-ui/core/Grid";
import React from 'react';

function WithTopic(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const{title, summary, style} = this.props;

      return(
        <Grid>
          <Grid>
            <h3>{title}</h3>
          </Grid>
          <Grid>
            <h4>{summary}</h4>
          </Grid>
          <Grid>
            <WrappedComponent {...this.props}/>
          </Grid>
        </Grid>
      )
    }
  }
}

export default WithTopic
