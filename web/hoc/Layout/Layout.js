import Hidden from "@material-ui/core/Hidden";

const {setAxiosAuthentication}=require('../../utils/authentication')
import React, {Fragment} from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

import styles from '../../static/css/pages/layout/layoutStyle'
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InfoBar from "../../components/InfoBar/InfoBar";
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu'
import axios from "axios";
import TrustAndSecurity from "./TrustAndSecurity/TrustAndSecurity";
import Divider from "@material-ui/core/Divider";
const {getLoggedUserId, isB2BStyle}=require('../../utils/context')
const {PRO, PART}=require('../../utils/consts')

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      logged: false,
      categories: [],
      user:{}
    }
  }

  componentDidMount() {
    setAxiosAuthentication()

    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let data = res.data;
        this.setState({
          user: data,
          gps: data.billing_address ? data.billing_address.gps : null
        });
      })
      .catch(err => {
        console.error((err))
      })

    axios.get(`/myAlfred/api/category/${isB2BStyle(this.state.user) ? PRO : PART}`)
      .then(res => {
        let cat = res.data;
        // Set label en fonction de PRO PART
        cat.forEach( c => {
          c.label=isB2BStyle(this.state.user) ? c.professional_label : c.particular_label
        })
        this.setState({categories: cat})
      })
      .catch(err => {
        console.error(err)
      })

      if (getLoggedUserId()) {
        this.setState({logged: true});
      }
  }

  render() {
    const {children, selectedAddress, classes, gps, keyword} = this.props;
    const {logged, categories} = this.state;

    return (
      <Grid>
        <Hidden only={['xs', 'sm', 'md']} implementation={"css"} className={classes.hidden}>
          <InfoBar/>
        </Hidden>
        <NavBar selectedAddress={selectedAddress} keyword={keyword} key={this.logged}/>
        <Grid>
          <Grid className={classes.layoutScrollMenu}>
            <ScrollMenu categories={categories} gps={gps} mode={'search'}/>
          </Grid>
          <Grid className={classes.filterMenuDivierContainer}>
            <Divider className={classes.filterMenuDividerStyle}/>
          </Grid>
        </Grid>
        {children}
        <Grid className={classes.mainContainerStyleFooter}>
          <Hidden only={['xs', 'sm', 'md']} implementation={"css"} className={classes.hidden}>
            <Divider style={{width: '100%'}}/>
            <Grid style={{width: '90%', marginTop: '2vh', marginBottom: '2vh'}}>
              <TrustAndSecurity/>
            </Grid>
          </Hidden>
          <Grid className={classes.generalWidthFooter}>
            <Grid style={{width: '85%'}}>
              <Footer/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Layout);
