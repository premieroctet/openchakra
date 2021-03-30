import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/ShowCertification/ShowCertification';
const {setAxiosAuthentication}=require('../../utils/authentication');

class ShowCertification extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      services: [],
    }
  }

  componentDidMount() {
    setAxiosAuthentication();

    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let shop = response.data;
        this.setState({
          shop: shop,
          services: shop.services
        })
      }).catch(err => console.error(err))
  }

  render() {
    const {shop, services} = this.state;

    let certifications = services ?  services.map(a => a.certification) : [];

    return(
      <Grid container spacing={2} style={{margin: 0, width:'100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Certifications</h3>
        </Grid>
        <Grid container spacing={2} item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            shop ?
              certifications.map(x => {
                if(x.name){
                  return(
                    <Grid container spacing={2} item xl={3} lg={3} md={3} sm={3} xs={3} style={{margin:0, width: '100%', boxShadow:'0px 0px 6px -2px #696767', borderRadius: 30}}>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <h4>{x.name}</h4>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <Typography>{x.year}</Typography>
                      </Grid>
                    </Grid>
                  )
                }})
              : null
          }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles) (ShowCertification);
