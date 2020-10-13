import Grid from "@material-ui/core/Grid";
import React from 'react';

function WithTopic(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const{titleTopic, titleSummary, style} = this.props;

      return(
        <Grid style={{height: '100%'}}>
          <Grid>
            <h3>{titleTopic}</h3>
          </Grid>
          <Grid>
            <p>{titleSummary}</p>
          </Grid>
          <Grid style={{height: '100%'}}>
            <WrappedComponent {...this.props}/>
          </Grid>
        </Grid>
      )
    }
  }
}

export default WithTopic
