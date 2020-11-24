import React from 'react'
import axios from 'axios'
import CardService from '../Card/CardService/CardService'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import cookie from "react-cookies";

class Services extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes, shop}=this.props;

    if (!shop.services) {
      return null
    }

    return (
      <React.Fragment>
        <Grid>
          <Typography>Services ({shop.services.length})</Typography>
        </Grid>
        <Grid container spacing={2} style={{marginTop: '5vh'}}>
        {
          shop.services.map(s => (
            <Grid item xl={3} xs={12} sm={6} md={3} lg={3}>
              <CardService item={s._id} page={0} profileMode={true}/>
            </Grid>
          ))
        }
        </Grid>
      </React.Fragment>
    )
  }
}

export default Services;
