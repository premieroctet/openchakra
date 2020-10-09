import React, {Fragment} from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import cookie from "react-cookies";
import styles from '../../static/css/layout/layoutStyle'
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InfoBar from "../../components/InfoBar/InfoBar";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      logged: false
    }
  }

  componentDidMount() {
    const token = cookie.load('token');
    if (token) {
      this.setState({logged: true});
    }
  }

  render() {
    const {children, user, selectedAddress, classes} = this.props;
    const {logged} = this.state;

    return (
      <Fragment>
        <InfoBar style={classes} />
        <NavBar style={classes} user={user} selectedAddress={selectedAddress} logged={logged} />
        {children}
        <Grid className={classes.mainContainerStyleFooter}>
          <Grid className={classes.generalWidthFooter}>
        <Footer style={classes}/>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Layout);
