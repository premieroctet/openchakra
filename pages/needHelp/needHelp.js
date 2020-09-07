import React from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../../hoc/Layout/Layout';

export default class needHelp extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Layout>
                <Grid style={{marginTop: 100}}>
                    <iframe src={"https://calendly.com/solene-de-my-alfred/15min"} style={{height: 630, width: '100%', border: 0}}  />

                </Grid>
            </Layout>
        )
    }
}
