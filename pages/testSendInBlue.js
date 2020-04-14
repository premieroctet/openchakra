import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
//const SibApiV3Sdk = require('sib-api-v3-sdk');
//const sendinblue = require('sendinblue-api');
const SibApiV3Sdk= require('sib-api-v3-sdk');
 
import SIB_API_KEY from '../utils/consts';

class test extends React.Component {
    constructor(props) {
        super(props);

    }


    test = () => {
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      var apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = SIB_API_KEY;
    }

    render() {

        return (
                <Grid container>
                    <Grid item md={7} sm={12} style={{paddingLeft:'3%'}}>
                        <Grid container>
                        <Button onClick={this.test}>Test</Button>
                      </Grid>
                    </Grid>
                </Grid>
        );
    };
}


export default test;
