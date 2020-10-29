import Grid from "@material-ui/core/Grid";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import Router from 'next/router';


function WithTopic(WrappedComponent) {

  return class extends React.Component {
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
      const{titleTopic, titleSummary, needBackground, underline} = this.props;

      return(
        <Grid style={{height: '100%'}}>
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
                <Divider style={{height: 6, backgroundColor:'rgba(178, 204, 251, 100%)', borderRadius: 27, width: '3vw'}}/>
              </Grid> : null
          }
          {WrappedComponent ?
            <Grid style={{marginTop: '3vh', backgroundColor: needBackground ? 'rgba(229,229,229,1)' : 'white', borderRadius: 27}}>
              <WrappedComponent {...this.props}/>
            </Grid>
            :
            null
          }
        </Grid>
      )
    }
  }
}

export default WithTopic;
