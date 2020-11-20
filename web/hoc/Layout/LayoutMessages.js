import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutMessages/LayoutMessages'
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import cookie from "react-cookies";
import Layout from "./Layout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class LayoutMessages extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      user:{}
    }
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err))
  };

  handleChange = (event, newValue) => {
    this.setState({tabIndex: newValue}, () => this.props.handleChange())
  };

  render() {
    const{user}= this.state;
    const{children, tabIndex, classes}= this.props;

    return(
      <Layout user={user}>
        <Grid style={{display:'flex', justifyContent:'center'}}>
          <Grid style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2>Mes Messages</h2>
            </Grid>
            <Grid>
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={tabIndex}
                onChange={this.handleChange}
                aria-label="scrollable force tabs"
                scrollButtons="on"
                classes={{indicator: classes.scrollIndicator}}
              >
                <Tab label={'Mes messages Alfred'} className={classes.scrollMenuTabLayoutMessage} />
                <Tab label={"Mes messages d'utilisateur"} className={classes.scrollMenuTabLayoutMessage} />
              </Tabs>
            </Grid>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{margin:'0 15%', display:'flex', justifyContent:'center', backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', padding: '5% 10%', marginTop : '5vh', marginBottom: '5vh'}}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }

}

export default withStyles(styles)(LayoutMessages);
