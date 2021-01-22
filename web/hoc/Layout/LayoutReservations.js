const {setAxiosAuthentication}=require('../../utils/authentication');
import React from "react";
import styles from '../../static/css/components/Layout/LayoutReserations/LayoutReservations';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Layout from "./Layout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class LayoutReservations extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      reservationStatus: 0,
      reservationType: 1,
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication();
  };

  render() {
    const {user} = this.state;
    const {classes, children, reservationType, userInfo} = this.props;

    return(
      <Layout user={user}>
        <Grid style={{display:'flex', justifyContent:'center'}}>
          <Grid style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2>Mes réservations</h2>
            </Grid>
            <Grid>
              <Tabs
                value={userInfo && !userInfo.is_alfred ? 0 : reservationType}
                onChange={userInfo && !userInfo.is_alfred ? null : this.props.onReservationTypeChanged}
                aria-label="scrollable force tabs"
                scrollButtons="on"
                classes={{indicator: classes.scrollMenuIndicator}}
              >
                {
                  userInfo && userInfo.is_alfred ?
                    <Tab label={"Mes réservations d'Alfred"} className={classes.scrollMenuTab} />
                   : null
                }
                <Tab label={"Mes réservations d'utilisateur"} className={classes.scrollMenuTab} />
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

export default withStyles(styles)(LayoutReservations);
