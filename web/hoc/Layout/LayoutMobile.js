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

  componentDidMount(){
    let currentUrl = Router.pathname;
    let firstParamUrl= currentUrl.split('/')[1].split('/')[0];
    if(currentUrl === '/account/myProfile'){
      this.setState({myProfilUrl: true})
    }

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
      case 'userServicePreview':
        this.setState({hideMobileNavbar: true});
        break;
      default:
        this.setState({currentUrlIndex: ''});
    }
  };

  render() {
    const{children} = this.props;
    const{currentUrlIndex, myProfilUrl, hideMobileNavbar} = this.state;



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
              <Grid style={{width: '90%'}}>
                <MobileNavbar currentUrlIndex={currentUrlIndex}/>
              </Grid>
            </Grid> : null
        }

      </Grid>
    );
  }
}

export default LayoutMobile
