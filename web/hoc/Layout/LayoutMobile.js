import React from "react";
import MobileNavbar from "./NavBar/MobileNavbar";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router'

class LayoutMobile extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let currentUrl = Router.pathname;
    console.log(currentUrl)

    let word = currentUrl.split('/').pop().split('/')[0];
    console.log(word)
  };

  render() {
    const{children} = this.props;
    return(
      <React.Fragment style={{position: 'relative'}}>
        <Grid style={{padding: '10%'}}>
          <Grid>
            <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          {children}
        </Grid>
        <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%'}}>
          <Grid style={{width: '90%'}}>
            <MobileNavbar/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LayoutMobile
