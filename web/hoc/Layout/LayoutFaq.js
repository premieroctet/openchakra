import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutFaq/LayoutFaq';
import Header from './About/Header';
import Footer from './About/Footer';
import Router from 'next/router';


class LayoutFaq extends React.Component{
  constructor(props){
    super(props)
    this.state={
      becomeAlfredPage: false
    }
  }

  componentDidMount() {
    if(Router.pathname === '/footer/becomeAlfred'){
      this.setState({becomeAlfredPage : true})
    }
  }

  render(){
    const{children, classes, index}= this.props;
    const{becomeAlfredPage}= this.state;

    return(
      <Grid className={classes.mainContainerLayoutFaq}>
        <Header index={index}/>
        <Grid className={becomeAlfredPage ? classes.becomeAlfredPageContainer : classes.childrenContainer}>
          {children}
        </Grid>
        <Grid className={classes.footerContainerFaq}>
          <Footer/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles) (LayoutFaq);
