import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutMobileSearch/LayoutMobileSearch'
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MobileNavbar from "./NavBar/MobileNavbar";
import NavBar from "./NavBar/NavBar";

class LayoutMobileSearch extends React.Component{
  constructor(props) {
    super(props);
    this.child = React.createRef();
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

  callFilter = () =>{
    let childState = this.child.current.state;
    this.props.filter(childState)
  };

  render() {
    const{children} = this.props;
    const{currentUrlIndex} = this.state;
    return(
      <Grid>
        <Grid>
          <NavBar filter={this.callFilter} ref={this.child}/>
        </Grid>
        <Grid>
          {children}
        </Grid>
          <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1}}>
            <Grid style={{width: '90%'}}>
              <MobileNavbar currentUrlIndex={currentUrlIndex}/>
            </Grid>
          </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LayoutMobileSearch);
