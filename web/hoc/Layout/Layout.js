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
const {getLoggedUserId}=require('../../utils/functions')

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      logged: false,
      categories: []
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/category/all/sort').then(res => {
      let cat = res.data;
      this.setState({categories: cat})
    }).catch(err => { console.error(err)})
    if (getLoggedUserId()) {
      this.setState({logged: true});
    }
  }

  render() {
    const {children, selectedAddress, classes, gps, indexCat, keyword} = this.props;
    const {logged, categories} = this.state;

    return (
      <Grid>
        <InfoBar/>
        <NavBar selectedAddress={selectedAddress} keyword={keyword} key={this.logged}/>
        <Grid>
          <Grid className={classes.layoutScrollMenu}>
            <ScrollMenu categories={categories} gps={gps} indexCat={indexCat} mode={'search'}/>
          </Grid>
          <Grid className={classes.filterMenuDivierContainer}>
            <Divider className={classes.filterMenuDividerStyle}/>
          </Grid>
        </Grid>
        {children}
        <Grid className={classes.mainContainerStyleFooter}>
          <Hidden only={['xs', 'sm', 'md']}>
            <Divider style={{width: '100%'}}/>
            <Grid style={{width: '90%', marginTop: '2vh'}}>
              <TrustAndSecurity/>
            </Grid>
          </Hidden>
          <Grid className={classes.generalWidthFooter} >
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
