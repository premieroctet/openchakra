import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutMobileMessages/LayoutMobileMessages'
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Divider from "@material-ui/core/Divider";
import MobileNavbar from "./NavBar/MobileNavbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class LayoutMobileMessages extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      currentUrlIndex: '',
    }
  }

  handleChange = (event, newValue) => {
    this.setState({tabIndex: newValue}, () => this.props.handleChange())
  };

  render() {
    const {classes, children, tabIndex, currentIndex}= this.props;

    return(
      <Grid>
        <Grid className={classes.layoutMobileMessageHeader}>
          <Grid>
            <Grid style={{padding: '5%'}}>
              <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
                <ArrowBackIosIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid style={{marginLeft:'8vh'}}>
            <h2>Mes Messages</h2>
          </Grid>
          <Grid>
            <Tabs
              value={tabIndex}
              onChange={this.handleChange}
              aria-label="scrollable force tabs"
              classes={{indicator: classes.scrollIndicator}}
            >
              <Tab label={'Mes messages Alfred'} className={classes.scrollMenuTab} />
              <Tab label={"Mes messages d'utilisateur"} className={classes.scrollMenuTab} />
            </Tabs>
          </Grid>
        </Grid>
        <Grid>
          <Divider/>
        </Grid>
        <Grid style={{padding: '10%'}}>
          {children}
        </Grid>
        <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1}}>
          <Grid style={{width: '100%'}}>
            <MobileNavbar currentIndex={currentIndex}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles)(LayoutMobileMessages);
