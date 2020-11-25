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
      currentUrlIndex : '',
      myProfilUrl: false,
      hideMobileNavbar: false
    }

  }

  componentDidMount() {
    if(Router.pathname === '/userServicePreview'){
      this.setState({hideMobileNavbar: true})
    }
  }

  render() {
    const{children, currentIndex} = this.props;
    const{myProfilUrl, hideMobileNavbar} = this.state;



    return(
      <Grid>
        <Grid style={{padding: !hideMobileNavbar ? '10%' : 0}}>
          {!myProfilUrl ?
            <Grid>
              <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid> : null
          }
          {children}
        </Grid>
        {
          !hideMobileNavbar ?
            <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1}}>
              <Grid style={{width: '100%'}}>
                <MobileNavbar currentIndex={currentIndex}/>
              </Grid>
            </Grid> : null
        }

      </Grid>
    );
  }
}

export default LayoutMobile
