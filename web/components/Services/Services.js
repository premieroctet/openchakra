import React from 'react'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './ServicesStyle';
import cookie from 'react-cookies';
import withGrid from "../../hoc/Grid/GridCard"
import withSlide from "../../hoc/Slide/SlideShow"
import CardService from '../Card/CardService/CardService'
import Box from "../Box/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const {frenchFormat} = require('../../utils/text')
const {SlideGridDataModel} = require('../../utils/models/SlideGridDataModel')


class Services extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      shop:null
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let shop = response.data;
        this.setState({
          shop: shop,
        })
    })
  }

  render() {
    const {classes}=this.props;
    const {shop}=this.state;
    if (!shop) {
      return null
    }

    return (
      <Box>
        <Grid>
          <Typography>Services ({shop.services.length})</Typography>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
        {
          shop.services.map(s => (
            <Grid item xl={3}>
              <CardService item={s._id} page={0} profileMode={true}/>
            </Grid>
          ))
        }
        </Grid>
      </Box>

    )
  }

}

export default Services;
