import React, {createRef} from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutFaq/LayoutFaq';
import Header from './About/Header';
import Footer from './About/Footer';
import Router from 'next/router';


class LayoutFaq extends React.Component{
  constructor(props){
    super(props);
    this.child = React.createRef();

    this.state={
      becomeAlfredPage: false,
      search: ''
    }

  }

  componentDidMount() {
    if(Router.pathname === '/footer/becomeAlfred'){
      this.setState({becomeAlfredPage : true})
    }
  }

  sendSearch = () =>{
    let state = this.child.current.state;
    this.setState({search: state.search})
    console.log('coucou')
  };



  render(){
    const{classes, index, children}= this.props;
    const{becomeAlfredPage, search}= this.state;
    const Children = () => {return children};


    return(
      <Grid className={classes.mainContainerLayoutFaq}>
        <Header ref={this.child} index={index} search={this.sendSearch}/>
        <Grid className={becomeAlfredPage ? classes.becomeAlfredPageContainer : classes.childrenContainer}>
          <Children search={this.sendSearch}/>
        </Grid>
        <Grid className={classes.footerContainerFaq}>
          <Footer/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles) (LayoutFaq);
