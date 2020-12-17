import React from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../../hoc/Layout/Layout';

export default class needHelp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Grid style={{marginTop: '10vh', marginBottom: '10vh'}}>
          <iframe src={'https://calendly.com/solene-de-my-alfred/15min'}
                  style={{minHeight: '100vh', width: '100%', border: 0}}/>

        </Grid>
      </Layout>
    );
  }
}
