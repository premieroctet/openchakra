import Grid from "@material-ui/core/Grid";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import Router from 'next/router';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Topic/Topic';

class Topic extends React.Component {

  constructor(props) {
    super(props);
      this.state={
        subTitleColor: 'rgba(39,37,37,35%)'
      }
    }

    componentDidMount() {
      if(Router.pathname === '/confirmPayement'){
        this.setState({subTitleColor: 'rgba(248, 207, 97, 1)'})
      }
    }

    render() {
      const{subTitleColor} = this.state;
      const{titleTopic, titleSummary, needBackground, underline, classes} = this.props;

      return(
        <Grid>
          <Grid>
            <h3>{titleTopic}</h3>
          </Grid>
          {
            titleSummary ?
              <Grid>
                <Typography style={{color: subTitleColor}}>{titleSummary}</Typography>
              </Grid> : null
          }
          {
            underline ?
              <Grid style={{marginTop: '2%'}}>
                <Divider className={classes.topicDivider}/>
              </Grid> : null
          }
          {this.props.children ?
            <Grid style={{marginTop: '3vh', backgroundColor: needBackground ? 'rgba(229,229,229,1)' : 'white', borderRadius: 27}}>
              { this.props.children }
            </Grid>
            :
            null
          }
        </Grid>
      )
  }

}

export default withStyles(styles)(Topic);
