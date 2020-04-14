import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import axios from 'axios';

class test extends React.Component {
    constructor(props) {
        super(props);

    }


    test = () => {
      axios.post("/myAlfred/api/mailing/sendMail/30", {tagada:12});
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
