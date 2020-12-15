import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutFaq/LayoutFaq';
import Header from './About/Header';
import Footer from './About/Footer';


class LayoutFaq extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const{children, classes, index}= this.props;
    return(
      <Grid className={classes.mainContainerLayoutFaq}>
        <Header index={index}/>
        <Grid className={classes.childrenContainer}>
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
