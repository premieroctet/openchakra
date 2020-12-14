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
    const{children}= this.props;
    return(
      <Grid style={{position:'relative', minHeight: '100vh'}}>
        <Header/>
        <Grid>
          {children}
        </Grid>
        <Grid style={{position: 'absolute', bottom: 0, height: 50, width: '95%', display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
          <Footer/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles) (LayoutFaq);
