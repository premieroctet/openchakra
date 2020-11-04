import React from "react";
import MobileNavbar from "./NavBar/MobileNavbar";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router'

class LayoutMobile extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      currentUrlIndex : ''
    }

  }

  componentDidMount(){
    let currentUrl = Router.pathname;
    let firstParamUrl= currentUrl.split('/')[1].split('/')[0];

    switch (firstParamUrl) {
      case 'account':
        this.setState({currentUrlIndex: 4});
        break;
      case '/':
        this.setState({currentUrlIndex: 1});
        break;
      case 'Search':
        this.setState({currentUrlIndex: 2});
        break;
      default:
        this.setState({currentUrlIndex: ''});
    }
  };

  render() {
    const{children} = this.props;
    const{currentUrlIndex} = this.state;

    return(
      <React.Fragment>
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
            <MobileNavbar currentUrlIndex={currentUrlIndex}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LayoutMobile
